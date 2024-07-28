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





<div class="w-full h-auto flex justify-center items-center mx-2">

    <table class="table w-[100%] text-white text-[5px] md:text-lg rounded-xl">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Phone</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>

        {#if users.count !== 0}
        {#each users.data as user}
        <tr>
          <td>{user.name}</td>
          <td>{user.phone}</td>
          <td>{user.email}</td>
         
          <td>
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <div class="flex h-auto w-auto items-center justify-center gap-2">
              <a
                href="edit/{user.id}"
                class="bg-green-600 hover:bg-green-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
              >
                <img
                  src="/images/edit.png"
                  class="w-4 h-4 md:h-8 md:w-8 object-contain"
                  alt=""
                />
              </a>
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <a
                class="bg-red-600 hover:bg-red-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
                on:click={() => (deleteModal = true)}
              >
                <img
                  src="/images/delete.png"
                  class="w-4 h-4 md:h-8 md:w-8 object-contain"
                  alt=""
                />
              </a>
            </div>
          </td>

        </tr>
        {/each}
        {/if}
      </tbody>
    </table>

  </div>

  <DeleteModal bind:deleteModal={deleteModal} />