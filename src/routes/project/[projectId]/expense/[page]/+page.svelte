<script lang="ts">
	import { onMount } from 'svelte';
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Pagination from "$lib/Components/Pagination.Store.Component.svelte";
  import DailyTable from "$lib/Components/ResponsiveTable/DailyTable.Component.svelte";
  import PreparationTable from "$lib/Components/ResponsiveTable/PreparationTable.Component.svelte";
  import WorkerTable from "$lib/Components/ResponsiveTable/WorkerTable.Component.svelte";
  import { dailyStore } from "$lib/Store/Daily.Store";
  import { preparationStore } from "$lib/Store/Preparation.Store";
  import { workerStore } from "$lib/Store/Worker.Store";
  import { Tabs, TabItem } from "flowbite-svelte";

  let totalDaily = 0;

  onMount(async () => {
    totalDaily = await dailyStore.getTotalPrice(
      Number($page.params.projectId)
    ) as number;
  });


  async function retrieveDaily() {
    goto(`/project/${$page.params.projectId}/expense/0`);
    await dailyStore.getAll({
      limit: 10,
      page: 0,
      equal: $page.params.projectId,
      field: "project_id",
    });
  }

  async function retrieveWorker() {
    goto(`/project/${$page.params.projectId}/expense/0`);
    await workerStore.getAll({
      limit: 10,
      page: 0,
      equal: $page.params.projectId,
      field: "project_id",
    });
  }

  async function retrievePreparation() {
    goto(`/project/${$page.params.projectId}/expense/0`);
    await preparationStore.getAll({
      limit: 10,
      page: 0,
      equal: $page.params.projectId,
      field: "project_id",
    });
  }
</script>
<div class="w-full h-auto flex  justify-center items-center  md:px-44">

  <a href="/project/{$page.params.projectId}/0">
  <p class="w-24 h-12 rounded-xl flex justify-center items-center bg-green-700 hover:bg-green-500 text-white duration-300 ease-in-out">Back</p>
  </a>

  <p class="w-full h-auto text-2xl md:text-4xl dark:text-white text-center my-12">
  </p>
</div>

