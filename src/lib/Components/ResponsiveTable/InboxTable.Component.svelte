<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import type { Database } from "$lib/Supabase/Types/database.types";
  import DeleteModal from "../DeleteModal.Component.svelte";
  import { Modal, Button, Input } from "flowbite-svelte";
  import { incomeStore } from "$lib/Store/Income.Store";
  import { outcomeStore } from "$lib/Store/Outcome.Store";
  import moment from "moment";
  import { Tabs, TabItem } from "flowbite-svelte";
  import TabsPagination from "../TabsPagination.Component.svelte";
  import { Tooltip } from "flowbite-svelte";
  import { Spinner } from "flowbite-svelte";

  let isMobile: boolean;
  let delete_id = 0;
  let Store: any;
  let totalIncome: number = 0;
  let totalOutcome: number = 0;
  let deleteModal = false;
  let incomeAddModal = false;
  let outcomeAddModal = false;
  let incomeUpdateModal = false;
  let outcomeUpdateModal = false;
  let createIncome: Database["public"]["Tables"]["Income"]["Insert"] = {
    date: moment().format("YYYY-MM-DD"),
    overall_price: 0,
  };
  let createOutcome: Database["public"]["Tables"]["Outcome"]["Insert"] = {
    date: moment().format("YYYY-MM-DD"),
    overall_price: 0,
  };
  let updateIncome: Database["public"]["Tables"]["Income"]["Update"] = {
    id: 0,
    date: "",
    overall_price: 0,
  };
  let updateOutcome: Database["public"]["Tables"]["Outcome"]["Update"] = {
    id: 0,
    date: "",
    overall_price: 0,
  };
  let filter = {
    page: 0,
    limit: 10,
  };
  let isAddingIncome = false;
  let isAddingOutcome = false;
  let isUpdatingIncome = false;
  let isUpdatingOutcome = false;
  let isTableLoading = false;

  onMount(async () => {
    await handleIncome();
    await handleOutcome();
    const checkMobile = () => {
      isMobile = window.innerWidth <= 768;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.removeEventListener("resize", checkMobile);
  });

  async function handleIncome() {
    isTableLoading = true;
    try {
      await incomeStore.getAll(filter);
      totalIncome = await incomeStore.getTotal();
    } finally {
      setTimeout(() => {
        isTableLoading = false;
      }, 300);
    }
  }

  async function handleOutcome() {
    isTableLoading = true;
    try {
      await outcomeStore.getAll(filter);
      totalOutcome = await outcomeStore.getTotal();
    } finally {
      setTimeout(() => {
        isTableLoading = false;
      }, 300);
    }
  }

  async function handleCreateIncome() {
    if (isAddingIncome) return;
    try {
      isAddingIncome = true;
      await incomeStore.create(createIncome);
      createIncome = {
        date: "",
        overall_price: 0,
      };
      totalIncome = await incomeStore.getTotal();
    } catch (error) {
      console.error(error);
    } finally {
      isAddingIncome = false;
      incomeAddModal = false;
    }
  }

  async function handleCreateOutcome() {
    if (isAddingOutcome) return;
    try {
      isAddingOutcome = true;
      await outcomeStore.create(createOutcome);
      createOutcome = {
        date: "",
        overall_price: 0,
      };
      totalOutcome = await outcomeStore.getTotal();
    } catch (error) {
      console.error(error);
    } finally {
      isAddingOutcome = false;
      outcomeAddModal = false;
    }
  }

  async function handleUpdateIncome() {
    if (isUpdatingIncome) return;
    try {
      isUpdatingIncome = true;
      await incomeStore.update(updateIncome);
      updateIncome = {
        id: 0,
        date: "",
        overall_price: 0,
      };
      totalIncome = await incomeStore.getTotal();
    } catch (error) {
      console.error(error);
    } finally {
      isUpdatingIncome = false;
      incomeUpdateModal = false;
    }
  }

  async function handleUpdateOutcome() {
    if (isUpdatingOutcome) return;
    try {
      isUpdatingOutcome = true;
      await outcomeStore.update(updateOutcome);
      updateOutcome = {
        id: 0,
        date: "",
        overall_price: 0,
      };
      totalOutcome = await outcomeStore.getTotal();
    } catch (error) {
      console.error(error);
    } finally {
      isUpdatingOutcome = false;
      outcomeUpdateModal = false;
    }
  }
</script>

<Tabs
  divider={false}
  activeClasses="rounded-full h-12 w-24 bg-green-500 text-white"
  inactiveClasses="rounded-full h-12 w-24 bg-gray-500/20 dark:text-white"
  contentClass="bg-transparent p-4"
>
  <TabItem
    title={$_("outcome")}
    on:click={async () => {
      filter.page = 0;
      await handleOutcome();
    }}
  >
    <div class="w-full h-auto flex justify-start items-center gap-4">
      <Button on:click={() => (outcomeAddModal = true)} color="green"
        >+ {$_("add-outcome")}</Button
      >
      <div class="relative group">
        <div class="flex items-center gap-2">
          <div
            class="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-200 px-4 py-2 rounded-lg"
          >
            <span class="text-white font-medium">{$_("total")}:</span>
            <span class="text-green-400 font-bold">
              {Math.abs(totalOutcome).toLocaleString()}
            </span>
          </div>
          <Tooltip>{$_("total-outcome-tooltip")}</Tooltip>
        </div>
      </div>
    </div>
    <div class="w-full h-auto flex justify-center items-center mx-2 mt-4">
      <div class="relative w-full">
        {#if isTableLoading}
          <div
            class="absolute inset-0 flex items-center justify-center bg-gray-900/20 backdrop-blur-sm rounded-xl z-10 transition-all duration-300"
          >
            <Spinner size="8" color="green" />
          </div>
        {/if}
        <div
          class="transition-opacity duration-300"
          class:opacity-50={isTableLoading}
        >
          <table
            class="table w-full text-white text-[5px] md:text-lg rounded-xl"
          >
            <thead>
              <tr>
                <th scope="col">{$_("id")}</th>
                <th scope="col">{$_("date")}</th>
                <th scope="col">{$_("overhaul-price")}</th>
                <th scope="col">{$_("action")}</th>
              </tr>
            </thead>
            <tbody>
              {#if $outcomeStore.count !== 0}
                {#each $outcomeStore.data as outcome}
                  <tr>
                    <td>{outcome.id}</td>
                    <td>
                      {outcome.date
                        ? moment(outcome.date).format("DD/MM/YYYY")
                        : $_("no-date")}
                    </td>
                    <td
                      >{outcome.overall_price
                        ? Math.abs(outcome.overall_price).toLocaleString()
                        : $_("no-price")}</td
                    >
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <td
                      class="flex h-auto w-auto items-center justify-center gap-2"
                    >
                      <button
                        class="bg-sky-600 hover:bg-sky-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
                        on:click={() => {
                          outcomeUpdateModal = true;
                          updateOutcome = {
                            id: outcome.id,
                            date: outcome.date,
                            overall_price: outcome.overall_price,
                          };
                        }}
                      >
                        <img
                          src="/images/edit.png"
                          class="w-4 h-4 md:h-8 md:w-8 object-contain"
                          alt=""
                        />
                      </button>
                      <!-- svelte-ignore a11y-missing-attribute -->
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <button
                        class="bg-red-600 hover:bg-red-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full cursor-pointer"
                        on:click={() => {
                          deleteModal = true;
                          delete_id = outcome.id;
                          Store = outcomeStore;
                        }}
                      >
                        <img
                          src="/images/delete.png"
                          class="w-4 h-4 md:h-8 md:w-8 object-contain"
                          alt=""
                        />
                      </button>
                    </td>
                  </tr>
                {/each}
                <tr class="font-bold bg-gray-700">
                  <td>{$_("total")}</td>
                  <td>-</td>
                  <td
                    >{Math.abs(
                      $outcomeStore.data.reduce(
                        (sum, outcome) => sum + (outcome.overall_price || 0),
                        0
                      )
                    ).toLocaleString()}</td
                  >
                  <td>-</td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="w-full h-auto flex justify-center items-center py-12">
      <TabsPagination
        StoreData={$outcomeStore}
        Store={outcomeStore}
        {filter}
        bind:isTableLoading
      />
    </div>
  </TabItem>

  <TabItem
    open={true}
    title={$_("income")}
    on:click={async () => {
      filter.page = 0;
      await handleIncome();
    }}
  >
    <div class="w-full h-auto flex justify-start items-center">
      <div class="w-full h-auto flex justify-start items-center gap-4">
        <Button on:click={() => (incomeAddModal = true)} color="green"
          >+ {$_("add-income")}</Button
        >
        <div class="relative group">
          <div class="flex items-center gap-2">
            <div
              class="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-200 px-4 py-2 rounded-lg"
            >
              <span class="text-white font-medium">{$_("total")}:</span>
              <span class="text-green-400 font-bold">
                {Math.abs(totalIncome).toLocaleString()}
              </span>
            </div>
            <Tooltip>{$_("total-income-tooltip")}</Tooltip>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-auto flex justify-center items-center mx-2 mt-4">
      <div class="relative w-full">
        {#if isTableLoading}
          <div
            class="absolute inset-0 flex items-center justify-center bg-gray-900/20 backdrop-blur-sm rounded-xl z-10 transition-all duration-300"
          >
            <Spinner size="8" color="green" />
          </div>
        {/if}
        <div
          class="transition-opacity duration-300"
          class:opacity-50={isTableLoading}
        >
          <table
            class="table w-full text-white text-[5px] md:text-lg rounded-xl"
          >
            <thead>
              <tr>
                <th scope="col">{$_("id")}</th>
                <th scope="col">{$_("date")}</th>
                <th scope="col">{$_("overhaul-price")}</th>
                <th scope="col">{$_("action")}</th>
              </tr>
            </thead>
            <tbody>
              {#if $incomeStore.count !== 0}
                {#each $incomeStore.data as income}
                  <tr>
                    <td>{income.id}</td>
                    <td>
                      {income.date
                        ? moment(income.date).format("DD/MM/YYYY")
                        : $_("no-date")}
                    </td>
                    <td
                      >{income.overall_price
                        ? Math.abs(income.overall_price).toLocaleString()
                        : $_("no-price")}</td
                    >
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <td
                      class="flex h-auto w-auto items-center justify-center gap-2"
                    >
                      <button
                        id="update-button-{income.id}"
                        class="bg-sky-600 hover:bg-sky-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
                        on:click={() => {
                          incomeUpdateModal = true;
                          updateIncome = {
                            id: income.id,
                            date: income.date,
                            overall_price: income.overall_price,
                          };
                        }}
                      >
                        <img
                          src="/images/edit.png"
                          class="w-4 h-4 md:h-8 md:w-8 object-contain"
                          alt=""
                        />
                      </button>
                      <Tooltip triggeredBy={`#update-button-${income.id}`}>
                        {$_("edit")}
                      </Tooltip>
                      <!-- svelte-ignore a11y-missing-attribute -->
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <button
                        id={`delete-button-${income.id}`}
                        class="bg-red-600 hover:bg-red-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full cursor-pointer"
                        on:click={() => {
                          deleteModal = true;
                          delete_id = income.id;
                          Store = incomeStore;
                        }}
                      >
                        <img
                          src="/images/delete.png"
                          class="w-4 h-4 md:h-8 md:w-8 object-contain"
                          alt=""
                        />
                      </button>
                      <Tooltip triggeredBy={`#delete-button-${income.id}`}>
                        {$_("delete")}
                      </Tooltip>
                    </td>
                  </tr>
                {/each}
                <tr class="font-bold bg-gray-700">
                  <td>{$_("total")}</td>
                  <td></td>
                  <td
                    >{Math.abs(
                      $incomeStore.data.reduce(
                        (sum, income) => sum + (income.overall_price || 0),
                        0
                      )
                    ).toLocaleString()}</td
                  >
                  <td>-</td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="w-full h-auto flex justify-center items-center py-12">
      <TabsPagination
        StoreData={$incomeStore}
        Store={incomeStore}
        {filter}
        bind:isTableLoading
      />
    </div>
  </TabItem>
</Tabs>

<DeleteModal bind:deleteModal {Store} id={delete_id} />

<Modal
  title={$_("add-income")}
  bind:open={incomeAddModal}
  outsideclose
  size="md"
>
  <div class="w-full h-auto flex justify-center items-center gap-2 flex-col">
    <div class="w-full h-auto flex flex-col justify-center items-start gap-2">
      <p class="dark:text-white">{$_("income-date")}</p>
      <Input
        placeholder={$_("date")}
        bind:value={createIncome.date}
        type="date"
      />
    </div>
    <div class="w-full h-auto flex flex-col justify-center items-start gap-2">
      <p class="dark:text-white">{$_("price")}</p>
      <Input bind:value={createIncome.overall_price} type="number" />
    </div>
  </div>
  <svelte:fragment slot="footer">
    <Button
      on:click={handleCreateIncome}
      color="green"
      disabled={isAddingIncome}
    >
      {isAddingIncome ? $_("loading") : $_("add-income")}
    </Button>
    <Button
      on:click={() => (incomeAddModal = false)}
      color="red"
      disabled={isAddingIncome}
    >
      {$_("cancel")}
    </Button>
  </svelte:fragment>
</Modal>

<Modal
  title={$_("add-outcome")}
  bind:open={outcomeAddModal}
  outsideclose
  size="md"
>
  <div class="w-full h-auto flex justify-center items-center gap-2 flex-col">
    <div class="w-full h-auto flex flex-col justify-center items-start gap-2">
      <p class="dark:text-white">{$_("outcome-date")}</p>
      <Input
        placeholder={$_("date")}
        bind:value={createOutcome.date}
        type="date"
      />
    </div>
    <div class="w-full h-auto flex flex-col justify-center items-start gap-2">
      <p class="dark:text-white">{$_("price")}</p>
      <Input bind:value={createOutcome.overall_price} type="number" />
    </div>
  </div>
  <svelte:fragment slot="footer">
    <Button
      on:click={handleCreateOutcome}
      color="green"
      disabled={isAddingOutcome}
    >
      {isAddingOutcome ? $_("loading") : $_("add-outcome")}
    </Button>
    <Button
      on:click={() => (outcomeAddModal = false)}
      color="red"
      disabled={isAddingOutcome}
    >
      {$_("cancel")}
    </Button>
  </svelte:fragment>
</Modal>

<Modal
  title={$_("update-income")}
  bind:open={incomeUpdateModal}
  outsideclose
  size="md"
>
  <div class="w-full h-auto flex justify-center items-center gap-2 flex-col">
    <div class="w-full h-auto flex flex-col justify-center items-start gap-2">
      <p class="dark:text-white">{$_("income-date")}</p>
      <Input
        placeholder={$_("date")}
        bind:value={updateIncome.date}
        type="date"
      />
    </div>
    <div class="w-full h-auto flex flex-col justify-center items-start gap-2">
      <p class="dark:text-white">{$_("price")}</p>
      <Input bind:value={updateIncome.overall_price} type="number" />
    </div>
  </div>
  <svelte:fragment slot="footer">
    <Button
      on:click={handleUpdateIncome}
      color="green"
      disabled={isUpdatingIncome}
    >
      {isUpdatingIncome ? $_("loading") : $_("update")}
    </Button>
    <Button
      on:click={() => (incomeUpdateModal = false)}
      color="red"
      disabled={isUpdatingIncome}
    >
      {$_("cancel")}
    </Button>
  </svelte:fragment>
</Modal>

<Modal
  title={$_("update-outcome")}
  bind:open={outcomeUpdateModal}
  outsideclose
  size="md"
>
  <div class="w-full h-auto flex justify-center items-center gap-2 flex-col">
    <div class="w-full h-auto flex flex-col justify-center items-start gap-2">
      <p class="dark:text-white">{$_("outcome-date")}</p>
      <Input
        placeholder={$_("date")}
        bind:value={updateOutcome.date}
        type="date"
      />
    </div>
    <div class="w-full h-auto flex flex-col justify-center items-start gap-2">
      <p class="dark:text-white">{$_("price")}</p>
      <Input bind:value={updateOutcome.overall_price} type="number" />
    </div>
  </div>
  <svelte:fragment slot="footer">
    <Button
      on:click={handleUpdateOutcome}
      color="green"
      disabled={isUpdatingOutcome}
    >
      {isUpdatingOutcome ? $_("loading") : $_("update")}
    </Button>
    <Button
      on:click={() => (outcomeUpdateModal = false)}
      color="red"
      disabled={isUpdatingOutcome}
    >
      {$_("cancel")}
    </Button>
  </svelte:fragment>
</Modal>
