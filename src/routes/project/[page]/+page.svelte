<script lang="ts">
  import { projectStore } from "$lib/Store/Project.Store";
  import { page } from "$app/stores";
  import Pagination from "$lib/Components/Pagination.Component.svelte";
  import type { PageData } from "./$types";
  import ProjectTable from "$lib/Components/ResponsiveTable/ProjectTable.Component.svelte";
  import { exportAsExcelFile } from "$lib/Utils/ExportAsExcel.Utils";
  export let data: PageData;
</script>

<div class=" w-full h-auto flex justify-center items-center">
  <div class="flex w-full justify-center items-center h-auto flex-col lg:mx-24">
    <div
      class="w-64 h-36 flex flex-col justify-center gap-2 bg-[#25478180] items-center rounded-xl"
    >
      <div class="w-full flex ml-4">
        <img src="/images/revenue.png" class="w-8 h-8 object-contain" alt="" />
      </div>
      <div class=" h-auto text-xl rounded-full font-bold">
        {#if true}
          <span class="loaderPink"></span>
        {:else}
          <div class="h-12 w-12">0</div>
        {/if}
      </div>
      <p class="h-auto w-full text-center text-white">Revenues</p>
    </div>
    <div
      class="flex h-[100vh] w-full flex-col justify-start items-center"
      id="subDiv"
    >
      <div
        class="flex h-24 w-full items-center justify-start pl-2 text-4xl text-[#0F4E35] dark:text-white font-bold"
      >
        Projects Table
      </div>

      <div
        class="flex h-16 w-full items-center justify-end rounded-t-lg p-2 dark:bg-[#081c18] bg-[#ffffff] gap-2"
      >
        <button
          class="h-12 w-auto flex justify-center items-center rounded-lg bg-blue-500 hover:bg-blue-400 px-4 text-white gap-2 duration-300 ease-in-out"
          style="box-shadow:0 1px 8px 0px #24b97d;"
          on:click={async () => {
            const datas = await projectStore.getAllWithoutFilter();
            await exportAsExcelFile(datas?.data, "projects");
          }}
          ><span>
            <img
              src="/images/print.png"
              class="w-6 h-6 object-contain"
              alt=""
            />
          </span>Export as Excel</button
        >

        <a href="/project/add">
          <button
            class="h-12 rounded-lg bg-[#24b97d] px-4 text-white"
            style="box-shadow:0 1px 8px 0px #24b97d;"
            ><span>+</span>Add Project</button
          >
        </a>
      </div>

      <ProjectTable bind:projects={data.projects} />

      <div class="w-full h-auto flex justify-center items-center py-12">
        <Pagination
          classType={typeof data.projects}
          StoreData={data.projects}
          currentPage={Number($page.params.page)}
          name={"project"}
        />
      </div>
    </div>
  </div>
</div>

<style>
  .loaderPink {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    border: 10px solid;
    border-color: #2875fa1d #2875fa39 #2875fa58 #2875fa7b;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
