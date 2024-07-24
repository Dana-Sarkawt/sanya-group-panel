<script lang="ts">
  import CapitalTable from "$lib/Components/ResponsiveTable/CapitalTable.Component.svelte";
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
            data.capitals?.data.reduce(
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

    <!-- <CapitalTable bind:capitals={data.capitals} /> -->
    <CapitalTable bind:capitals={data.capitals} />
  </div>
</div>
