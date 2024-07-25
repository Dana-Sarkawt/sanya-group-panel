<script lang="ts">
  import { onMount } from "svelte";
  import SalesTable from "$lib/Components/ResponsiveTable/SalesTable.Component.svelte";
  import { saleStore } from "$lib/Store/Sale.Store";
  import { capitalStore } from "$lib/Store/Capital.Store";
  import { page } from "$app/stores";
  import { Tabs, TabItem } from "flowbite-svelte";
  import CapitalTable from "$lib/Components/ResponsiveTable/CapitalTable.Component.svelte";
  import Pagination from "$lib/Components/Pagination.Store.Component.svelte";
  import { goto } from "$app/navigation";
  import { formatNumber } from "$lib/Utils/ConvertNumbers.Utils";
  let totalCapital = 0;
  onMount(async () => {
    totalCapital = (await capitalStore.getTotalPrice(
      Number($page.params.projectId)
    )) as number;
  });

  async function retrieveCapital() {
    goto(`/project/${$page.params.projectId}/0`);
    await capitalStore.getAll({
      limit: 10,
      page: 0,
      equal: $page.params.projectId,
      field: "project_id",
    });
  }

  async function retrieveSales() {
    goto(`/project/${$page.params.projectId}/0`);
    await saleStore.getAll({
      limit: 10,
      page: 0,
      equal: $page.params.projectId,
      field: "project_id",
    });
  }
</script>


<div class="w-full h-auto flex  justify-center items-center  md:px-44">

  <a href="/project/0">
  <p class="w-24 h-12 rounded-xl flex justify-center items-center bg-green-700 hover:bg-green-500 text-white duration-300 ease-in-out">Back</p>
  </a>

  <p class="w-full h-auto text-2xl md:text-4xl dark:text-white text-center my-12">
  </p>
</div>


<div class=" w-full h-auto flex flex-col justify-center items-center">
  <!-- <ProjectTable bind:projects={data.projects} /> -->
  <Tabs
    tabStyle="pill"
    contentClass="w-[90%]"
    class="flex flex-col md:flex-row space-x-0 md:space-x-2 justify-center items-center  gap-4 mt-4"
  >
    <TabItem
      activeClasses="w-60 h-28 bg-[#c62570a3] rounded-2xl text-white "
      inactiveClasses="w-60 h-28 bg-[#c6257080] rounded-2xl  text-white  "
      on:click={retrieveCapital}
    >
      <div
        slot="title"
        class="w-full h-full flex flex-col justify-center gap-2"
      >
        <img
          src="/images/capital.png"
          class="w-6 h-6 object-contain absolute mb-16 ml-3"
          alt=""
        />
        <div class=" h-auto text-xl rounded-full font-bold mt-4">
          {formatNumber(totalCapital)}
        </div>
        <p class="h-auto w-full">Capital</p>
      </div>
      <div
        class="  flex h-[100vh] w-full flex-col justify-start items-center"
        id="subDiv"
      >
        <div
          class="flex h-24 w-full items-center justify-start pl-2 text-4xl text-[#0F4E35] dark:text-white font-bold"
        >
          Capital Table
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
                $capitalStore.data.reduce(
                  (total, capital) => total + capital.price,
                  0
                )
              ).toFixed(2)}
            </p>
          </div>

          <a href="/project/{$page.params.projectId}/capital/add">
            <button
              class="h-12 rounded-lg bg-[#24b97d] px-4 text-white"
              style="box-shadow:0 1px 8px 0px #24b97d;"
              ><span>+</span>Add Capital</button
            >
          </a>
        </div>
        <CapitalTable bind:capitals={$capitalStore} />
        <div class="w-full h-auto flex justify-center items-center py-12">
          <Pagination
            Store={capitalStore}
            StoreData={$capitalStore}
            currentPage={Number($page.params.page)}
            project_id={Number($page.params.projectId)}
          />
        </div>
      </div>
    </TabItem>

    <TabItem
      activeClasses="w-60 h-28 bg-[#21ACD680] rounded-2xl text-white "
      inactiveClasses="w-60 h-28 bg-[#21ACD659] rounded-2xl text-white "
      on:click={retrieveSales}
    >
      <div
        slot="title"
        class="w-full h-full flex flex-col justify-center gap-2"
      >
        <img
          src="/images/sale.png"
          class="w-6 h-6 object-contain absolute mb-16 ml-3"
          alt=""
        />
        <p class="h-auto w-full text-xl font-bold">Sales</p>
      </div>
      <div
        class="  flex h-[100vh] w-full flex-col justify-start items-center"
        id="subDiv"
      >
        <div
          class="flex h-24 w-full items-center justify-start pl-2 text-4xl text-[#0F4E35] dark:text-white font-bold"
        >
          Sale Table
        </div>

        <div
          class="flex h-16 w-full items-center justify-end rounded-t-lg p-2 dark:bg-[#081c18] bg-[#ffffff]"
        >
          <a href="/project/{$page.params.projectId}/sales/add">
            <button
              class="h-12 rounded-lg bg-[#24b97d] px-4 text-white"
              style="box-shadow:0 1px 8px 0px #24b97d;"
              ><span>+</span> Add Sale</button
            >
          </a>
        </div>

        <SalesTable bind:sales={$saleStore} />
        <div class="w-full h-auto flex justify-center items-center py-12">
          <Pagination
            Store={saleStore}
            StoreData={$saleStore}
            currentPage={Number($page.params.page)}
            project_id={Number($page.params.projectId)}
          />
        </div>
      </div>
    </TabItem>
    <TabItem
      activeClasses="w-60 h-28 bg-[#886DFFa3] rounded-2xl text-white "
      inactiveClasses="w-60 h-28 bg-[#886DFF4d] rounded-2xl text-white "
      on:click={() => goto(`/project/${$page.params.projectId}/expense/0`)}
    >
      <div
        slot="title"
        class="w-full h-full flex flex-col justify-center gap-2"
      >
        <img
          src="/images/increase.png"
          class="w-6 h-6 object-contain absolute mb-16 ml-3"
          alt=""
        />
        <p class="h-auto w-full text-xl font-bold">Expense</p>
      </div>
    </TabItem>
  </Tabs>
</div>
