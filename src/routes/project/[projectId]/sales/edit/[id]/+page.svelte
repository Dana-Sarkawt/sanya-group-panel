<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { saleStore } from "$lib/Store/Sale.Store";
  import { Sale } from "$lib/Models/Request/Sale.Request.Model";
  import { onMount } from "svelte";
  import { ImageCommon } from "$lib/Models/Common/Image.Common.Model";
  import { storageStore } from "$lib/Store/Storage.Store";
  import ImageField from "$lib/Components/ImageField.Component.svelte";

  let saleRequest = {
    ...new Sale.Update(),
    project_id: Number($page.params.projectId),
  };
  const image = new ImageCommon();

  onMount(async () => {
    const sale = await saleStore.get(Number($page.params.id));
    if (!sale) {
      throw new Error("Failed to fetch sale");
    }
    saleRequest = {
      ...saleRequest,
      description: sale.data.description as string,
      id: sale.data.id,
      image: sale.data.image as string,
    };
    image.localUrl = sale.data.image as string;
  });

  async function updateSale(request: Sale.Update) {
    try {
      if (image.file && image.file.size > 0) {
        const response = await storageStore.uploadImage(image.file);
        if (!response) {
          throw new Error("Failed to upload image");
        }
        request.image = response;
      }
      const response = await saleStore.update(request);
      if (!response) {
        throw new Error("Failed to update sale");
      }
      goto(`/project/${$page.params.projectId}/0`);
    } catch (error) {
      console.log(error);
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
    Update Sale
  </p>
</div>

<div class="w-full h-auto flex justify-center items-center">
  <div
    class="w-[90%] md:w-[50%] h-auto p-10 bg-[#94DCBA] dark:bg-[#11433A] border border-[#11433A] dark:border-[#94DCBA] rounded-xl flex flex-col justify-center items-center gap-6"
  >
    <ImageField {image} />
    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">Description</p>
      <textarea
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={saleRequest.description}
      />
    </div>

    <button
      class="w-full h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white duration-300 ease-in-out"
      on:click={() => updateSale(saleRequest)}>Update Sale</button
    >
  </div>
</div>
