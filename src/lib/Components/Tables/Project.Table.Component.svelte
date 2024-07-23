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
  export let projects: Store<Database["public"]["Tables"]["Projects"]["Row"]> =
    {
      data: [],
      count: 0,
    };
</script>

<div class="w-full h-auto bg-[#ffffff] dark:bg-[#081c18] p-4 rounded-b-xl">
  <Table striped={true}>
    <TableHead theadClass="bg-white dark:bg-[#212121] text-center">
      <TableHeadCell>Project ID</TableHeadCell>
      <TableHeadCell>Project Name</TableHeadCell>
      <TableHeadCell>Status</TableHeadCell>
      <TableHeadCell>Action</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y text-center">
      {#if projects.count !== 0}
        {#each projects.data as project}
          <TableBodyRow>
            <TableBodyCell>{project.id}</TableBodyCell>
            <TableBodyCell>{project.name}</TableBodyCell>
            <TableBodyCell>{project.status}</TableBodyCell>
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

      <TableBodyRow>
        <TableBodyCell>454</TableBodyCell>
        <TableBodyCell>project-2</TableBodyCell>
        <TableBodyCell>DONE</TableBodyCell>

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

      <TableBodyRow>
        <TableBodyCell>625</TableBodyCell>
        <TableBodyCell>project-1</TableBodyCell>
        <TableBodyCell>DONE</TableBodyCell>

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
    </TableBody>
  </Table>
</div>
