<script lang="ts">
	import type { Store } from '$lib/Models/Response/Store.Response.Model';
	import type { Database } from '$lib/Supabase/Types/database.types';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	import DeleteModal from '$lib/Components/DeleteModal.Component.svelte';
	import { userStore } from '$lib/Store/User.Store';
	import { _ } from 'svelte-i18n';

	interface Props {
		users?: Store<Database['public']['Tables']['Users']['Row']>;
	}

	let {
		users = {
			data: [],
			count: 0
		}
	}: Props = $props();

	let deleteModal = $state(false);
</script>

<div class="h-auto w-full rounded-b-xl bg-[#ffffff] p-4 dark:bg-[#081c18]">
	<Table striped={true}>
		<TableHead theadClass="bg-white dark:bg-[#212121] text-center">
			<TableHeadCell>{$_('name')}</TableHeadCell>
			<TableHeadCell>{$_('phone')}</TableHeadCell>
			<TableHeadCell>{$_('email')}</TableHeadCell>
			<TableHeadCell>{$_('action')}</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y text-center">
			{#if users.count !== 0}
				{#each users.data as user}
					<TableBodyRow>
						<TableBodyCell>{user.name}</TableBodyCell>
						<TableBodyCell>{user.phone}</TableBodyCell>
						<TableBodyCell>{user.email}</TableBodyCell>

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

<DeleteModal bind:deleteModal Store={userStore} />
