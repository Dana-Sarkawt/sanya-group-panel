<script lang="ts">
  import { formatNumber } from "$lib/Utils/ConvertNumbers.Utils";
  import { onMount } from "svelte";
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
  import { exportAsExcelFile } from "$lib/Utils/ExportAsExcel.Utils";
  import { Overhaul } from "$lib/Models/Common/Overhaul.Common.Model";
  import { _ } from "svelte-i18n";

  let totalDaily = 0;
  let isLoading = false;
  let workers: Overhaul = new Overhaul();
  let preparations: Overhaul = new Overhaul();
  onMount(async () => {
    isLoading = true;
    try {
      totalDaily =
        (await dailyStore.getTotalPrice(Number($page.params.projectId))) ?? 0;
      await retrieveOverhaulDeposits();
      await retrieveOverhaulFinancials();
    } finally {
      isLoading = false;
    }
  });

  async function retrieveOverhaulDeposits() {
    try {
      const workersDeposits = await workerStore.getOverhaulDepositsByProjectId(
        Number($page.params.projectId)
      );
      const preparationsDeposits =
        await preparationStore.getOverhaulDepositsByProjectId(
          Number($page.params.projectId)
        );
      if (workersDeposits) {
        workers.deposits = workersDeposits;
      }
      if (preparationsDeposits) {
        preparations.deposits = preparationsDeposits;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function retrieveOverhaulFinancials() {
    try {
      const workersFinancials =
        await workerStore.getOverhaulFinancialsByProjectId(
          Number($page.params.projectId)
        );
      const preparationsFinancials =
        await preparationStore.getOverhaulFinancialsByProjectId(
          Number($page.params.projectId)
        );
      if (workersFinancials) {
        workers.financials = workersFinancials;
      }
      if (preparationsFinancials) {
        preparations.financials = preparationsFinancials;
      }
    } catch (error) {
      console.log(error);
    }
  }

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

<div class="w-full h-auto flex justify-center items-center md:px-44">
  <a href="/project/{$page.params.projectId}/0">
    <p
      class="w-24 h-12 rounded-xl flex justify-center items-center bg-green-700 hover:bg-green-500 text-white duration-300 ease-in-out"
    >
      {$_("back")}
    </p>
  </a>

  <p
    class="w-full h-auto text-2xl md:text-4xl dark:text-white text-center my-12"
  ></p>
</div>

<div class=" w-full h-auto flex flex-col justfiy-center items-center">
  <!-- <ProjectTable bind:projects={data.projects} /> -->
  <Tabs
    tabStyle="pill"
    contentClass="w-[90%]"
    class="flex flex-col md:flex-row space-x-0 md:space-x-2 justify-center items-center  gap-4 mt-4"
  >
    <TabItem
      open
      activeClasses="w-60 h-28 bg-[#c62570a3] rounded-2xl text-white "
      inactiveClasses="w-60 h-28 bg-[#c6257080] rounded-2xl text-white "
      on:click={retrieveDaily}
    >
      <div
        slot="title"
        class="w-full h-full flex flex-col justify-center gap-2"
      >
        <img
          src="/images/daily.png"
          class="w-6 h-6 object-contain absolute mb-16 ml-3"
          alt=""
        />
        <div class=" h-auto text-xl rounded-full font-bold mt-4">
          {#if isLoading}
            <span class="loaderPink"></span>
          {:else}
            {formatNumber(totalDaily)}
          {/if}
        </div>
        <p class="h-auto w-full">{$_("daily")}</p>
      </div>

      <div
        class="  flex h-[100vh] w-full flex-col justify-start items-center"
        id="subDiv"
      >
        <div
          class="flex h-24 w-full items-center justify-start pl-2 text-4xl text-[#0F4E35] dark:text-white font-bold"
        >
          {$_("daily-table")}
        </div>

        <div
          class="flex h-16 w-full items-center justify-between rounded-t-lg p-2 dark:bg-[#081c18] bg-[#ffffff]"
        >
          <div class="w-auto h-12 flex justify-center items-center gap-2">
            <p
              class="h-12 w-auto flex justify-center items-center px-4 rounded-xl bg-[#D3F9E9] dark:bg-[#11433A] dark:text-white"
            >
              <span class="text-[#1e4f3b] dark:text-[#54cc9c] pr-4 font-bold"
                >{$_("total:")}</span
              >
              {totalDaily.toFixed(2)}
            </p>
          </div>

          <div
            class="flex h-16 w-full items-center justify-end rounded-t-lg p-2 dark:bg-[#081c18] bg-[#ffffff] gap-2"
          >
            <button
              class="h-12 w-auto flex justify-center items-center rounded-lg bg-blue-500 hover:bg-blue-400 px-4 text-white gap-2 text-[8px] md:text-lg duration-300 ease-in-out"
              style="box-shadow:0 1px 8px 0px #24b97d;"
              on:click={async () => {
                const datas = await dailyStore.getAllWithoutFilter(
                  Number($page.params.projectId)
                );
                await exportAsExcelFile(datas?.data, "dailys");
              }}
              ><span>
                <img
                  src="/images/print.png"
                  class="w-2 h-2 md:w-6 md:h-6 object-contain"
                  alt=""
                />
              </span>
              {$_("export-as-excel")}
            </button>

            <a href="/project/{$page.params.projectId}/expense/daily/add">
              <button
                class=" h-12 rounded-lg bg-[#24b97d] p-2 md:px-4 text-white w-auto text-[8px] md:text-lg"
                style="box-shadow:0 1px 8px 0px #24b97d;"
                ><span>+</span>
                {$_("add-daily")}
              </button>
            </a>
          </div>
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
      <div
        slot="title"
        class="w-full h-full flex flex-col justify-end pb-3 gap-2"
      >
        <img
          src="/images/worker.png"
          class="w-6 h-6 object-contain absolute mb-16 ml-3"
          alt=""
        />
        <p class="h-auto w-full text-xl font-bold">{$_("worker")}</p>

        <div class="w-full h-auto flex justify-center items-center gap-2">
          <div
            class="w-auto h-8 flex justify-center items-center bg-[#10323c92] p-2 rounded-lg gap-2"
          >
            <span class="text-gray-400 text-xs">{$_("deposit:")} </span>
            {#if isLoading}
              <span class="loader2"></span>
            {:else}
              {formatNumber(workers.deposits.overall_total_price)}
            {/if}
          </div>
          <div
            class="w-auto h-8 flex justify-center items-center bg-[#10323c92] p-2 rounded-lg gap-2"
          >
            <span class="text-gray-400 text-xs">{$_("financial:")} </span>
            {#if isLoading}
              <span class="loader2"></span>
            {:else}
              {formatNumber(workers.financials.overall_total_price)}
            {/if}
          </div>
        </div>
      </div>
      <div
        class="  flex h-[100vh] w-full flex-col justify-start items-center"
        id="subDiv"
      >
        <div
          class="flex h-24 w-full items-center justify-start pl-2 text-4xl text-[#0F4E35] dark:text-white font-bold"
        >
          {$_("worker-table")}
        </div>

        <div
          class="flex h-16 w-full items-center justify-end rounded-t-lg p-2 dark:bg-[#081c18] bg-[#ffffff] gap-2"
        >
          <div class="w-auto h-12 flex justify-center items-center gap-2">
            <div
              class="w-auto h-12 text-[8px] md:text-lg flex justify-center items-center gap-2 px-2 rounded-lg dark:text-white bg-[#f1f1f1] dark:bg-[#123d37]"
            >
              <p>{$_("deposit:")}</p>
              <span>{workers.deposits.overall_total_price}</span>
            </div>

            <div
              class="w-auto h-12 text-[8px] md:text-lg flex justify-center items-center gap-2 px-2 rounded-lg dark:text-white bg-[#f1f1f1] dark:bg-[#123d37]"
            >
              <p>{$_("financial:")}</p>
              <span>{workers.financials.overall_total_price}</span>
            </div>
          </div>

          <button
            class="h-12 w-auto flex justify-center items-center rounded-lg bg-blue-500 hover:bg-blue-400 px-4 text-white gap-2 text-[8px] md:text-lg duration-300 ease-in-out"
            style="box-shadow:0 1px 8px 0px #24b97d;"
            on:click={async () => {
              const datas = await workerStore.getAllWithoutFilter(
                Number($page.params.projectId)
              );
              await exportAsExcelFile(datas?.data, "workers");
            }}
            ><span>
              <img
                src="/images/print.png"
                class="w-2 h-2 md:w-6 md:h-6 object-contain"
                alt=""
              />
            </span>
            {$_("export-as-excel")}
          </button>

          <a href="/project/{$page.params.projectId}/expense/worker/add">
            <button
              class="h-12 rounded-lg bg-[#24b97d] px-4 text-white w-auto text-[8px] md:text-lg"
              style="box-shadow:0 1px 8px 0px #24b97d;"
              ><span>+</span>
              {$_("add-worker")}
            </button>
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
      <div
        slot="title"
        class="w-full h-full flex flex-col justify-end pb-3 gap-2"
      >
        <img
          src="/images/preparation.png"
          class="w-6 h-6 object-contain absolute mb-16 ml-3"
          alt=""
        />
        <p class="h-auto w-full text-xl font-bold">{$_("preparation")}</p>

        <div class="w-full h-auto flex justify-center items-center gap-2">
          <div
            class="w-auto h-8 flex justify-center items-center bg-[#10323c92] p-2 rounded-lg gap-2"
          >
            <span class="text-gray-400 text-xs">{$_("deposit:")} </span>
            {#if isLoading}
              <span class="loader2"></span>
            {:else}
              {formatNumber(preparations.deposits.overall_total_price)}
            {/if}
          </div>
          <div
            class="w-auto h-8 flex justify-center items-center bg-[#10323c92] p-2 rounded-lg gap-2"
          >
            <span class="text-gray-400 text-xs">{$_("financial:")} </span>
            {#if isLoading}
              <span class="loader2"></span>
            {:else}
              {formatNumber(preparations.financials.overall_total_price)}
            {/if}
          </div>
        </div>
      </div>
      <div
        class="  flex h-[100vh] w-full flex-col justify-start items-center"
        id="subDiv"
      >
        <div
          class="flex h-24 w-full items-center justify-start pl-2 text-4xl text-[#0F4E35] dark:text-white font-bold"
        >
          {$_("preparation-table")}
        </div>

        <div
          class="flex h-16 w-full items-center justify-end rounded-t-lg p-2 dark:bg-[#081c18] bg-[#ffffff] gap-2"
        >
          <div class="w-auto h-12 flex justify-center items-center gap-2">
            <div
              class="w-auto h-12 text-[8px] md:text-lg flex justify-center items-center gap-2 px-2 rounded-lg dark:text-white bg-[#f1f1f1] dark:bg-[#123d37]"
            >
              <p>{$_("deposit:")}</p>
              <span>{preparations.deposits.overall_total_price}</span>
            </div>

            <div
              class="w-auto h-12 text-[8px] md:text-lg flex justify-center items-center gap-2 px-2 rounded-lg dark:text-white bg-[#f1f1f1] dark:bg-[#123d37]"
            >
              <p>{$_("financial:")}</p>
              <span>{preparations.financials.overall_total_price}</span>
            </div>
          </div>

          <button
            class="h-12 w-auto flex justify-center items-center rounded-lg bg-blue-500 hover:bg-blue-400 px-4 text-white gap-2 text-[8px] md:text-lg duration-300 ease-in-out"
            style="box-shadow:0 1px 8px 0px #24b97d;"
            on:click={async () => {
              const datas = await preparationStore.getAllWithoutFilter(
                Number($page.params.projectId)
              );
              await exportAsExcelFile(datas?.data, "preparations");
            }}
            ><span>
              <img
                src="/images/print.png"
                class="w-2 h-2 md:w-6 md:h-6 object-contain"
                alt=""
              />
            </span>
            {$_("export-as-excel")}
          </button>

          <a href="/project/{$page.params.projectId}/expense/preparation/add">
            <button
              class="h-12 rounded-lg bg-[#24b97d] px-4 text-white text-[8px] md:text-lg"
              style="box-shadow:0 1px 8px 0px #24b97d;"
              ><span>+</span>
              {$_("add-preparation")}
            </button>
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
