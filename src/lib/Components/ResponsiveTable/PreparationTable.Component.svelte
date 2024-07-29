<script lang="ts">
  import { goto } from "$app/navigation";
  import DeleteModal from "$lib/Components/DeleteModal.Component.svelte";
  import type { Store } from "$lib/Models/Response/Store.Response.Model";
  import type { Database } from "$lib/Supabase/Types/database.types";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { preparationStore } from "$lib/Store/Preparation.Store";
  let deleteModal = false;
  let depositLoading = false;
  let financialLoading = false;
  export let preparations: Store<
    Database["public"]["Tables"]["Preparations"]["Row"]
  > = {
    data: [],
    count: 0,
    error: "",
  };

  let deposits: Array<{ preparation_id: number; deposit_count: number }> = [];
  let financial: Array<{ preparation_id: number; financial_count: number }> =
    [];
  let deleteId: number = 0;
  onMount(async () => {
    depositLoading = true;
    financialLoading = true;
    try {
      // wait at least 1 second before fetching the deposits
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await getDeposits();
      await getFinancial();
    } finally {
      depositLoading = false;
      financialLoading = false;
    }
  });

  async function getDeposits() {
    const response = await preparationStore.getDepositsByPreparationIds(
      preparations.data.map((preparation) => preparation.id)
    );
    if (!response) {
      return;
    }
    deposits = response;
  }
  async function getFinancial() {
    const response = await preparationStore.getFinancialByPreparationIds(
      preparations.data.map((preparation) => preparation.id)
    );
    if (!response) {
      return;
    }
    financial = response;
  }
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
                  class="w-42 h-4 md:h-8 flex justify-center items-center bg-orange-500 rounded-full px-4 font-bold text-white cursor-pointer gap-3"
                  on:click={() =>
                    goto(`/deposit/preparation/${preparation.id}`)}
                >
                  Deposit

                  <p
                    class="w-auto h-2 md:h-6 rounded-full bg-orange-700 flex justify-center items-center px-2"
                  >
                    {#if depositLoading}
                      <span class="loader2"></span>
                    {:else}
                      {deposits.find((d) => d.preparation_id === preparation.id)
                        ?.deposit_count ?? 0}
                    {/if}
                  </p>
                </div>

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                  class="w-42 h-4 md:h-8 flex justify-center items-center bg-blue-400 rounded-full px-4 font-bold text-white cursor-pointer gap-3"
                  on:click={() =>
                    goto(`/finance/preparation/${preparation.id}`)}
                >
                  Financial Dues

                  <p
                    class="w-auto h-2 md:h-6 rounded-full bg-blue-700 flex justify-center items-center px-2"
                  >
                    {#if financialLoading}
                      <span class="loader2"></span>
                    {:else}
                      {financial.find(
                        (f) => f.preparation_id === preparation.id
                      )?.financial_count ?? 0}
                    {/if}
                  </p>
                </div>
              </div>
            </td>
            <td>
              <div class="flex h-auto w-auto items-center justify-center gap-2">
                <a
                  href="/project/{$page.params
                    .projectId}/expense/preparation/edit/{preparation.id}"
                  class="bg-green-600 hover:bg-green-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
                >
                  <img
                    src="/images/edit.png"
                    class="w-4 h-4 md:h-8 md:w-8 object-contain"
                    alt=""
                  />
                </a>
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <a
                  class="bg-red-600 hover:bg-red-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
                  on:click={() => {
                    deleteModal = true;
                    deleteId = preparation.id;
                  }}
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

<DeleteModal bind:deleteModal Store={preparationStore} id={deleteId} />
