<script lang="ts">
  import DeleteModal from "$lib/Components/DeleteModal.Component.svelte";
  import type { Database } from "$lib/Supabase/Types/database.types";
  import type { Store } from "$lib/Models/Response/Store.Response.Model";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { depositStore } from "$lib/Store/Deposit.Store";
  let deleteModal = false;
  export let sales: Store<Database["public"]["Tables"]["Sales"]["Row"]> = {
    data: [],
    count: 0,
  };

  onMount(async () => {
    await depositStore.getAll({
      equal: $page.params.projectId,
    });
  });
</script>

<div class="w-full h-auto flex justify-center items-center mx-2">
  <table class="table w-full text-white text-[5px] md:text-lg rounded-xl">
    <thead>
      <tr>
        <th scope="col">Description</th>
        <th scope="col">New Action</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      {#if sales.count !== 0}
        {#each sales.data as sale}
          <tr>
            <td>{sale.description}</td>
            <td>
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <div class="w-full h-auto flex justify-center items-center gap-2">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                  class="w-42 h-4 md:h-8 flex justify-center items-center bg-orange-500 rounded-full px-4 font-bold text-white cursor-pointer gap-3"
                  on:click={() => goto(`/deposit/sale/${sale.id}`)}
                >
                  Deposit
                  <p class="w-auto h-6 rounded-full bg-orange-700 flex justify-center items-center px-2">
                    <!-- {$depositStore.data.filter((deposit) => deposit.sale_id === sale.id).length} -->
                    999
                  </p>
                </div>

                <div
                  class="w-42 h-4 md:h-8 flex justify-center items-center bg-blue-400 rounded-full px-4 font-bold text-white cursor-pointer gap-3"
                  on:click={() => goto(`/finance/sale/${sale.id}`)}
                >
                  Financial Dues

                  <p class="w-auto h-6 rounded-full bg-blue-700 flex justify-center items-center px-2">
                    <!-- {$depositStore.data.filter((deposit) => deposit.sale_id === sale.id).length} -->
                    999
                  </p>
                </div>
              </div>
            </td>

            <td>
              <div class="flex h-auto w-auto items-center justify-center gap-2">
                <a
                  href="/project/{$page.params.projectId}/sales/edit/{sale.id}"
                  class="bg-green-600 hover:bg-green-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
                >
                  <img
                    src="/images/edit.png"
                    class="w-4 h-4 md:h-8 md:w-8 object-contain"
                    alt=""
                  />
                </a>
                <a
                  href="edit/1"
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
