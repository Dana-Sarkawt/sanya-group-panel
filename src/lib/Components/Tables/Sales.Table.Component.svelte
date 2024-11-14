<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import DeleteModal from '$lib/Components/DeleteModal.Component.svelte';
	import type { Database } from '$lib/Supabase/Types/database.types';
	import type { Store } from '$lib/Models/Response/Store.Response.Model';
	import { saleStore } from '$lib/Store/Sale.Store';
	import { _ } from 'svelte-i18n';
	let deleteModal = $state(false);
	interface Props {
		sales?: Store<Database['public']['Tables']['Sales']['Row']>;
	}

	let {
		sales = {
			data: [],
			count: 0
		}
	}: Props = $props();
</script>

<div class="containerw-full h-auto rounded-b-xl bg-[#ffffff] p-4 dark:bg-[#081c18]">
	<Table striped={true}>
		<TableHead theadClass="bg-white dark:bg-[#212121] text-center">
			<TableHeadCell>{$_('description')}</TableHeadCell>
			<TableHeadCell>{$_('new-action')}</TableHeadCell>
			<TableHeadCell>{$_('action')}</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y text-center">
			{#if sales.count !== 0}
				{#each sales.data as sale}
					<TableBodyRow>
						<TableBodyCell>{sale.description}</TableBodyCell>
						<TableBodyCell>
							<div class="flex h-auto w-full items-center justify-center gap-2">
								<div
									class="flex h-8 w-28 items-center justify-center rounded-full bg-orange-500 px-4 font-bold text-white"
								>
									Deposit
								</div>

								<div
									class="flex h-8 w-28 items-center justify-center rounded-full bg-blue-400 px-4 font-bold text-white"
								>
									Financial Dues
								</div>
							</div>
						</TableBodyCell>

						<TableBodyCell>
							<div class="flex h-auto w-auto items-center justify-center gap-2">
								<a
									href="edit/1"
									class="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 p-2 hover:bg-green-500"
								>
									<img src="/images/edit.png" class="h-8 w-8 object-contain" alt="" />
								</a>

								<a
									href="edit/1"
									class="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 p-2 hover:bg-red-500"
									onclick={() => (deleteModal = true)}
								>
									<img src="/images/delete.png" class="h-8 w-8 object-contain" alt="" />
								</a>
							</div>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			{/if}
		</TableBody>
	</Table>
</div>

<DeleteModal bind:deleteModal Store={saleStore} />
