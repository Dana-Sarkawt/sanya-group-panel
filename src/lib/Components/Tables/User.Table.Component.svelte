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

  export let users: Store<Database["public"]["Tables"]["Users"]["Row"]> = {
    data: [],
    count: 0,
  };

  let deleteModal = false;
</script>

<div class="w-full h-auto bg-[#ffffff] dark:bg-[#081c18] p-4 rounded-b-xl">
  <Table striped={true}>
    <TableHead theadClass="bg-white dark:bg-[#212121] text-center">
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Phone</TableHeadCell>
      <TableHeadCell>Email</TableHeadCell>
      <TableHeadCell>Action</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y text-center">
      {#if users.count !== 0}
        {#each users.data as user}
          <TableBodyRow>
            <TableBodyCell>{user.name}</TableBodyCell>
            <TableBodyCell>{user.phone}</TableBodyCell>
            <TableBodyCell>{user.email}</TableBodyCell>

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
                  class="bg-red-600 hover:bg-red-500 h-12 w-12 p-2 flex justify-center items-center rounded-full" on:click={() => (deleteModal = true)}
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


<DeleteModal bind:deleteModal={deleteModal} />