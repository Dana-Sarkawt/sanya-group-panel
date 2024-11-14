<script lang="ts">
	import { userStore } from '$lib/Store/User.Store';
	import type { PageData } from './$types';
	import UserTable from '$lib/Components/ResponsiveTable/UserTable.Component.svelte';
	import Pagination from '$lib/Components/Pagination.Component.svelte';
	import { page } from '$app/stores';
	import { exportAsExcelFile } from '$lib/Utils/ExportAsExcel.Utils';
	import { _ } from 'svelte-i18n';
	interface Props {
		data: PageData;
	}

	let { data = $bindable() }: Props = $props();
</script>

<div class=" flex h-auto w-full items-center justify-center">
	<div class="  flex h-[100vh] w-[90%] flex-col items-center justify-start" id="subDiv">
		<div
			class="flex h-24 w-full items-center justify-start pl-2 text-4xl font-bold text-[#0F4E35] dark:text-white"
		>
			{$_('users-table')}
		</div>

		<div
			class="flex h-16 w-full items-center justify-end gap-2 rounded-t-lg bg-[#ffffff] p-2 dark:bg-[#081c18]"
		>
			<button
				class="flex h-12 w-auto items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 text-white duration-300 ease-in-out hover:bg-blue-400"
				style="box-shadow:0 1px 8px 0px #24b97d;"
				onclick={async () => {
					const datas = await userStore.getAllWithoutFilter();
					await exportAsExcelFile(datas?.data, 'users');
				}}
				><span>
					<img src="/images/print.png" class="h-6 w-6 object-contain" alt="" />
				</span>
				{$_('export-as-excel')}
			</button>

			<a href="/user/add">
				<button
					class="h-12 rounded-lg bg-[#24b97d] px-4 text-white"
					style="box-shadow:0 1px 8px 0px #24b97d;"><span>+</span> {$_('add-user')}</button
				>
			</a>
		</div>
		<!-- <UserTable bind:users={data.users} /> -->
		<UserTable bind:users={data.users} />
		<div class="flex h-auto w-full items-center justify-center py-12">
			<Pagination
				classType={typeof data.users}
				StoreData={data.users}
				currentPage={Number($page.params.page)}
				name={'user'}
			/>
		</div>
	</div>
</div>
