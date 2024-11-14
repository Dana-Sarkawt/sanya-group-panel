<script lang="ts">
	import { Overhaul } from '$lib/Models/Common/Overhaul.Common.Model';
	import { exportAsExcelFile } from '$lib/Utils/ExportAsExcel.Utils';
	import { onMount } from 'svelte';
	import SalesTable from '$lib/Components/ResponsiveTable/SalesTable.Component.svelte';
	import { saleStore } from '$lib/Store/Sale.Store';
	import { capitalStore } from '$lib/Store/Capital.Store';
	import { page } from '$app/stores';
	import { Tabs, TabItem } from 'flowbite-svelte';
	import CapitalTable from '$lib/Components/ResponsiveTable/CapitalTable.Component.svelte';
	import Pagination from '$lib/Components/Pagination.Store.Component.svelte';
	import { goto } from '$app/navigation';
	import { formatNumber } from '$lib/Utils/ConvertNumbers.Utils';
	import { _ } from 'svelte-i18n';
	let totalCapital = $state(0);
	let isLoading = $state(false);
	let sales: Overhaul = $state(new Overhaul());
	onMount(async () => {
		isLoading = true;
		try {
			totalCapital = (await capitalStore.getTotalPrice(Number($page.params.projectId))) ?? 0;
			const deposits = await saleStore.getOverhaulDepositsByProjectId(
				Number($page.params.projectId)
			);
			const financials = await saleStore.getOverhaulFinancialsByProjectId(
				Number($page.params.projectId)
			);
			if (deposits) {
				sales.deposits = deposits;
			}
			if (financials) {
				sales.financials = financials;
			}
		} finally {
			isLoading = false;
		}
	});

	async function retrieveCapital() {
		goto(`/project/${$page.params.projectId}/0`);
		await capitalStore.getAll({
			limit: 10,
			page: 0,
			equal: $page.params.projectId,
			field: 'project_id'
		});
	}

	async function retrieveSales() {
		goto(`/project/${$page.params.projectId}/0`);
		await saleStore.getAll({
			limit: 10,
			page: 0,
			equal: $page.params.projectId,
			field: 'project_id'
		});
	}
</script>

<div class="flex h-auto w-full items-center justify-center md:px-44">
	<a href="/project/0">
		<p
			class="flex h-12 w-24 items-center justify-center rounded-xl bg-green-700 text-white duration-300 ease-in-out hover:bg-green-500"
		>
			{$_('back')}
		</p>
	</a>

	<p class="my-12 h-auto w-full text-center text-2xl md:text-4xl dark:text-white"></p>
</div>

