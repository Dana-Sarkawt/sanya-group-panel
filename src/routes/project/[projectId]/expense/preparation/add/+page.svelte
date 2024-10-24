<script lang="ts">
  import { preparationStore } from "$lib/Store/Preparation.Store";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { Preparation } from "$lib/Models/Request/Preparation.Request.Model";
  import { ImageCommon } from "$lib/Models/Common/Image.Common.Model";
  import { storageStore } from "$lib/Store/Storage.Store";
  import ImageField from "$lib/Components/ImageField.Component.svelte";
  import { _ } from "svelte-i18n";
  import { Spinner } from "flowbite-svelte";

  const preparationRequest = {
    ...new Preparation.Create(),
    project_id: Number($page.params.projectId),
  };
  const image = new ImageCommon();
  let isLoading = false;

  async function addPreparation(request: Preparation.Create) {
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
      const response = await preparationStore.create(request);
      if (!response) throw new Error("Failed to add preparation");
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
    {$_("add-preparation")}
  </p>
</div>

<div class="w-full h-auto flex justify-center items-center">
  <div
    class="w-[90%] md:w-[50%] h-auto p-10 bg-[#94DCBA] dark:bg-[#11433A] border border-[#11433A] dark:border-[#94DCBA] rounded-xl flex flex-col justify-center items-center gap-6"
  >
    <ImageField {image} />
    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">{$_("description")}</p>
      <textarea
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={preparationRequest.description}
      />
    </div>

    {#if !isLoading}
      <button
        class="w-full h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white duration-300 ease-in-out"
      on:click={() => addPreparation(preparationRequest)}
    >
        {$_("add-preparation")}
      </button>
    {:else}
      <Spinner size={6} color="green" />
    {/if}
  </div>
</div>
