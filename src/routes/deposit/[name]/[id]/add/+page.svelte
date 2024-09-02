<script lang="ts">
  import moment from "moment";
  import { goto } from "$app/navigation";
  import { depositStore } from "$lib/Store/Deposit.Store";
  import { page } from "$app/stores";
  import { Deposit } from "$lib/Models/Request/Deposit.Request.Model";
  import { FilterTextFieldToNumbers } from "$lib/Utils/FilterFields.Utils";
  import { ImageCommon } from "$lib/Models/Common/Image.Common.Model";
  import { storageStore } from "$lib/Store/Storage.Store";
  import ImageField from "$lib/Components/ImageField.Component.svelte";
  export let depositRequest = {
    ...new Deposit.Create(),
    [`${$page.params.name}_id`]: Number($page.params.id),
  };
  const image = new ImageCommon();

  async function addDeposit(request: Deposit.Create) {
    try {
      if (image.file && image.file.size > 0) {
        const response = await storageStore.uploadImage(image.file);
        if (!response) {
          throw new Error("Failed to upload image");
        }
        request.image = response;
      }
      depositStore.create({
        ...request,
        date: moment(request.date).format("YYYY-MM-DD"),
      });
      goto(`/deposit/${$page.params.name}/${$page.params.id}`);
    } catch (error) {
      console.log(error);
    }
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="w-full h-auto flex justify-center items-center md:px-44">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <a on:click={() => window.history.back()} class="cursor-pointer">
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
  Add Deposit
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
        bind:value={depositRequest.description}
      />
    </div>

    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">Price</p>
      <input
        type="text"
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        on:input={FilterTextFieldToNumbers}
        bind:value={depositRequest.price}
      />
    </div>

    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">Date</p>
      <input
        type="date"
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={depositRequest.date}
      />
    </div>

    <button
      class="w-full h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white duration-300 ease-in-out"
      on:click={()=>addDeposit(depositRequest)}>Add Deposit</button
    >
  </div>
</div>
