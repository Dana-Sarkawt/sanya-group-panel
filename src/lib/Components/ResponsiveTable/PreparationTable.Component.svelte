<script lang="ts">
  import { goto } from "$app/navigation";
  import DeleteModal from "$lib/Components/DeleteModal.Component.svelte";
  import type { Store } from "$lib/Models/Response/Store.Response.Model";
  import type { Database } from "$lib/Supabase/Types/database.types";
  let deleteModal = false;
  export let preparations: Store<
    Database["public"]["Tables"]["Preparations"]["Row"]
  > = {
    data: [],
    count: 0,
    error: "",
  };
</script>

<div class="w-full h-auto flex justify-center items-center mx-2">
  <table class="table w-full text-white text-[5px] md:text-lg rounded-xl">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Description</th>
        <th scope="col">New Action</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      {#if preparations.count !== 0}
        {#each preparations.data as preparation}
          <tr>
            <td>{preparation.id}</td>
            <td>{preparation.description}</td>
            <td>
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <div class="w-full h-auto flex justify-center items-center gap-2">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                  class="w-42 h-4 md:h-8 flex justify-center items-center bg-orange-500 rounded-full px-4 font-bold text-white cursor-pointer"
                  on:click={() =>
                    goto(`/deposit/preparation/${preparation.id}`)}
                >
                  Deposit
                </div>

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                  class="w-42 h-4 md:h-8 flex justify-center items-center bg-blue-400 rounded-full px-4 font-bold text-white cursor-pointer"
                  on:click={() =>
                    goto(`/finance/preparation/${preparation.id}`)}
                >
                  Financial Dues
                </div>
              </div>
            </td>
            <td>
              <div class="flex h-auto w-auto items-center justify-center gap-2">
                <a
                  href="edit/1"
                  class="bg-green-600 hover:bg-green-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
                >
                  <img
                    src="/images/edit.png"
                    class="w-4 h-4 md:h-8 md:w-8 object-contain"
                    alt=""
                  />
                </a>
                <!-- svelte-ignore a11y-missing-attribute -->
                <a
                  class="bg-red-600 hover:bg-red-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
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

<DeleteModal bind:deleteModal />
