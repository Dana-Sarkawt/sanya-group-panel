<script lang="ts">
  import DeleteModal from "$lib/Components/DeleteModal.Component.svelte";
  import type { Store } from "$lib/Models/Response/Store.Response.Model";
  import { capitalStore } from "$lib/Store/Capital.Store";
  import type { Database } from "$lib/Supabase/Types/database.types";
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { _ } from "svelte-i18n";
  interface Props {
    capitals?: Store<Database["public"]["Tables"]["Capitals"]["Row"]>;
  }

  let { capitals = {
      data: [],
      count: 0,
    } }: Props = $props();
  let deleteModal = $state(false);
  let deleteId: number = $state(0);
</script>

<div class="w-full h-auto bg-[#ffffff] dark:bg-[#081c18] p-4 rounded-b-xl">
  <Table striped={true}>
    <TableHead theadClass="bg-white dark:bg-[#212121] text-center">
      <TableHeadCell>{$_("description")}</TableHeadCell>
      <TableHeadCell>{$_("price")}</TableHeadCell>
      <TableHeadCell>{$_("date")}</TableHeadCell>
      <TableHeadCell>{$_("action")}</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y text-center">
      {#if capitals.count !== 0}
        {#each capitals.data as capital}
          <TableBodyRow>
            <TableBodyCell>{capital.description}</TableBodyCell>
            <TableBodyCell>{capital.price}</TableBodyCell>
            <TableBodyCell>{capital.date}</TableBodyCell>

            <TableBodyCell>
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <!-- svelte-ignore a11y_missing_attribute -->
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

                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <a
                  class="bg-red-600 hover:bg-red-500 h-12 w-12 p-2 flex justify-center items-center rounded-full"
                  onclick={() => {
                    deleteModal = true;
                    deleteId = capital.id;

                  }}
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

<DeleteModal bind:deleteModal Store={capitalStore} id={deleteId} />
