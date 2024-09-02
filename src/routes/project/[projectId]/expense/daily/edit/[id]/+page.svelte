<script lang="ts">
  import { onMount } from "svelte";
  import moment from "moment";
  import { goto } from "$app/navigation";
  import { dailyStore } from "$lib/Store/Daily.Store";
  import { page } from "$app/stores";
  import { Daily } from "$lib/Models/Request/Daily.Request.Model";
  import { FilterTextFieldToNumbers } from "$lib/Utils/FilterFields.Utils";
  import { ImageCommon } from "$lib/Models/Common/Image.Common.Model";
  import { storageStore } from "$lib/Store/Storage.Store";
  import ImageField from "$lib/Components/ImageField.Component.svelte";

  let dailyRequest = {
    ...new Daily.Update(),
    project_id: Number($page.params.projectId),
  };
  const image = new ImageCommon();

  onMount(async () => {
    const daily = await dailyStore.get(Number($page.params.id));
    if (!daily) {
      throw new Error("Failed to fetch daily");
    }
    dailyRequest = {
      ...dailyRequest,
      description: daily.data.description as string,
      price: daily.data.price as number,
      date: daily.data.date as string,
      id: daily.data.id,
      image: daily.data.image as string,
    };
    image.localUrl = daily.data.image as string;
  });

  async function UpdateDaily(request: Daily.Update) {
    try {
      if (image.file && image.file.size > 0) {
        const response = await storageStore.uploadImage(image.file);
        if (!response) {
          throw new Error("Failed to upload image");
        }
        request.image = response;
      }
      await dailyStore.update({
        ...request,
        date: moment(request.date).format("YYYY-MM-DD"),
      });
      goto(`/project/${$page.params.projectId}/expense/0`);
    } catch (error) {
      console.log(error);
    }
  }
</script>

<div class="w-full h-auto flex justify-center items-center md:px-44">
  <a href="/project/{$page.params.projectId}/expense/0">
    <p
      class="w-24 h-12 rounded-xl flex justify-center items-center bg-green-700 hover:bg-green-500 text-white duration-300 ease-in-out"
    >
      Back
    </p>
  </a>

  <p
    class="w-full h-auto text-2xl md:text-4xl dark:text-white text-center my-12"
  >
    Update Daily
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
        bind:value={dailyRequest.description}
      />
    </div>

    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">Price</p>
      <input
        type="text"
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        on:input={FilterTextFieldToNumbers}
        bind:value={dailyRequest.price}
      />
    </div>

    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">Date</p>
      <input
        type="date"
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={dailyRequest.date}
      />
    </div>

    <button
      class="w-full h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white duration-300 ease-in-out"
      on:click={() => UpdateDaily(dailyRequest)}>Update Daily</button
    >
  </div>
</div>
