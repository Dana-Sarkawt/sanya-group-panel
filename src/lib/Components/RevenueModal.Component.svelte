<script lang="ts">
	import { incomeStore } from '$lib/Store/Income.Store';
	import { outcomeStore } from '$lib/Store/Outcome.Store';
	import { Button, Modal } from 'flowbite-svelte';
	import { Tabs, TabItem } from 'flowbite-svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	interface Props {
		revenueModal?: boolean;
	}

	let { revenueModal = $bindable(false) }: Props = $props();

	onMount(async () => {
		await incomeStore.getAll();
		await outcomeStore.getAll();
	});
</script>

<Modal size="xl" title="Revenue Modal" bind:open={revenueModal}>
	<Tabs
		defaultClass="flex flex-wrap space-x-2 rtl:space-x-reverse w-full flex justify-center items-center bg-transparent"
		style="backdrop-blur:blur(10px);"
		id="modalHeader"
		divider={false}
		contentClass="p-4 bg-gray-50 rounded-lg bg-transparent mt-4"
		activeClasses="p-4 rounded-full bg-green-600 text-white"
		inactiveClasses="p-4 dark:text-white text-black  rounded-full hover:text-white "
	>
		<TabItem open title="Income">
			<div class="h-auto w-full rounded-b-xl bg-[#ffffff] dark:bg-[#081c18]">
				<Table striped={true}>
					<TableHead theadClass="bg-white dark:bg-[#212121] text-center">
						<TableHeadCell>{$_('income-date')}</TableHeadCell>
						<TableHeadCell>{$_('price')}</TableHeadCell>
					</TableHead>
					<TableBody tableBodyClass="divide-y text-center">
						{#if $incomeStore.data.length > 0}
							{#each $incomeStore.data as income}
								<TableBodyRow>
									<TableBodyCell>{income.date}</TableBodyCell>
									<TableBodyCell>{income.overall_price}</TableBodyCell>
								</TableBodyRow>
							{/each}
						{/if}
					</TableBody>
				</Table>
			</div>
		</TabItem>

		<TabItem title="Outcome">
			<div class="h-auto w-full rounded-b-xl bg-[#ffffff] dark:bg-[#081c18]">
				<Table striped={true}>
					<TableHead theadClass="bg-white dark:bg-[#212121] text-center">
						<TableHeadCell>Outcome Date</TableHeadCell>
						<TableHeadCell>Price</TableHeadCell>
					</TableHead>
					<TableBody tableBodyClass="divide-y text-center">
						{#if $outcomeStore.data.length > 0}
							{#each $outcomeStore.data as outcome}
								<TableBodyRow>
									<TableBodyCell>{outcome.date}</TableBodyCell>
									<TableBodyCell>{outcome.overall_price}</TableBodyCell>
								</TableBodyRow>
							{/each}
						{/if}
					</TableBody>
				</Table>
			</div>
		</TabItem>
	</Tabs>
	{@render footer()}
</Modal>

{#snippet footer()}
	<!-- <Button
        class="w-full h-12 bg-red-500 dark:bg-red-500 hover:bg-red-400 dark:hover:bg-red-400 rounded-xl duration-300 ease-in-out"
        >No</Button
      >
      <Button
        class="w-full h-12 bg-green-500 dark:bg-green-500 hover:bg-green-400 dark:hover:bg-green-400 rounded-xl duration-300 ease-in-out"
       >Yes</Button
      > -->
{/snippet}
