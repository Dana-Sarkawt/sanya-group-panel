<script lang="ts">
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import DeleteModal from "$lib/Components/DeleteModal.Component.svelte";
  import type { Database } from "$lib/Supabase/Types/database.types";
  import type { Store } from "$lib/Models/Response/Store.Response.Model";
  import { saleStore } from "$lib/Store/Sale.Store";
  import { _ } from "svelte-i18n";
  let deleteModal = false;
  export let sales: Store<Database["public"]["Tables"]["Sales"]["Row"]> = {
    data: [],
    count: 0,
  };
</script>

<div
  class="containerw-full h-auto bg-[#ffffff] dark:bg-[#081c18] p-4 rounded-b-xl"
>
  <Table striped={true}>
    <TableHead theadClass="bg-white dark:bg-[#212121] text-center">
      <TableHeadCell>{$_("description")}</TableHeadCell>
      <TableHeadCell>{$_("new-action")}</TableHeadCell>
      <TableHeadCell>{$_("action")}</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y text-center">
      {#if sales.count !== 0}
        {#each sales.data as sale}
          <TableBodyRow>
            <TableBodyCell>{sale.description}</TableBodyCell>
            <TableBodyCell>
              <div class="w-full h-auto flex justify-center items-center gap-2">
                <div
                  class="w-28 h-8 flex justify-center items-center bg-orange-500 rounded-full px-4 font-bold text-white"
                >
                  Deposit
                </div>

                <div
                  class="w-28 h-8 flex justify-center items-center bg-blue-400 rounded-full px-4 font-bold text-white"
                >
                  Financial Dues
                </div>
              </div>
            </TableBodyCell>

            <TableBodyCell>
              <div class="flex h-auto w-auto items-center justify-center gap-2">
                <a
                  href="edit/1"
                  class="bg-green-600 hover:bg-green-500 h-12 w-12 p-2 flex justify-center items-center rounded-full"
                >
                  <img
                    src="/images/edit.png"
                    class="h-8 w-8 object-contain"
                    alt=""
                  />
                </a>

                <a
                  href="edit/1"
                  class="bg-red-600 hover:bg-red-500 h-12 w-12 p-2 flex justify-center items-center rounded-full"
                  on:click={() => (deleteModal = true)}
                >
                  <img
                    src="/images/delete.png"
                    class="h-8 w-8 object-contain"
                    alt=""
                  />
                </a>
              </div>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      {/if}
    </TableBody>
  </Table>
</div>

<DeleteModal bind:deleteModal Store={saleStore} />