<div class=" w-full h-auto flex flex-col justfiy-center items-center">
  <!-- <ProjectTable bind:projects={data.projects} /> -->
  <Tabs tabStyle="pill" contentClass="w-[90%]" class="flex flex-col md:flex-row space-x-0 md:space-x-2 justify-center items-center  gap-4 mt-4">
    <TabItem
      activeClasses="w-60 h-28 bg-[#c62570a3] rounded-2xl text-white "
      inactiveClasses="w-60 h-28 bg-[#c6257080] rounded-2xl text-white "
      on:click={retrieveDaily}
    >
    <div slot="title" class="w-full h-full flex flex-col justify-center  gap-2">
      <img src="/images/daily.png" class="w-6 h-6 object-contain absolute mb-16 ml-3" alt="">
      <div class=" h-auto text-xl rounded-full font-bold mt-4">{totalDaily}</div>
      <p class="h-auto w-full">Daily</p>
      
      </div>

      <div
        class="  flex h-[100vh] w-full flex-col justify-start items-center"
        id="subDiv"
      >
        <div
          class="flex h-24 w-full items-center justify-start pl-2 text-4xl text-[#0F4E35] dark:text-white font-bold"
        >
          Daily Table
        </div>

        <div
          class="flex h-16 w-full items-center justify-between rounded-t-lg p-2 dark:bg-[#081c18] bg-[#ffffff]"
        >
          <div class="w-auto h-12 flex justify-center items-center gap-2">
            <p
              class="h-12 w-auto flex justify-center items-center px-4 rounded-xl bg-[#D3F9E9] dark:bg-[#11433A] dark:text-white"
            >
              <span class="text-[#1e4f3b] dark:text-[#54cc9c] pr-4 font-bold"
                >Total:</span
              >
              {Number(
                $dailyStore.data.reduce(
                  (total, daily) => total + daily.price,
                  0
                )
              ).toFixed(2)}
            </p>
          </div>

          <a href="/project/{$page.params.projectId}/expense/daily/add">
            <button
              class="h-12 rounded-lg bg-[#24b97d] px-4 text-white"
              style="box-shadow:0 1px 8px 0px #24b97d;"
              ><span>+</span>Add Daily</button
            >
          </a>
        </div>
        <DailyTable bind:dailys={$dailyStore} />
        <div class="w-full h-auto flex justify-center items-center py-12">
          <Pagination
            Store={dailyStore}
            StoreData={$dailyStore}
            currentPage={Number($page.params.page)}
            project_id={Number($page.params.projectId)}
          />
        </div>
      </div>
    </TabItem>

    <TabItem
      activeClasses="w-60 h-28 bg-[#21ACD680] rounded-2xl text-white "
      inactiveClasses="w-60 h-28 bg-[#21ACD659] rounded-2xl text-white "
      on:click={retrieveWorker}
    >
    <div slot="title" class="w-full h-full flex flex-col justify-center  gap-2">
      <img src="/images/worker.png" class="w-6 h-6 object-contain absolute mb-16 ml-3" alt="">
      <p class="h-auto w-full text-xl font-bold">Worker</p>
      
      </div>
      <div
        class="  flex h-[100vh] w-full flex-col justify-start items-center"
        id="subDiv"
      >
        <div
          class="flex h-24 w-full items-center justify-start pl-2 text-4xl text-[#0F4E35] dark:text-white font-bold"
        >
          Worker Table
        </div>

        <div
          class="flex h-16 w-full items-center justify-end rounded-t-lg p-2 dark:bg-[#081c18] bg-[#ffffff]"
        >
          <a href="/project/{$page.params.projectId}/expense/worker/add">
            <button
              class="h-12 rounded-lg bg-[#24b97d] px-4 text-white"
              style="box-shadow:0 1px 8px 0px #24b97d;"
              ><span>+</span> Add Worker</button
            >
          </a>
        </div>

        <WorkerTable bind:workers={$workerStore} />
        <div class="w-full h-auto flex justify-center items-center py-12">
          <Pagination
            Store={workerStore}
            StoreData={$workerStore}
            currentPage={Number($page.params.page)}
            project_id={Number($page.params.projectId)}
          />
        </div>
      </div>
    </TabItem>

    <TabItem
      activeClasses="w-60 h-28 bg-[#886DFFa3] rounded-2xl text-white "
      inactiveClasses="w-60 h-28 bg-[#886DFF4d] rounded-2xl text-white "
      on:click={retrievePreparation}
    >
    <div slot="title" class="w-full h-full flex flex-col justify-center  gap-2">
      <img src="/images/preparation.png" class="w-6 h-6 object-contain absolute mb-16 ml-3" alt="">
      <p class="h-auto w-full text-xl font-bold">Preparation</p>
      
      </div>
      <div
        class="  flex h-[100vh] w-full flex-col justify-start items-center"
        id="subDiv"
      >
        <div
          class="flex h-24 w-full items-center justify-start pl-2 text-4xl text-[#0F4E35] dark:text-white font-bold"
        >
          Preparation Table
        </div>

        <div
          class="flex h-16 w-full items-center justify-end rounded-t-lg p-2 dark:bg-[#081c18] bg-[#ffffff]"
        >
          <a href="/project/{$page.params.projectId}/expense/preparation/add">
            <button
              class="h-12 rounded-lg bg-[#24b97d] px-4 text-white"
              style="box-shadow:0 1px 8px 0px #24b97d;"
              ><span>+</span> Add Preparation</button
            >
          </a>
        </div>
        <PreparationTable bind:preparations={$preparationStore} />
        <div class="w-full h-auto flex justify-center items-center py-12">
          <Pagination
            Store={preparationStore}
            StoreData={$preparationStore}
            currentPage={Number($page.params.page)}
            project_id={Number($page.params.projectId)}
          />
        </div>
      </div>
    </TabItem>
  </Tabs>
</div>
