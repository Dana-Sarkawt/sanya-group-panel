<script lang="ts">
	import { goto } from '$app/navigation';
	import DeleteModal from '$lib/Components/DeleteModal.Component.svelte';
	import type { Store } from '$lib/Models/Response/Store.Response.Model';
	import type { Database } from '$lib/Supabase/Types/database.types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { preparationStore } from '$lib/Store/Preparation.Store';
	import { formatNumber } from '$lib/Utils/ConvertNumbers.Utils';
	import { VITE_SUPABASE_BUCKET_SANYA } from '$env/static/public';
	import { _ } from 'svelte-i18n';
	import ImageDialog from '../ImageDialog.Component.svelte';
	let deleteModal = $state(false);
	let depositLoading = false;
	let financialLoading = false;
	interface Props {
		preparations?: Store<Database['public']['Tables']['Preparations']['Row']>;
	}

	let {
		preparations = $bindable({
			data: [],
			count: 0,
			error: ''
		})
	}: Props = $props();
	let selectedImage: string = $state('');
	let imageDialog = $state(false);

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
	let deleteId: number = $state(0);
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

<div class="mx-2 flex h-auto w-full items-center justify-center">
	<table class="table w-full rounded-xl text-[5px] text-white md:text-lg">
		<thead>
			<tr>
				<th scope="col">{$_('image')}</th>
				<th scope="col">{$_('id')}</th>
				<th scope="col">{$_('description')}</th>
				<!-- <th scope="col">New Action</th> -->
				<th scope="col">{$_('action')}</th>
			</tr>
		</thead>
		<tbody>
			{#if preparations.count !== 0}
				{#each preparations.data as preparation}
					<tr>
						<td class="flex h-28 items-center justify-center">
							<div class="group relative">
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
								<img
									src={preparation.image
										? `${VITE_SUPABASE_BUCKET_SANYA}${preparation.image}`
										: '/images/spark.png'}
									class="h-10 w-10 cursor-pointer rounded-lg object-contain transition-all duration-300 group-hover:z-10 group-hover:scale-150"
									alt={preparation.image}
									onclick={() => {
										selectedImage = preparation.image
											? `${VITE_SUPABASE_BUCKET_SANYA}${preparation.image}`
											: '/images/spark.png';
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
									href="/project/{$page.params.projectId}/expense/preparation/edit/{preparation.id}"
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
										deleteId = preparation.id;
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

<DeleteModal bind:deleteModal Store={preparationStore} id={deleteId} />
<ImageDialog bind:image={selectedImage} bind:open={imageDialog} />
