<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Pagination from "$lib/Components/Pagination.Store.Component.svelte";
  import DailyTable from "$lib/Components/ResponsiveTable/DailyTable.Component.svelte";
  import WorkerTable from "$lib/Components/ResponsiveTable/WorkerTable.Component.svelte";
  import { dailyStore } from "$lib/Store/Daily.Store";
  import { preparationStore } from "$lib/Store/Preparation.Store";
  import { workerStore } from "$lib/Store/Worker.Store";
  import { Tabs, TabItem } from "flowbite-svelte";

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

<div class=" w-full h-auto flex flex-col justfiy-center items-center">
  <!-- <ProjectTable bind:projects={data.projects} /> -->
  <Tabs tabStyle="pill" contentClass="w-[90%]">
    <TabItem
      activeClasses="w-24 h-12 bg-green-500 rounded-full text-white "
      inactiveClasses="w-24 h-12 bg-[#363636] rounded-full text-white "
      on:click={retrieveDaily}
    >
      <span slot="title">Daily</span>
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
      activeClasses="w-24 h-12 bg-green-500 rounded-full text-white "
      inactiveClasses="w-24 h-12 bg-[#363636] rounded-full text-white "
      on:click={retrieveWorker}
    >
      <span slot="title">Worker</span>
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
      activeClasses="w-24 h-12 bg-green-500 rounded-full text-white "
      inactiveClasses="w-24 h-12 bg-[#363636] rounded-full text-white "
      on:click={retrievePreparation}
    >
      <span slot="title">Preparation</span>
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
      </div></TabItem
    >
  </Tabs>
</div>
