<script lang="ts">
  import { projectStore } from "$lib/Store/Project.Store";
  import { page } from "$app/stores";
  import Pagination from "$lib/Components/Pagination.Component.svelte";
  import type { PageData } from "./$types";
  import ProjectTable from "$lib/Components/ResponsiveTable/ProjectTable.Component.svelte";
  import { exportAsExcelFile } from "$lib/Utils/ExportAsExcel.Utils";
  import { _ } from "svelte-i18n";
  export let data: PageData;
  let isLoading = false;
</script>

<div class=" w-full h-auto flex justify-center items-center">
  <div class="flex w-full justify-center items-center h-auto flex-col lg:mx-24">
    <div
      class="flex h-[100vh] w-full flex-col justify-start items-center"
      id="subDiv"
    >
      <div
        class="flex h-24 w-full items-center justify-start pl-2 text-4xl text-[#0F4E35] dark:text-white font-bold"
      >
        {$_("projects-table")}
      </div>

      <div
        class="flex h-auto w-full items-center justify-between rounded-t-lg p-2 dark:bg-[#081c18] bg-[#ffffff] gap-2"
      >
        <!-- <div class=" h-auto text-xl rounded-full font-bold">
          {#if isLoading}
            <span class="loaderPink"></span>
          {:else}
            <div
              class="w-auto h-auto flex justify-center items-center gap-2 flex-wrap"
            >
              <div
                class="w-auto flex justify-center items-center gap-3 bg-[#D3F9E9] dark:bg-[#0C2B25] p-2 rounded-lg"
              >
                <p
                  class="h-auto w-full text-center text-[#1E4F3C] dark:text-white text-[10px] md:text-lg"
                >
                  {$_("income:")}
                </p>
                <div
                  class="h-full w-full dark:text-white text-center text-[10px] md:text-lg"
                >
                  {Total}
                </div>
              </div>

              <div
                class="w-auto flex justify-center items-center gap-3 bg-[#D3F9E9] dark:bg-[#0C2B25] p-2 rounded-lg"
              >
                <p
                  class="h-auto w-full text-center text-[#1E4F3C] dark:text-white text-[10px] md:text-lg"
                >
                  {$_("outcome:")}
                </p>
                <div
                  class="h-full w-full dark:text-white text-center text-[10px] md:text-lg"
                >
                  {Total}
                </div>
              </div>
            </div>
          {/if}
        </div> -->

        <div class="w-auto flex gap-4">
          <button
            class="h-12 w-auto flex justify-center items-center rounded-lg bg-blue-500 hover:bg-blue-400 px-4 text-white gap-2 text-[10px] md:text-lg duration-300 ease-in-out"
            style="box-shadow:0 1px 8px 0px #24b97d;"
            on:click={async () => {
              const datas = await projectStore.getAllWithoutFilter();
              await exportAsExcelFile(datas?.data, "projects");
            }}
            ><span>
              <img
                src="/images/print.png"
                class="w-4 h-4 md:w-6 md:h-6 object-contain"
                alt=""
              />
            </span>
            {$_("export-as-excel")}
          </button>

          <a
            href="/project/add"
            class="w-auto h-auto px-2 gap-2 flex rounded-lg bg-[#24b97d] text-white justify-center items-center"
            style="box-shadow:0 1px 8px 0px #24b97d;"
          >
            <button class="h-12 w-auto text-[10px] md:text-lg">
              {$_("add-project")}
            </button>
            <span class="text-[10px] md:text-lg">+</span>
          </a>
        </div>
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
