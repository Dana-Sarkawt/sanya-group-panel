<script lang="ts">
    import moment from "moment";
    import { goto } from "$app/navigation";
    import { depositStore } from "$lib/Store/Deposit.Store";
    import { page } from "$app/stores";
    import { Deposit } from "$lib/Models/Request/Deposit.Request.Model";
  import { onMount } from "svelte";
    export let depositRequest = {
      ...new Deposit.Update(),
      [`${$page.params.name}_id`]: Number($page.params.id),
    };
  
   onMount(async () => {
    
      const deposit = await depositStore.get(Number($page.params.depositId));
      if(!deposit) {
        throw new Error("Failed to fetch deposit");
      }
      depositRequest = {
        ...depositRequest,
        description: deposit.data.description as string,
        price: deposit.data.price as number,
        date: deposit.data.date as string,
        id: deposit.data.id,
      }
    });
  
   async function UpdateDeposit() {
      try {
        depositStore.update({
          ...depositRequest,
          date: moment(depositRequest.date).format("YYYY-MM-DD"),
        });
        goto(`/deposit/${$page.params.name}/${$page.params.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  </script>
  
  <p class="w-full h-auto text-4xl dark:text-white text-center my-12">
    Update Deposit
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
        on:click={UpdateDeposit}>Update Deposit</button
      >
    </div>
  </div>
  