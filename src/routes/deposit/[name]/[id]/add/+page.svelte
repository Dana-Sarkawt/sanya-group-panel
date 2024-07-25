<script lang="ts">
  import moment from "moment";
  import { goto } from "$app/navigation";
  import { depositStore } from "$lib/Store/Deposit.Store";
  import { page } from "$app/stores";
  import { Deposit } from "$lib/Models/Request/Deposit.Request.Model";
  export let depositRequest = {
    ...new Deposit.Create(),
    [`${$page.params.name}_id`]: Number($page.params.id),
  };

  async function addDeposit() {
    try {
      depositStore.create({
        ...depositRequest,
        date: moment(depositRequest.date).format("YYYY-MM-DD"),
      });
      goto(`/deposit/${$page.params.name}/${$page.params.id}/0`);
    } catch (error) {
      console.log(error);
    }
  }
</script>

<p class="w-full h-auto text-4xl dark:text-white text-center my-12">
  Add Deposit
</p>
<div class="w-full h-auto flex justify-center items-center">
  <div
    class="w-[90%] md:w-[50%] h-auto p-10 bg-[#94DCBA] dark:bg-[#11433A] border border-[#11433A] dark:border-[#94DCBA] rounded-xl flex flex-col justify-center items-center gap-6"
  >
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
      on:click={addDeposit}>Add Deposit</button
    >
  </div>
</div>
