<script lang="ts">
  import type { Store } from "$lib/Models/Response/Store.Response.Model";
  import type { Database } from "$lib/Supabase/Types/database.types";
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import DeleteModal from "$lib/Components/DeleteModal.Component.svelte";
  import { projectStore } from "$lib/Store/Project.Store";
  import { _ } from "svelte-i18n";

  interface Props {
    projects?: Store<Database["public"]["Tables"]["Projects"]["Row"]>;
  }

  let { projects = {
      data: [],
      count: 0,
    } }: Props = $props();

  let deleteModal = $state(false);
</script>

<div class="w-full h-auto bg-[#ffffff] dark:bg-[#081c18] p-4 rounded-b-xl">
  <Table striped={true}>
    <TableHead theadClass="bg-white dark:bg-[#212121] text-center">
      <TableHeadCell>{$_("project-id")}</TableHeadCell>
      <TableHeadCell>{$_("project-name")}</TableHeadCell>
      <TableHeadCell>{$_("status")}</TableHeadCell>
      <TableHeadCell>{$_("action")}</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y text-center">
      {#if projects.count !== 0}
        {#each projects.data as project}
          <TableBodyRow>
            <TableBodyCell>{project.id}</TableBodyCell>
            <TableBodyCell>{project.name}</TableBodyCell>
            <TableBodyCell>{project.status}</TableBodyCell>
            <TableBodyCell>
              <!-- svelte-ignore a11y_click_events_have_key_events -->
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
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <a
                  class="bg-red-600 hover:bg-red-500 h-12 w-12 p-2 flex justify-center items-center rounded-full"
                  onclick={() => (deleteModal = true)}
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

<DeleteModal bind:deleteModal Store={projectStore} />

<style>
</style>
