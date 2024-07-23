<script lang="ts">
  import ProjectTable from "$lib/Components/Tables/Project.Table.Component.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div class=" w-full h-auto flex justfiy-center items-center">
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
      class="flex h-16 w-full items-center justify-end rounded-t-lg p-2 dark:bg-[#081c18] bg-[#ffffff]"
    >
      <a href="/project/add">
        <button
          class="h-12 rounded-lg bg-[#24b97d] px-4 text-white"
          style="box-shadow:0 1px 8px 0px #24b97d;"
          ><span>+</span> Add Project</button
        >
      </a>
    </div>

    <ProjectTable bind:projects={data.projects} />
  </div>
</div>
