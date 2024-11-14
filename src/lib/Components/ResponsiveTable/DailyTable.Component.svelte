<script lang="ts">
	import DeleteModal from '$lib/Components/DeleteModal.Component.svelte';
	import type { Store } from '$lib/Models/Response/Store.Response.Model';
	import type { Database } from '$lib/Supabase/Types/database.types';
	import moment from 'moment';
	import { page } from '$app/stores';
	import { dailyStore } from '$lib/Store/Daily.Store';
	import { VITE_SUPABASE_BUCKET_SANYA } from '$env/static/public';
	import { _ } from 'svelte-i18n';
	import ImageDialog from '../ImageDialog.Component.svelte';
	let deleteModal = $state(false);
	let selectedImage: string = $state('');
	let imageDialog = $state(false);

	interface Props {
		dailys?: Store<Database['public']['Tables']['Dailys']['Row']>;
	}

	let {
		dailys = $bindable({
			data: [],
			count: 0,
			error: ''
		})
	}: Props = $props();
	let deleteId: number = $state(0);
</script>

<div class="mx-2 flex h-auto w-full items-center justify-center">
	<table class="table w-full rounded-xl text-[5px] text-white md:text-lg">
		<thead>
			<tr>
				<th scope="col">{$_('image')}</th>
				<th scope="col">{$_('description')}</th>
				<th scope="col">{$_('price')}</th>
				<th scope="col">{$_('date')}</th>
				<th scope="col">{$_('action')}</th>
			</tr>
		</thead>
		<tbody>
			{#if dailys.count !== 0}
				{#each dailys.data as daily}
					<tr>
						<td class="flex justify-center">
							<div class="group relative">
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
								<img
									src={daily.image
										? `${VITE_SUPABASE_BUCKET_SANYA}${daily.image}`
										: '/images/spark.png'}
									class="h-10 w-10 cursor-pointer rounded-lg object-contain transition-all duration-300 group-hover:z-10 group-hover:scale-150"
									alt={daily.image}
									onclick={() => {
										selectedImage = daily.image
											? `${VITE_SUPABASE_BUCKET_SANYA}${daily.image}`
											: '/images/spark.png';
										imageDialog = true;
									}}
								/>
							</div>
						</td>
						<td>{daily.description}</td>
						<td>{daily.price}</td>
						<td>{moment(daily.date).format('YYYY-MM-DD')}</td>
						<td>
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<div class="flex h-auto w-auto items-center justify-center gap-2">
								<a
									href="/project/{$page.params.projectId}/expense/daily/edit/{daily.id}"
									class="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 p-2 hover:bg-green-500 md:h-12 md:w-12"
								>
									<img src="/images/edit.png" class="h-4 w-4 object-contain md:h-8 md:w-8" alt="" />
								</a>
								<!-- svelte-ignore a11y_missing_attribute -->
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<a
									class="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 p-2 hover:bg-red-500 md:h-12 md:w-12"
									onclick={() => {
										deleteModal = true;
										deleteId = daily.id;
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

<DeleteModal bind:deleteModal Store={dailyStore} id={deleteId} />
<ImageDialog bind:image={selectedImage} bind:open={imageDialog} />
