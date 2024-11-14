<script lang="ts">
  import ImageField from "$lib/Components/ImageField.Component.svelte";
  import moment from "moment";
  import { goto } from "$app/navigation";
  import { financialDueStore } from "$lib/Store/FinancialDue.Store";
  import { page } from "$app/stores";
  import { FinancialDues } from "$lib/Models/Request/FinancialDues.Request.Model";
  import { onMount } from "svelte";
  import { FilterTextFieldToNumbers } from "$lib/Utils/FilterFields.Utils";
  import { ImageCommon } from "$lib/Models/Common/Image.Common.Model";
  import { storageStore } from "$lib/Store/Storage.Store";
  let { financialRequest = $bindable({
    ...new FinancialDues.Update(),
    [`${$page.params.name}_id`]: Number($page.params.id),
  }) } = $props();

  const image = $state(new ImageCommon());

  onMount(async () => {
    const finance = await financialDueStore.get(Number($page.params.financeId));
    if (!finance) {
      throw new Error("Failed to fetch deposit");
    }
    financialRequest = {
      ...financialRequest,
      description: finance.data.description as string,
      price: finance.data.price as number,
      date: finance.data.date as string,
      id: finance.data.id,
      image: finance.data.image as string,
    };
    image.localUrl = finance.data.image as string;
  });

  async function updateFinancial(request: FinancialDues.Update) {
    try {
      if (image.file && image.file.size > 0) {
        const response = await storageStore.uploadImage(image.file);
        if (!response) {
          throw new Error("Failed to upload image");
        }
        request.image = response;
      }
      await financialDueStore.update({
        ...request,
        date: moment(request.date).format("YYYY-MM-DD"),
      });
      goto(`/finance/${$page.params.name}/${$page.params.id}`);
    } catch (error) {
      console.log(error);
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="w-full h-auto flex justify-center items-center md:px-44">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_missing_attribute -->
  <a onclick={() => window.history.back()} class="cursor-pointer">
    <p
      class="w-24 h-12 rounded-xl flex justify-center items-center bg-green-700 hover:bg-green-500 text-white duration-300 ease-in-out"
    >
      Back
    </p>
  </a>

  <p
    class="w-full h-auto text-2xl md:text-4xl dark:text-white text-center my-12"
  ></p>
</div>

<p class="w-full h-auto text-4xl dark:text-white text-center my-12">
  Update Finance
</p>
<div class="w-full h-auto flex justify-center items-center">
  <div
    class="w-[90%] md:w-[50%] h-auto p-10 bg-[#94DCBA] dark:bg-[#11433A] border border-[#11433A] dark:border-[#94DCBA] rounded-xl flex flex-col justify-center items-center gap-6"
  >
    <ImageField {image} />
    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">Description</p>
      <textarea
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={financialRequest.description}
></textarea>
    </div>

    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">Price</p>
      <input
        type="text"
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        oninput={FilterTextFieldToNumbers}
        bind:value={financialRequest.price}
      />
    </div>

    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">Date</p>
      <input
        type="date"
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={financialRequest.date}
      />
    </div>

    <button
      class="w-full h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white duration-300 ease-in-out"
      onclick={() => updateFinancial(financialRequest)}>Update Finance</button
    >
  </div>
</div>
