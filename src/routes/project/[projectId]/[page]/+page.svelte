<script lang="ts">
  import SalesTable from "$lib/Components/ResponsiveTable/SalesTable.Component.svelte";
  import { saleStore } from "$lib/Store/Sale.Store";
  import { capitalStore } from "$lib/Store/Capital.Store";
  import { page } from "$app/stores";
  import { Tabs, TabItem } from "flowbite-svelte";
  import CapitalTable from "$lib/Components/ResponsiveTable/CapitalTable.Component.svelte";
  import Pagination from "$lib/Components/Pagination.Store.Component.svelte";
  import { goto } from "$app/navigation";

  async function retrieveCapital() {
    await capitalStore.getAll({
      limit: 10,
      page: 0,
      equal: $page.params.projectId,
      field: "project_id",
    });
  }

  async function retrieveSales() {
    await saleStore.getAll({
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
      on:click={retrieveCapital}
    >
      <span slot="title">Capital</span>
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

          <a href="/capital/add">
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
      activeClasses="w-24 h-12 bg-green-500 rounded-full text-white "
      inactiveClasses="w-24 h-12 bg-[#363636] rounded-full text-white "
      on:click={retrieveSales}
    >
      <span slot="title">Sales</span>
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
          <a href="/sale/add">
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
      activeClasses="w-24 h-12 bg-green-500 rounded-full text-white "
      inactiveClasses="w-24 h-12 bg-[#363636] rounded-full text-white "
      on:click={() => goto(`/project/${$page.params.projectId}/expense/0`)}
    >
      <span slot="title">Expense</span>
    </TabItem>
  </Tabs>
</div>