<div class=" flex h-auto w-full flex-col items-center justify-center">
	<!-- <ProjectTable bind:projects={data.projects} /> -->
	<Tabs
		tabStyle="pill"
		contentClass="w-[90%]"
		class="mt-4 flex flex-col items-center justify-center gap-4 space-x-0  md:flex-row md:space-x-2"
	>
		<TabItem
			open={true}
			activeClasses="w-60 h-28 bg-[#c62570a3] rounded-2xl text-white "
			inactiveClasses="w-60 h-28 bg-[#c6257080] rounded-2xl  text-white  "
			on:click={retrieveCapital}
		>
			{#snippet title()}
				<div class="flex h-full w-full flex-col justify-center gap-2">
					<img
						src="/images/capital.png"
						class="absolute mb-16 ml-3 h-6 w-6 object-contain"
						alt=""
					/>
					<div class=" mt-4 h-auto rounded-full text-xl font-bold">
						{#if isLoading}
							<span class="loaderPink"></span>
						{:else}
							{formatNumber(totalCapital)}
						{/if}
					</div>
					<p class="h-auto w-full">{$_('capital')}</p>
				</div>
			{/snippet}
			<div class="  flex h-[100vh] w-full flex-col items-center justify-start" id="subDiv">
				<div
					class="flex h-24 w-full items-center justify-start pl-2 text-4xl font-bold text-[#0F4E35] dark:text-white"
				>
					{$_('capital-table')}
				</div>

				<div
					class="flex h-16 w-full items-center justify-between rounded-t-lg bg-[#ffffff] p-2 dark:bg-[#081c18]"
				>
					<div class="flex h-12 w-auto items-center justify-center gap-2">
						<p
							class="flex h-12 w-auto items-center justify-center rounded-xl bg-[#D3F9E9] px-4 dark:bg-[#11433A] dark:text-white"
						>
							<span class="pr-4 font-bold text-[#1e4f3b] dark:text-[#54cc9c]">{$_('total:')}</span>
							{Number(totalCapital).toFixed(2)}
						</p>
					</div>

					<div
						class="flex h-16 w-full items-center justify-end gap-2 rounded-t-lg bg-[#ffffff] p-2 dark:bg-[#081c18]"
					>
						<button
							class="flex h-12 w-auto items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 text-[8px] text-white duration-300 ease-in-out hover:bg-blue-400 md:text-lg"
							style="box-shadow:0 1px 8px 0px #24b97d;"
							onclick={async () => {
								const datas = await capitalStore.getAllWithoutFilter(
									Number($page.params.projectId)
								);
								await exportAsExcelFile(datas?.data, 'capitals');
							}}
							><span>
								<img src="/images/print.png" class="h-2 w-2 object-contain md:h-6 md:w-6" alt="" />
							</span>
							{$_('export-as-excel')}
						</button>

						<a href="/project/{$page.params.projectId}/capital/add">
							<button
								class="h-12 rounded-lg bg-[#24b97d] px-4 text-[8px] text-white md:text-lg"
								style="box-shadow:0 1px 8px 0px #24b97d;"
								><span>+</span>
								{$_('add-capital')}</button
							>
						</a>
					</div>
				</div>
				<CapitalTable bind:capitals={$capitalStore} />
				<div class="flex h-auto w-full items-center justify-center py-12">
					<Pagination
						Store={capitalStore}
						StoreData={$capitalStore}
						currentPage={Number($page.params.page)}
						project_id={Number($page.params.projectId)}
					/>
				</div>
			</div>
		</TabItem>

		<TabItem
			activeClasses="w-60 h-28 bg-[#21ACD680] rounded-2xl text-white "
			inactiveClasses="w-60 h-28 bg-[#21ACD659] rounded-2xl text-white "
			on:click={retrieveSales}
		>
			{#snippet title()}
				<div class="flex h-full w-full flex-col justify-end gap-2 pb-3">
					<img src="/images/sale.png" class="absolute mb-16 ml-3 h-6 w-6 object-contain" alt="" />
					<p class="h-auto w-full text-xl font-bold">{$_('sales')}</p>

					<div class="flex h-auto w-full items-center justify-center gap-2">
						<div
							class="flex h-8 w-auto items-center justify-center gap-2 rounded-lg bg-[#10323c92] p-2"
						>
							<span class="text-xs text-gray-400">{$_('deposit:')} </span>
							{#if isLoading}
								<span class="loader2"></span>
							{:else}
								{formatNumber(sales?.deposits?.overall_total_price ?? 0)}
							{/if}
						</div>
						<div
							class="flex h-8 w-auto items-center justify-center gap-2 rounded-lg bg-[#10323c92] p-2"
						>
							<span class="text-xs text-gray-400">{$_('financial:')} </span>
							{#if isLoading}
								<span class="loader2"></span>
							{:else}
								{formatNumber(sales?.financials?.overall_total_price ?? 0)}
							{/if}
						</div>
					</div>
				</div>
			{/snippet}
			<div class="  flex h-[100vh] w-full flex-col items-center justify-start" id="subDiv">
				<div
					class="flex h-24 w-full items-center justify-start pl-2 text-4xl font-bold text-[#0F4E35] dark:text-white"
				>
					{$_('sale-table')}
				</div>

				<div
					class="flex h-16 w-full items-center justify-end gap-2 rounded-t-lg bg-[#ffffff] p-2 dark:bg-[#081c18]"
				>
					<div class="flex h-12 w-auto items-center justify-center gap-2">
						<div
							class="flex h-12 w-auto items-center justify-center gap-2 rounded-lg bg-[#f1f1f1] px-2 text-[8px] md:text-lg dark:bg-[#123d37] dark:text-white"
						>
							<p>{$_('deposit:')}</p>
							<span>{sales?.deposits?.overall_total_price ?? 0}</span>
						</div>

						<div
							class="flex h-12 w-auto items-center justify-center gap-2 rounded-lg bg-[#f1f1f1] px-2 text-[8px] md:text-lg dark:bg-[#123d37] dark:text-white"
						>
							<p>{$_('financial:')}</p>
							<span>{sales?.financials?.overall_total_price ?? 0}</span>
						</div>
					</div>

					<button
						class="flex h-12 w-auto items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 text-[8px] text-white duration-300 ease-in-out hover:bg-blue-400 md:text-lg"
						style="box-shadow:0 1px 8px 0px #24b97d;"
						onclick={async () => {
							const datas = await saleStore.getAllWithoutFilter(Number($page.params.projectId));
							await exportAsExcelFile(datas?.data, 'sales');
						}}
						><span>
							<img src="/images/print.png" class="h-2 w-2 object-contain md:h-6 md:w-6" alt="" />
						</span>
						{$_('export-as-excel')}
					</button>

					<a href="/project/{$page.params.projectId}/sales/add">
						<button
							class="h-12 rounded-lg bg-[#24b97d] px-4 text-[8px] text-white md:text-lg"
							style="box-shadow:0 1px 8px 0px #24b97d;"
							><span>+</span>
							{$_('add-sale')}</button
						>
					</a>
				</div>

				<SalesTable bind:sales={$saleStore} />
				<div class="flex h-auto w-full items-center justify-center py-12">
					<Pagination
						Store={saleStore}
						StoreData={$saleStore}
						currentPage={Number($page.params.page)}
						project_id={Number($page.params.projectId)}
					/>
				</div>
			</div>
		</TabItem>
		<TabItem
			activeClasses="w-60 h-28 bg-[#886DFFa3] rounded-2xl text-white "
			inactiveClasses="w-60 h-28 bg-[#886DFF4d] rounded-2xl text-white "
			on:click={() => goto(`/project/${$page.params.projectId}/expense/0`)}
		>
			{#snippet title()}
				<div class="flex h-full w-full flex-col justify-center gap-2">
					<img
						src="/images/increase.png"
						class="absolute mb-16 ml-3 h-6 w-6 object-contain"
						alt=""
					/>
					<p class="h-auto w-full text-xl font-bold">{$_('expense')}</p>
				</div>
			{/snippet}
		</TabItem>
	</Tabs>
</div>
