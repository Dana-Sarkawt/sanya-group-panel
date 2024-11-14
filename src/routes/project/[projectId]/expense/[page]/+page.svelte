<script lang="ts">
	import { formatNumber } from '$lib/Utils/ConvertNumbers.Utils';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Pagination from '$lib/Components/Pagination.Store.Component.svelte';
	import DailyTable from '$lib/Components/ResponsiveTable/DailyTable.Component.svelte';
	import PreparationTable from '$lib/Components/ResponsiveTable/PreparationTable.Component.svelte';
	import WorkerTable from '$lib/Components/ResponsiveTable/WorkerTable.Component.svelte';
	import { dailyStore } from '$lib/Store/Daily.Store';
	import { preparationStore } from '$lib/Store/Preparation.Store';
	import { workerStore } from '$lib/Store/Worker.Store';
	import { Tabs, TabItem } from 'flowbite-svelte';
	import { exportAsExcelFile } from '$lib/Utils/ExportAsExcel.Utils';
	import { Overhaul } from '$lib/Models/Common/Overhaul.Common.Model';
	import { _ } from 'svelte-i18n';

	let totalDaily = $state(0);
	let isLoading = $state(false);
	let workers: Overhaul = $state(new Overhaul());
	let preparations: Overhaul = $state(new Overhaul());
	onMount(async () => {
		isLoading = true;
		try {
			totalDaily = (await dailyStore.getTotalPrice(Number($page.params.projectId))) ?? 0;
			await retrieveOverhaulDeposits();
			await retrieveOverhaulFinancials();
		} finally {
			isLoading = false;
		}
	});

	async function retrieveOverhaulDeposits() {
		try {
			const workersDeposits = await workerStore.getOverhaulDepositsByProjectId(
				Number($page.params.projectId)
			);
			const preparationsDeposits = await preparationStore.getOverhaulDepositsByProjectId(
				Number($page.params.projectId)
			);
			if (workersDeposits) {
				workers.deposits = workersDeposits;
			}
			if (preparationsDeposits) {
				preparations.deposits = preparationsDeposits;
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function retrieveOverhaulFinancials() {
		try {
			const workersFinancials = await workerStore.getOverhaulFinancialsByProjectId(
				Number($page.params.projectId)
			);
			const preparationsFinancials = await preparationStore.getOverhaulFinancialsByProjectId(
				Number($page.params.projectId)
			);
			if (workersFinancials) {
				workers.financials = workersFinancials;
			}
			if (preparationsFinancials) {
				preparations.financials = preparationsFinancials;
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function retrieveDaily() {
		goto(`/project/${$page.params.projectId}/expense/0`);
		await dailyStore.getAll({
			limit: 10,
			page: 0,
			equal: $page.params.projectId,
			field: 'project_id'
		});
	}

	async function retrieveWorker() {
		goto(`/project/${$page.params.projectId}/expense/0`);
		await workerStore.getAll({
			limit: 10,
			page: 0,
			equal: $page.params.projectId,
			field: 'project_id'
		});
	}

	async function retrievePreparation() {
		goto(`/project/${$page.params.projectId}/expense/0`);
		await preparationStore.getAll({
			limit: 10,
			page: 0,
			equal: $page.params.projectId,
			field: 'project_id'
		});
	}
</script>

<div class="flex h-auto w-full items-center justify-center md:px-44">
	<a href="/project/{$page.params.projectId}/0">
		<p
			class="flex h-12 w-24 items-center justify-center rounded-xl bg-green-700 text-white duration-300 ease-in-out hover:bg-green-500"
		>
			{$_('back')}
		</p>
	</a>

	<p class="my-12 h-auto w-full text-center text-2xl md:text-4xl dark:text-white"></p>
</div>

<div class=" justfiy-center flex h-auto w-full flex-col items-center">
	<!-- <ProjectTable bind:projects={data.projects} /> -->
	<Tabs
		tabStyle="pill"
		contentClass="w-[90%]"
		class="mt-4 flex flex-col items-center justify-center gap-4 space-x-0  md:flex-row md:space-x-2"
	>
		<TabItem
			open
			activeClasses="w-60 h-28 bg-[#c62570a3] rounded-2xl text-white "
			inactiveClasses="w-60 h-28 bg-[#c6257080] rounded-2xl text-white "
			on:click={retrieveDaily}
		>
			{#snippet title()}
				<div class="flex h-full w-full flex-col justify-center gap-2">
					<img src="/images/daily.png" class="absolute mb-16 ml-3 h-6 w-6 object-contain" alt="" />
					<div class=" mt-4 h-auto rounded-full text-xl font-bold">
						{#if isLoading}
							<span class="loaderPink"></span>
						{:else}
							{formatNumber(totalDaily)}
						{/if}
					</div>
					<p class="h-auto w-full">{$_('daily')}</p>
				</div>
			{/snippet}

			<div class="  flex h-[100vh] w-full flex-col items-center justify-start" id="subDiv">
				<div
					class="flex h-24 w-full items-center justify-start pl-2 text-4xl font-bold text-[#0F4E35] dark:text-white"
				>
					{$_('daily-table')}
				</div>

				<div
					class="flex h-16 w-full items-center justify-between rounded-t-lg bg-[#ffffff] p-2 dark:bg-[#081c18]"
				>
					<div class="flex h-12 w-auto items-center justify-center gap-2">
						<p
							class="flex h-12 w-auto items-center justify-center rounded-xl bg-[#D3F9E9] px-4 dark:bg-[#11433A] dark:text-white"
						>
							<span class="pr-4 font-bold text-[#1e4f3b] dark:text-[#54cc9c]">{$_('total:')}</span>
							{totalDaily.toFixed(2)}
						</p>
					</div>

					<div
						class="flex h-16 w-full items-center justify-end gap-2 rounded-t-lg bg-[#ffffff] p-2 dark:bg-[#081c18]"
					>
						<button
							class="flex h-12 w-auto items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 text-[8px] text-white duration-300 ease-in-out hover:bg-blue-400 md:text-lg"
							style="box-shadow:0 1px 8px 0px #24b97d;"
							onclick={async () => {
								const datas = await dailyStore.getAllWithoutFilter(Number($page.params.projectId));
								await exportAsExcelFile(datas?.data, 'dailys');
							}}
							><span>
								<img src="/images/print.png" class="h-2 w-2 object-contain md:h-6 md:w-6" alt="" />
							</span>
							{$_('export-as-excel')}
						</button>

						<a href="/project/{$page.params.projectId}/expense/daily/add">
							<button
								class=" h-12 w-auto rounded-lg bg-[#24b97d] p-2 text-[8px] text-white md:px-4 md:text-lg"
								style="box-shadow:0 1px 8px 0px #24b97d;"
								><span>+</span>
								{$_('add-daily')}
							</button>
						</a>
					</div>
				</div>
				<DailyTable bind:dailys={$dailyStore} />
				<div class="flex h-auto w-full items-center justify-center py-12">
					<Pagination
						Store={dailyStore}
						StoreData={$dailyStore}
						currentPage={Number($page.params.page)}
						project_id={Number($page.params.projectId)}
					/>
				</div>
			</div>
		</TabItem>

		<TabItem
			activeClasses="w-60 h-28 bg-[#21ACD680] rounded-2xl text-white "
			inactiveClasses="w-60 h-28 bg-[#21ACD659] rounded-2xl text-white "
			on:click={retrieveWorker}
		>
			{#snippet title()}
				<div class="flex h-full w-full flex-col justify-end gap-2 pb-3">
					<img src="/images/worker.png" class="absolute mb-16 ml-3 h-6 w-6 object-contain" alt="" />
					<p class="h-auto w-full text-xl font-bold">{$_('worker')}</p>

					<div class="flex h-auto w-full items-center justify-center gap-2">
						<div
							class="flex h-8 w-auto items-center justify-center gap-2 rounded-lg bg-[#10323c92] p-2"
						>
							<span class="text-xs text-gray-400">{$_('deposit:')} </span>
							{#if isLoading}
								<span class="loader2"></span>
							{:else}
								{formatNumber(workers.deposits.overall_total_price)}
							{/if}
						</div>
						<div
							class="flex h-8 w-auto items-center justify-center gap-2 rounded-lg bg-[#10323c92] p-2"
						>
							<span class="text-xs text-gray-400">{$_('financial:')} </span>
							{#if isLoading}
								<span class="loader2"></span>
							{:else}
								{formatNumber(workers.financials.overall_total_price)}
							{/if}
						</div>
					</div>
				</div>
			{/snippet}
			<div class="  flex h-[100vh] w-full flex-col items-center justify-start" id="subDiv">
				<div
					class="flex h-24 w-full items-center justify-start pl-2 text-4xl font-bold text-[#0F4E35] dark:text-white"
				>
					{$_('worker-table')}
				</div>

				<div
					class="flex h-16 w-full items-center justify-end gap-2 rounded-t-lg bg-[#ffffff] p-2 dark:bg-[#081c18]"
				>
					<div class="flex h-12 w-auto items-center justify-center gap-2">
						<div
							class="flex h-12 w-auto items-center justify-center gap-2 rounded-lg bg-[#f1f1f1] px-2 text-[8px] md:text-lg dark:bg-[#123d37] dark:text-white"
						>
							<p>{$_('deposit:')}</p>
							<span>{workers.deposits.overall_total_price}</span>
						</div>

						<div
							class="flex h-12 w-auto items-center justify-center gap-2 rounded-lg bg-[#f1f1f1] px-2 text-[8px] md:text-lg dark:bg-[#123d37] dark:text-white"
						>
							<p>{$_('financial:')}</p>
							<span>{workers.financials.overall_total_price}</span>
						</div>
					</div>

					<button
						class="flex h-12 w-auto items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 text-[8px] text-white duration-300 ease-in-out hover:bg-blue-400 md:text-lg"
						style="box-shadow:0 1px 8px 0px #24b97d;"
						onclick={async () => {
							const datas = await workerStore.getAllWithoutFilter(Number($page.params.projectId));
							await exportAsExcelFile(datas?.data, 'workers');
						}}
						><span>
							<img src="/images/print.png" class="h-2 w-2 object-contain md:h-6 md:w-6" alt="" />
						</span>
						{$_('export-as-excel')}
					</button>

					<a href="/project/{$page.params.projectId}/expense/worker/add">
						<button
							class="h-12 w-auto rounded-lg bg-[#24b97d] px-4 text-[8px] text-white md:text-lg"
							style="box-shadow:0 1px 8px 0px #24b97d;"
							><span>+</span>
							{$_('add-worker')}
						</button>
					</a>
				</div>

				<WorkerTable bind:workers={$workerStore} />
				<div class="flex h-auto w-full items-center justify-center py-12">
					<Pagination
						Store={workerStore}
						StoreData={$workerStore}
						currentPage={Number($page.params.page)}
						project_id={Number($page.params.projectId)}
					/>
				</div>
			</div>
		</TabItem>

		<TabItem
			activeClasses="w-60 h-28 bg-[#886DFFa3] rounded-2xl text-white "
			inactiveClasses="w-60 h-28 bg-[#886DFF4d] rounded-2xl text-white "
			on:click={retrievePreparation}
		>
			{#snippet title()}
				<div class="flex h-full w-full flex-col justify-end gap-2 pb-3">
					<img
						src="/images/preparation.png"
						class="absolute mb-16 ml-3 h-6 w-6 object-contain"
						alt=""
					/>
					<p class="h-auto w-full text-xl font-bold">{$_('preparation')}</p>

					<div class="flex h-auto w-full items-center justify-center gap-2">
						<div
							class="flex h-8 w-auto items-center justify-center gap-2 rounded-lg bg-[#10323c92] p-2"
						>
							<span class="text-xs text-gray-400">{$_('deposit:')} </span>
							{#if isLoading}
								<span class="loader2"></span>
							{:else}
								{formatNumber(preparations.deposits.overall_total_price)}
							{/if}
						</div>
						<div
							class="flex h-8 w-auto items-center justify-center gap-2 rounded-lg bg-[#10323c92] p-2"
						>
							<span class="text-xs text-gray-400">{$_('financial:')} </span>
							{#if isLoading}
								<span class="loader2"></span>
							{:else}
								{formatNumber(preparations.financials.overall_total_price)}
							{/if}
						</div>
					</div>
				</div>
			{/snippet}
			<div class="  flex h-[100vh] w-full flex-col items-center justify-start" id="subDiv">
				<div
					class="flex h-24 w-full items-center justify-start pl-2 text-4xl font-bold text-[#0F4E35] dark:text-white"
				>
					{$_('preparation-table')}
				</div>

				<div
					class="flex h-16 w-full items-center justify-end gap-2 rounded-t-lg bg-[#ffffff] p-2 dark:bg-[#081c18]"
				>
					<div class="flex h-12 w-auto items-center justify-center gap-2">
						<div
							class="flex h-12 w-auto items-center justify-center gap-2 rounded-lg bg-[#f1f1f1] px-2 text-[8px] md:text-lg dark:bg-[#123d37] dark:text-white"
						>
							<p>{$_('deposit:')}</p>
							<span>{preparations.deposits.overall_total_price}</span>
						</div>

						<div
							class="flex h-12 w-auto items-center justify-center gap-2 rounded-lg bg-[#f1f1f1] px-2 text-[8px] md:text-lg dark:bg-[#123d37] dark:text-white"
						>
							<p>{$_('financial:')}</p>
							<span>{preparations.financials.overall_total_price}</span>
						</div>
					</div>

					<button
						class="flex h-12 w-auto items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 text-[8px] text-white duration-300 ease-in-out hover:bg-blue-400 md:text-lg"
						style="box-shadow:0 1px 8px 0px #24b97d;"
						onclick={async () => {
							const datas = await preparationStore.getAllWithoutFilter(
								Number($page.params.projectId)
							);
							await exportAsExcelFile(datas?.data, 'preparations');
						}}
						><span>
							<img src="/images/print.png" class="h-2 w-2 object-contain md:h-6 md:w-6" alt="" />
						</span>
						{$_('export-as-excel')}
					</button>

					<a href="/project/{$page.params.projectId}/expense/preparation/add">
						<button
							class="h-12 rounded-lg bg-[#24b97d] px-4 text-[8px] text-white md:text-lg"
							style="box-shadow:0 1px 8px 0px #24b97d;"
							><span>+</span>
							{$_('add-preparation')}
						</button>
					</a>
				</div>
				<PreparationTable bind:preparations={$preparationStore} />
				<div class="flex h-auto w-full items-center justify-center py-12">
					<Pagination
						Store={preparationStore}
						StoreData={$preparationStore}
						currentPage={Number($page.params.page)}
						project_id={Number($page.params.projectId)}
					/>
				</div>
			</div>
		</TabItem>
	</Tabs>
</div>
