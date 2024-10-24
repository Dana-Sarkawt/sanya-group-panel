<script lang="ts">
  import { goto } from "$app/navigation";
  import DeleteModal from "$lib/Components/DeleteModal.Component.svelte";
  import type { Store } from "$lib/Models/Response/Store.Response.Model";
  import type { Database } from "$lib/Supabase/Types/database.types";
  import { page } from "$app/stores";
  import { workerStore } from "$lib/Store/Worker.Store";
  import { onMount } from "svelte";
  import { formatNumber } from "$lib/Utils/ConvertNumbers.Utils";
  import { VITE_SUPABASE_BUCKET_SANYA } from "$env/static/public";
  import { _ } from "svelte-i18n";
  import ImageDialog from "../ImageDialog.Component.svelte";
  let deleteModal = false;
  let depositLoading = false;
  let financialLoading = false;
  export let workers: Store<Database["public"]["Tables"]["Workers"]["Row"]> = {
    data: [],
    count: 0,
    error: "",
  };
  let deposits: Array<{
    worker_id: number;
    deposit_count: number;
    total_price: number;
  }> = [];
  let financial: Array<{
    worker_id: number;
    financial_count: number;
    total_price: number;
  }> = [];
  let deleteId: number = 0;
  let selectedImage: string = "";
  let imageDialog = false;

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
    const response = await workerStore.getDepositsByWorkerIds(
      workers.data.map((worker) => worker.id)
    );
    if (!response) {
      return;
    }
    deposits = response;
  }
  async function getFinancial() {
    const response = await workerStore.getFinancialByWorkerIds(
      workers.data.map((worker) => worker.id)
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
        <th scope="col">{$_("image")}</th>
        <th scope="col">{$_("id")}</th>
        <th scope="col">{$_("name")}</th>
        <th scope="col">{$_("new-action")}</th>
        <th scope="col">{$_("action")}</th>
      </tr>
    </thead>
    <tbody>
      {#if workers.count !== 0}
        {#each workers.data as worker}
          <tr>
            <td class="flex justify-center items-center h-28">
              <div class="relative group">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <img
                  src={worker.image
                    ? `${VITE_SUPABASE_BUCKET_SANYA}${worker.image}`
                    : "/images/spark.png"}
                  class="w-10 h-10 object-contain rounded-lg transition-all duration-300 group-hover:scale-150 group-hover:z-10 cursor-pointer"
                  alt={worker.image}
                  on:click={() => {
                    selectedImage = worker.image
                      ? `${VITE_SUPABASE_BUCKET_SANYA}${worker.image}`
                      : "/images/spark.png";
                    imageDialog = true;
                  }}
                />
              </div>
            </td>
            <td>{worker.id}</td>
            <td>{worker.name}</td>
            <td>
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <div class="w-full h-auto flex justify-center items-center gap-2">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                  class="w-42 h-auto flex flex-col justify-center items-center bg-orange-500 rounded-xl px-4 font-bold text-white cursor-pointer p-2 gap-3"
                  on:click={() => goto(`/deposit/worker/${worker.id}`)}
                >
                  <div
                    class="w-auto h-auto flex justify-center items-center gap-2"
                  >
                    <p>{$_("deposit")}</p>

                    <p
                      class="w-auto h-2 md:h-6 rounded-full bg-orange-700 flex justify-center items-center px-2"
                    >
                      {#if depositLoading}
                        <span class="loader2"></span>
                      {:else}
                        {deposits.find((d) => d.worker_id === worker.id)
                          ?.deposit_count ?? 0}
                      {/if}
                    </p>
                  </div>

                  <div
                    class="w-full h-auto flex justify-center items-center bg-orange-700 rounded-xl px-2"
                  >
                    <p class="text-gray-300">
                      {$_("total:")}
                      <span class="text-white"
                        >{formatNumber(
                          deposits.find((d) => d.worker_id == worker.id)
                            ?.total_price ?? 0
                        )}</span
                      >
                    </p>
                  </div>
                </div>

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                  class="w-42 h-auto flex flex-col justify-center items-center bg-blue-400 rounded-xl px-4 font-bold text-white cursor-pointer p-2 gap-3"
                  on:click={() => goto(`/finance/worker/${worker.id}`)}
                >
                  <div
                    class="w-auto h-auto flex justify-center items-center gap-2"
                  >
                    <p>{$_("financial-dues")}</p>

                    <p
                      class="w-auto h-2 md:h-6 rounded-full bg-blue-700 flex justify-center items-center px-2"
                    >
                      {#if financialLoading}
                        <span class="loader2"></span>
                      {:else}
                        {financial.find((f) => f.worker_id === worker.id)
                          ?.financial_count ?? 0}
                      {/if}
                    </p>
                  </div>

                  <div
                    class="w-full h-auto flex justify-center items-center bg-blue-700 rounded-xl px-2"
                  >
                    <p class="text-gray-300">
                      {$_("total:")}
                      <span class="text-white"
                        >{formatNumber(
                          financial.find((f) => f.worker_id == worker.id)
                            ?.total_price ?? 0
                        )}</span
                      >
                    </p>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div class="flex h-auto w-auto items-center justify-center gap-2">
                <a
                  href="/project/{$page.params
                    .projectId}/expense/worker/edit/{worker.id}"
                  class="bg-green-600 hover:bg-green-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
                >
                  <img
                    src="/images/edit.png"
                    class="w-4 h-4 md:h-8 md:w-8 object-contain"
                    alt=""
                  />
                </a>
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <a
                  class="bg-red-600 hover:bg-red-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
                  on:click={() => {
                    deleteModal = true;
                    deleteId = worker.id;
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

<DeleteModal bind:deleteModal Store={workerStore} id={deleteId} />
<ImageDialog bind:image={selectedImage} bind:open={imageDialog} />
