<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { workerStore } from "$lib/Store/Worker.Store";
  import { Worker } from "$lib/Models/Request/Worker.Request.Model";
  import { onMount } from "svelte";
  import { ImageCommon } from "$lib/Models/Common/Image.Common.Model";
  import { storageStore } from "$lib/Store/Storage.Store";
  import { _ } from "svelte-i18n";
  import { Spinner } from "flowbite-svelte";

  let workerRequest = {
    ...new Worker.Update(),
    project_id: Number($page.params.projectId),
  };
  const image = new ImageCommon();
  let isLoading = false;
  onMount(async () => {
    const worker = await workerStore.get(Number($page.params.id));
    if (!worker) {
      throw new Error("Failed to fetch worker");
    }
    workerRequest = {
      ...workerRequest,
      name: worker.data.name as string,
      id: worker.data.id,
      image: worker.data.image as string,
    };
    image.localUrl = worker.data.image as string;
  });

  async function UpdateWorker(request: Worker.Update) {
    if (isLoading) return;
    try {
      isLoading = true;
      if (image.file && image.file.size > 0) {
        const response = await storageStore.uploadImage(image.file);
        if (!response) {
          throw new Error("Failed to upload image");
        }
        request.image = response;
      }
      await workerStore.update({
        ...request,
      });
      goto(`/project/${$page.params.projectId}/expense/0`);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="w-full h-auto flex justify-center items-center md:px-44">
  <a href="/project/{$page.params.projectId}/expense/0">
    <p
      class="w-24 h-12 rounded-xl flex justify-center items-center bg-green-700 hover:bg-green-500 text-white duration-300 ease-in-out"
    >
      {$_("back")}
    </p>
  </a>

  <p
    class="w-full h-auto text-2xl md:text-4xl dark:text-white text-center my-12"
  >
    {$_("update-worker")}
  </p>
</div>

<div class="w-full h-auto flex justify-center items-center">
  <div
    class="w-[90%] md:w-[50%] h-auto p-10 bg-[#94DCBA] dark:bg-[#11433A] border border-[#11433A] dark:border-[#94DCBA] rounded-xl flex flex-col justify-center items-center gap-6"
  >
    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">{$_("name")}</p>
      <input
        type="text"
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={workerRequest.name}
      />
    </div>

    {#if !isLoading}
      <button
        class="w-full h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white duration-300 ease-in-out"
        on:click={() => UpdateWorker(workerRequest)}
    >
        {$_("update-worker")}
      </button>
    {:else}
      <Spinner size={6} color="green" />
    {/if}
  </div>
</div>
