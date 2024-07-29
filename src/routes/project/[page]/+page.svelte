<script lang="ts">
  import { page } from "$app/stores";
  import Pagination from "$lib/Components/Pagination.Component.svelte";
  import type { PageData } from "./$types";
  import ProjectTable from "$lib/Components/ResponsiveTable/ProjectTable.Component.svelte";
  import { exportAsExcelFile } from "$lib/Utils/ExportAsExcel.Utils";
  import { projectStore } from "$lib/Store/Project.Store";
  export let data: PageData;
</script>

<div class=" w-full h-auto flex justify-center items-center">
  <div
    class="  flex h-[100vh] w-full flex-col justify-start items-center lg:mx-24"
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
          <img src="/images/print.png" class="w-6 h-6 object-contain" alt="" />
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
