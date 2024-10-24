<script lang="ts">
  import { goto } from "$app/navigation";
  import moment from "moment";
  import { capitalStore } from "$lib/Store/Capital.Store";
  import { page } from "$app/stores";
  import { Capital } from "$lib/Models/Request/Capital.Request.Model";
  import { onMount } from "svelte";
  import { FilterTextFieldToNumbers } from "$lib/Utils/FilterFields.Utils";
  import { ImageCommon } from "$lib/Models/Common/Image.Common.Model";
  import { storageStore } from "$lib/Store/Storage.Store";
  import ImageField from "$lib/Components/ImageField.Component.svelte";
  import { _ } from "svelte-i18n";
  import { Spinner } from "flowbite-svelte";

  let capitalRequest = {
    ...new Capital.Update(),
    project_id: Number($page.params.projectId),
  };
  const image = new ImageCommon();
  let isLoading = false;
  onMount(async () => {
    const capital = await capitalStore.get(Number($page.params.id));
    if (!capital) {
      throw new Error("Failed to fetch capital");
    }
    capitalRequest = {
      ...capitalRequest,
      description: capital.data.description as string,
      price: capital.data.price as number,
      date: capital.data.date as string,
      id: capital.data.id,
      image: capital.data.image as string,
    };
    image.localUrl = capital.data.image as string;
  });

  async function updateCapital(request: Capital.Update) {
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
      await capitalStore.update({
        ...request,
        date: moment(request.date).format("YYYY-MM-DD"),
      });
      goto(`/project/${$page.params.projectId}/0`);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="w-full h-auto flex justify-center items-center md:px-44">
  <a href="/project/{$page.params.projectId}/0">
    <p
      class="w-24 h-12 rounded-xl flex justify-center items-center bg-green-700 hover:bg-green-500 text-white duration-300 ease-in-out"
    >
      Back
    </p>
  </a>

  <p
    class="w-full h-auto text-2xl md:text-4xl dark:text-white text-center my-12"
  >
    {$_("update-capital")}
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
        bind:value={capitalRequest.description}
      />
    </div>

    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">{$_("price")}</p>
      <input
        type="text"
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        on:input={FilterTextFieldToNumbers}
        bind:value={capitalRequest.price}
      />
    </div>

    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">{$_("date")}</p>
      <input
        type="date"
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={capitalRequest.date}
      />
    </div>

    {#if !isLoading}
      <button
        class="w-full h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white duration-300 ease-in-out"
        on:click={() => updateCapital(capitalRequest)}
    >
        {$_("update-capital")}
      </button>
    {:else}
      <Spinner size={6} color="green" />
    {/if}
  </div>
</div>
