<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
  import { saleStore } from "$lib/Store/Sale.Store";
  import { Sale } from "$lib/Models/Request/Sale.Request.Model";

  const saleRequest = {
    ...new Sale.Create(),
    project_id: Number($page.params.projectId),
  };

  async function addSale() {
    try {
      const response = await saleStore.create(saleRequest);
      if (!response) throw new Error("Failed to add sale");
      goto(`/project/${$page.params.projectId}/0`);
    } catch (error) {
      console.log(error);
    }
  }
  
  </script>
  
  <div class="w-full h-auto flex  justify-center items-center  md:px-44">

    <a href="/project/{$page.params.projectId}/0">
    <p class="w-24 h-12 rounded-xl flex justify-center items-center bg-green-700 hover:bg-green-500 text-white duration-300 ease-in-out">Back</p>
    </a>
  
    <p class="w-full h-auto text-2xl md:text-4xl dark:text-white text-center my-12">
      Update Sale
    </p>
  </div>


  <div class="w-full h-auto flex justify-center items-center">
    <div
      class="w-[90%] md:w-[50%] h-auto p-10 bg-[#94DCBA] dark:bg-[#11433A] border border-[#11433A] dark:border-[#94DCBA] rounded-xl flex flex-col justify-center items-center gap-6"
    >
      <div class="w-full h-auto flex flex-col justify-center items-start">
        <p class="dark:text-white">Description</p>
        <textarea
          class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
          bind:value={saleRequest.description}
        />
      </div>
  
     
  
      <button
        class="w-full h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white duration-300 ease-in-out"
        on:click={addSale}
        >Update Sale</button
      >
  
  </div>
</div>
