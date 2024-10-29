<script lang="ts">
  import { _ } from "svelte-i18n";
  import { inboxStore } from "$lib/Store/Inbox.Store";
  import { onMount } from "svelte";
  import type { Store } from "$lib/Models/Response/Store.Response.Model";
  import type { Database } from "$lib/Supabase/Types/database.types";
  import DeleteModal from "../DeleteModal.Component.svelte";
  import { Modal, Button, Input } from "flowbite-svelte";
  import { incomeStore } from "$lib/Store/Income.Store";
  import { outcomeStore } from "$lib/Store/Outcome.Store";
  import moment from "moment";
  import type { InboxEntity } from "$lib/Models/Entity/Inbox.Entity.Model";
  import type { OutcomeEntity } from "$lib/Models/Entity/Outcome.Entity.Model";
  import type { IncomeEntity } from "$lib/Models/Entity/Income.Entity.Model";
  import { Tabs, TabItem } from "flowbite-svelte";

  export let inboxes: Store<InboxEntity> = {
    data: [],
    count: 0,
  };

  let isMobile: boolean;
  let delete_id = 0;
  let Store: any;
  let deleteModal = false;
  let incomeModal = false;
  let outcomeModal = false;
  let incomeAddModal = false;
  let outcomeAddModal = false;
  let outcomeUpdateModal = false;
  let createIncome: Database["public"]["Tables"]["Income"]["Insert"] = {
    date: "",
    overall_price: 0,
  };
  let createOutcome: Database["public"]["Tables"]["Outcome"]["Insert"] = {
    date: "",
    overall_price: 0,
  };
  onMount(async () => {
    await handleIncome();
    const checkMobile = () => {
      isMobile = window.innerWidth <= 768;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.removeEventListener("resize", checkMobile);
  });

  async function handleIncome() {
    await incomeStore.getAll({
      page: 0,
      limit: 10,
    });
  }

  async function handleOutcome() {
    await outcomeStore.getAll({
      page: 0,
      limit: 10,
    });
  }

  async function handleCreateIncome() {
    try {
      const response = await incomeStore.create(createIncome);
      inboxes.data = inboxes.data.map((inbox) =>
        inbox.id === createIncome.inbox
          ? {
              ...inbox,
              income: [...inbox.income, response?.data as IncomeEntity],
            }
          : inbox
      );
    } catch (error) {
      console.error(error);
    } finally {
      incomeAddModal = false;
    }
  }

  async function handleCreateOutcome() {
    try {
      const response = await outcomeStore.create(createOutcome);
      inboxes.data = inboxes.data.map((inbox) =>
        inbox.id === createOutcome.inbox
          ? {
              ...inbox,
              outcome: [...inbox.outcome, response?.data as OutcomeEntity],
            }
          : inbox
      );
    } catch (error) {
      console.error(error);
    } finally {
      outcomeAddModal = false;
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
      await handleOutcome();
    }}
  >
    <div class="w-full h-auto flex justify-start items-center">
      <Button on:click={() => (outcomeAddModal = true)} color="green"
        >+ {$_("add-outcome")}</Button
      >
    </div>
    <div class="w-full h-auto flex justify-center items-center mx-2 mt-4">
      <table class="table w-full text-white text-[5px] md:text-lg rounded-xl">
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
                <td>{outcome.overall_price ?? $_("no-price")}</td>
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <td
                  class="flex h-auto w-auto items-center justify-center gap-2"
                >
                  <!-- <a
                    href="edit/{outcome.id}"
                    class="bg-yellow-600 hover:bg-yellow-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
                  >
                    <img
                      src="/images/edit.png"
                      class="w-4 h-4 md:h-8 md:w-8 object-contain"
                      alt=""
                    />
                  </a> -->
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
                >{$outcomeStore.data.reduce(
                  (sum, outcome) => sum + (outcome.overall_price || 0),
                  0
                )}</td
              >
              <td>-</td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </TabItem>

  <TabItem
    title={$_("income")}
    on:click={async () => {
      await handleIncome();
    }}
  >
    <div class="w-full h-auto flex justify-start items-center">
      <Button on:click={() => (incomeAddModal = true)} color="green"
        >+ {$_("add-income")}</Button
      >
    </div>
    <div class="w-full h-auto flex justify-center items-center mx-2 mt-4">
      <table class="table w-full text-white text-[5px] md:text-lg rounded-xl">
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
                <td>{income.overall_price ?? $_("no-price")}</td>
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <td
                  class="flex h-auto w-auto items-center justify-center gap-2"
                >
                  <!-- <a
                    href="edit/{income.id}"
                    class="bg-yellow-600 hover:bg-yellow-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
                  >
                    <img
                      src="/images/edit.png"
                      class="w-4 h-4 md:h-8 md:w-8 object-contain"
                      alt=""
                    />
                  </a> -->
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <button
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
                </td>
              </tr>
            {/each}
            <tr class="font-bold bg-gray-700">
              <td>{$_("total")}</td>
              <td></td>
              <td
                >{$incomeStore.data.reduce(
                  (sum, income) => sum + (income.overall_price || 0),
                  0
                )}</td
              >
              <td>-</td>
            </tr>
          {/if}
        </tbody>
      </table>
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
    <Button on:click={handleCreateIncome} color="green"
      >{$_("add-income")}</Button
    >
    <Button on:click={() => (incomeAddModal = false)} color="red"
      >{$_("cancel")}</Button
    >
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
    <Button on:click={handleCreateOutcome} color="green"
      >{$_("add-outcome")}</Button
    >
    <Button on:click={() => (outcomeAddModal = false)} color="red"
      >{$_("cancel")}</Button
    >
  </svelte:fragment>
</Modal>

<!-- <Modal
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
    <Button on:click={handleCreateOutcome} color="green"
      >{$_("add-outcome")}</Button
    >
    <Button on:click={() => (outcomeAddModal = false)} color="red"
      >{$_("cancel")}</Button
    >
  </svelte:fragment>
</Modal> -->
