<script lang="ts">
	import { goto } from '$app/navigation';
	import { workerStore } from '$lib/Store/Worker.Store';
  import { page } from "$app/stores";
  import { Worker } from "$lib/Models/Request/Worker.Request.Model";

  const workerRequest = {
    ...new Worker.Create(),
    project_id: Number($page.params.projectId),
  };

  async function addWorker() {
    try {
      const response = await workerStore.create(workerRequest);
      if (!response) throw new Error("Failed to add worker");
      goto(`/project/${$page.params.projectId}/expense/0`);
    } catch (error) {
      console.log(error);
    }
  }
</script>

<p class="w-full h-auto text-4xl dark:text-white text-center my-12">
  Add Worker
</p>
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
