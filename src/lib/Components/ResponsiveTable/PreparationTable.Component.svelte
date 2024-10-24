<script lang="ts">
  import { goto } from "$app/navigation";
  import DeleteModal from "$lib/Components/DeleteModal.Component.svelte";
  import type { Store } from "$lib/Models/Response/Store.Response.Model";
  import type { Database } from "$lib/Supabase/Types/database.types";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { preparationStore } from "$lib/Store/Preparation.Store";
  import { formatNumber } from "$lib/Utils/ConvertNumbers.Utils";
  import { VITE_SUPABASE_BUCKET_SANYA } from "$env/static/public";
  import { _ } from "svelte-i18n";
  import ImageDialog from "../ImageDialog.Component.svelte";
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
  let selectedImage: string = "";
  let imageDialog = false;

  let deposits: Array<{
    preparation_id: number;
    deposit_count: number;
    total_price: number;
  }> = [];
  let financial: Array<{
    preparation_id: number;
    financial_count: number;
    total_price: number;
  }> = [];
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
        <th scope="col">{$_("image")}</th>
        <th scope="col">{$_("id")}</th>
        <th scope="col">{$_("description")}</th>
        <!-- <th scope="col">New Action</th> -->
        <th scope="col">{$_("action")}</th>
      </tr>
    </thead>
    <tbody>
      {#if preparations.count !== 0}
        {#each preparations.data as preparation}
          <tr>
            <td class="flex justify-center h-28 items-center">
              <div class="relative group">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <img
                  src={preparation.image
                    ? `${VITE_SUPABASE_BUCKET_SANYA}${preparation.image}`
                    : "/images/spark.png"}
                  class="w-10 h-10 object-contain rounded-lg transition-all duration-300 group-hover:scale-150 group-hover:z-10 cursor-pointer"
                  alt={preparation.image}
                  on:click={() => {
                    selectedImage = preparation.image
                      ? `${VITE_SUPABASE_BUCKET_SANYA}${preparation.image}`
                      : "/images/spark.png";
                    imageDialog = true;
                  }}
                />
              </div>
            </td>
            <td>{preparation.id}</td>
            <td>{preparation.description}</td>
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
<ImageDialog bind:image={selectedImage} bind:open={imageDialog} />
