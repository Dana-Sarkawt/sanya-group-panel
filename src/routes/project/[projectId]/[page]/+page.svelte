<script lang="ts">
  import { page } from "$app/stores";
  import Pagination from "$lib/Components/Pagination.Component.svelte";
  import type { PageData } from "./$types";
  import ProjectTable from "$lib/Components/ResponsiveTable/ProjectTable.Component.svelte";
  import { Tabs, TabItem } from "flowbite-svelte";
  export let data: PageData;
</script>

<div class=" w-full h-auto flex flex-col justfiy-center items-center">
  <!-- <ProjectTable bind:projects={data.projects} /> -->
  <Tabs tabStyle="pill" contentClass="w-[90%]">
    <TabItem
      open
      activeClasses="w-24 h-12 bg-green-500 rounded-full text-white "
      inactiveClasses="w-24 h-12 bg-[#363636] rounded-full text-white "
    >
      <span slot="title">Capital</span>
      <div
    class="  flex h-[100vh] w-full flex-col justify-start items-center "
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
          <!-- {Number(
            data.capitals?.data.reduce(
              (total, capital) => total + capital.price,
              0
            )
          ).toFixed(2)} -->0
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
    </TabItem>

    <TabItem
    activeClasses="w-24 h-12 bg-green-500 rounded-full text-white "
      inactiveClasses="w-24 h-12 bg-[#363636] rounded-full text-white "
    >
      <span slot="title">Sales</span>
     <div
    class="  flex h-[100vh] w-full flex-col justify-start items-center "
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

    <!-- <SalesTable bind:sales={data.sales} /> -->

  </div>
    </TabItem>

    <a href="/project/1/expense/0">
      <TabItem activeClasses="w-24 h-12 bg-green-500 rounded-full text-white "
      inactiveClasses="w-24 h-12 bg-[#363636] rounded-full text-white ">
        <span slot="title">Expense</span>
      </TabItem>
    </a>
  </Tabs>
</div>
