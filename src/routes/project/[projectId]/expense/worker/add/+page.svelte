<script lang="ts">
    import { goto } from "$app/navigation";
    import { User } from "$lib/Models/Request/User.Request.Model";
  import { dailyStore } from "$lib/Store/Daily.Store";
    import type { PageData } from "./$types";
    import { page } from "$app/stores";
    export let data: PageData;
    // const capitalRequest = new Capital.Create();
  
  
  </script>
  
  <div class="w-full h-auto flex  justify-center items-center  md:px-44">

    <a href="/project/{$page.params.projectId}/expense/0">
    <p class="w-24 h-12 rounded-xl flex justify-center items-center bg-green-700 hover:bg-green-500 text-white duration-300 ease-in-out">Back</p>
    </a>
  
    <p class="w-full h-auto text-2xl md:text-4xl dark:text-white text-center my-12">
      Add Worker
    </p>
  </div>


  <div class="w-full h-auto flex justify-center items-center">
    <div
      class="w-[90%] md:w-[50%] h-auto p-10 bg-[#94DCBA] dark:bg-[#11433A] border border-[#11433A] dark:border-[#94DCBA] rounded-xl flex flex-col justify-center items-center gap-6"
    >
    
  
      <div class="w-full h-auto flex flex-col justify-center items-start">
        <p class="dark:text-white">Name</p>
        <input
          type="text"
          class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        />
      </div>
  
 
  
      <button
        class="w-full h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white duration-300 ease-in-out"
        >Add Worker</button
      >
    </div>
  </div>
  