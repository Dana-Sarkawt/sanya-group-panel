<script lang="ts">
  import { page } from "$app/stores";
  import Pagination from "$lib/Components/Pagination.Component.svelte";
  import type { PageData } from "./$types";
  import InboxTable from "$lib/Components/ResponsiveTable/InboxTable.Component.svelte";
  import { exportAsExcelFile } from "$lib/Utils/ExportAsExcel.Utils";
  import { _ } from "svelte-i18n";
  import { inboxStore } from "$lib/Store/Inbox.Store";
  export let data: PageData;
  let isLoading = false;
</script>

<div class="w-full h-auto flex justify-center items-center">
  <div class="flex w-full justify-center items-center h-auto flex-col lg:mx-24">
    <div
      class="flex h-[100vh] w-full flex-col justify-start items-center"
      id="subDiv"
    >
      <div
        class="flex h-24 w-full items-center justify-start pl-2 text-4xl text-[#0F4E35] dark:text-white font-bold"
      >
        {$_("inbox-table")}
      </div>

      <div
        class="flex h-auto w-full items-center justify-between rounded-t-lg p-2 dark:bg-[#081c18] bg-[#ffffff] gap-2"
      >
        <div class="h-auto text-xl rounded-full font-bold">
          {#if isLoading}
            <span class="loaderPink"></span>
          {:else}
            <!-- You can add any summary information here if needed -->
          {/if}
        </div>

        <div class="w-auto flex gap-4">
          <button
            class="h-12 w-auto flex justify-center items-center rounded-lg bg-blue-500 hover:bg-blue-400 px-4 text-white gap-2 text-[10px] md:text-lg duration-300 ease-in-out"
            style="box-shadow:0 1px 8px 0px #24b97d;"
            on:click={async () => {
              const datas = await inboxStore.getAll();
              await exportAsExcelFile(datas?.data, "inbox");
            }}
          >
            <span>
              <img
                src="/images/print.png"
                class="w-4 h-4 md:w-6 md:h-6 object-contain"
                alt=""
              />
            </span>
            {$_("export-as-excel")}
          </button>

          <a
            href="/inbox/add"
            class="w-auto h-auto px-2 gap-2 flex rounded-lg bg-[#24b97d] text-white justify-center items-center"
            style="box-shadow:0 1px 8px 0px #24b97d;"
          >
            <button class="h-12 w-auto text-[10px] md:text-lg">
              {$_("add-inbox-item")}
            </button>
            <span class="text-[10px] md:text-lg">+</span>
          </a>
        </div>
      </div>

      <InboxTable bind:inboxes={data.inboxes} />

      <div class="w-full h-auto flex justify-center items-center py-12">
        <Pagination
          classType={typeof data.inboxes}
          StoreData={data.inboxes}
          currentPage={Number($page.params.page)}
          name={"inbox"}
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
