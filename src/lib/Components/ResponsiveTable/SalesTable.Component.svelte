<script lang="ts">
	import DeleteModal from '$lib/Components/DeleteModal.Component.svelte';
	import type { Database } from '$lib/Supabase/Types/database.types';
	import type { Store } from '$lib/Models/Response/Store.Response.Model';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { saleStore } from '$lib/Store/Sale.Store';
	import { formatNumber } from '$lib/Utils/ConvertNumbers.Utils';
	import { VITE_SUPABASE_BUCKET_SANYA } from '$env/static/public';
	import { _ } from 'svelte-i18n';
	import ImageDialog from '../ImageDialog.Component.svelte';
	let deleteModal = $state(false);
	let depositLoading = $state(false);
	let financialLoading = $state(false);
	interface Props {
		sales?: Store<Database['public']['Tables']['Sales']['Row']>;
	}

	let {
		sales = $bindable({
			data: [],
			count: 0,
			error: ''
		})
	}: Props = $props();
	let deposits: Array<{
		sale_id: number;
		deposit_count: number;
		total_price: number;
	}> = $state([]);
	let financial: Array<{
		sale_id: number;
		financial_count: number;
		total_price: number;
	}> = $state([]);
	let deleteId: number = $state(0);
	let selectedImage: string = $state('');
	let imageDialog = $state(false);

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
		const response = await saleStore.getDepositsBySaleIds(sales.data.map((sale) => sale.id));
		if (!response) {
			return;
		}
		deposits = response;
	}
	async function getFinancial() {
		const response = await saleStore.getFinancialBySaleIds(sales.data.map((sale) => sale.id));
		if (!response) {
			return;
		}
		financial = response;
	}
</script>

<div class="mx-2 flex h-auto w-full items-center justify-center">
	<table class="table w-full rounded-xl text-[5px] text-white md:text-lg">
		<thead>
			<tr>
				<th scope="col">{$_('image')}</th>
				<th scope="col">{$_('description')}</th>
				<th scope="col">{$_('new-action')}</th>
				<th scope="col">{$_('action')}</th>
			</tr>
		</thead>
		<tbody>
			{#if sales.count !== 0}
				{#each sales.data as sale}
					<tr>
						<td class="flex h-28 items-center justify-center">
							<div class="group relative">
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
								<img
									src={sale.image
										? `${VITE_SUPABASE_BUCKET_SANYA}${sale.image}`
										: '/images/spark.png'}
									class="h-10 w-10 cursor-pointer rounded-lg object-contain transition-all duration-300 group-hover:z-10 group-hover:scale-150"
									alt={sale.image}
									onclick={() => {
										selectedImage = sale.image
											? `${VITE_SUPABASE_BUCKET_SANYA}${sale.image}`
											: '/images/spark.png';
										imageDialog = true;
									}}
								/>
							</div>
						</td>
						<td>{sale.description}</td>
						<td>
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<div class="flex h-auto w-full items-center justify-center gap-2">
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<div
									class="w-42 flex h-auto cursor-pointer flex-col items-center justify-center gap-3 rounded-lg bg-orange-500 p-2 px-4 font-bold text-white"
									onclick={() => goto(`/deposit/sale/${sale.id}`)}
								>
									<div class="flex h-auto w-auto items-center justify-center gap-2">
										<p>{$_('deposit')}</p>

										<p
											class="flex h-2 w-auto items-center justify-center rounded-full bg-orange-700 px-2 md:h-6"
										>
											{#if depositLoading}
												<span class="loader2"></span>
											{:else}
												{deposits.find((d) => d.sale_id === sale.id)?.deposit_count ?? 0}
											{/if}
										</p>
									</div>

									<div
										class="flex h-auto w-full items-center justify-center rounded-xl bg-orange-700 px-2"
									>
										<p class="text-gray-300">
											{$_('total:')}
											<span class="text-white"
												>{formatNumber(
													deposits.find((d) => d.sale_id == sale.id)?.total_price ?? 0
												)}</span
											>
										</p>
									</div>
								</div>

								<div
									class="w-42 flex h-auto cursor-pointer flex-col items-center justify-center gap-3 rounded-lg bg-blue-400 p-2 px-4 font-bold text-white"
									onclick={() => goto(`/finance/sale/${sale.id}`)}
								>
									<div class="flex h-auto w-auto items-center justify-center gap-2">
										<p>{$_('financial-dues')}</p>

										<p
											class="flex h-2 w-auto items-center justify-center rounded-full bg-blue-700 px-2 md:h-6"
										>
											{#if financialLoading}
												<span class="loader2"></span>
											{:else}
												{financial.find((f) => f.sale_id === sale.id)?.financial_count ?? 0}
											{/if}
										</p>
									</div>

									<div
										class="flex h-auto w-full items-center justify-center rounded-xl bg-blue-700 px-2"
									>
										<p class="text-gray-300">
											{$_('total:')}
											<span class="text-white"
												>{formatNumber(
													financial.find((f) => f.sale_id == sale.id)?.total_price ?? 0
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
									href="/project/{$page.params.projectId}/sales/edit/{sale.id}"
									class="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 p-2 hover:bg-green-500 md:h-12 md:w-12"
								>
									<img src="/images/edit.png" class="h-4 w-4 object-contain md:h-8 md:w-8" alt="" />
								</a>
								<!-- svelte-ignore a11y_missing_attribute -->
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<!-- svelte-ignore a11y_no_static_element_interactions -->
								<a
									class="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 p-2 hover:bg-red-500 md:h-12 md:w-12"
									onclick={() => {
										deleteModal = true;
										deleteId = sale.id;
									}}
								>
									<img
										src="/images/delete.png"
										class="h-4 w-4 object-contain md:h-8 md:w-8"
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

<DeleteModal bind:deleteModal Store={saleStore} id={deleteId} />
<ImageDialog bind:image={selectedImage} bind:open={imageDialog} />
