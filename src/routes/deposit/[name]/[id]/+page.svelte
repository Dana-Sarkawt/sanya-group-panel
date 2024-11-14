<script lang="ts">
	import { depositStore } from '$lib/Store/Deposit.Store';
	import { page } from '$app/stores';
	import DeleteModal from '$lib/Components/DeleteModal.Component.svelte';
	import type { PageData } from './$types';
	import { VITE_SUPABASE_BUCKET_SANYA } from '$env/static/public';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let deleteModal = $state(false);
	let deleteId: number = $state(0);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="flex h-auto w-full items-center justify-center md:px-44">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_missing_attribute -->
	<a onclick={() => window.history.back()} class="cursor-pointer">
		<p
			class="flex h-12 w-24 items-center justify-center rounded-xl bg-green-700 text-white duration-300 ease-in-out hover:bg-green-500"
		>
			Back
		</p>
	</a>

	<p class="my-12 h-auto w-full text-center text-2xl md:text-4xl dark:text-white"></p>
</div>

<div class=" flex h-auto w-full items-center justify-center">
	<div class="  flex h-[100vh] w-full flex-col items-center justify-start lg:mx-24" id="subDiv">
		<div
			class="flex h-24 w-full items-center justify-start pl-2 text-4xl font-bold text-[#0F4E35] dark:text-white"
		>
			Deposit Table
		</div>

		<div
			class="flex h-16 w-full items-center justify-between rounded-t-lg bg-[#ffffff] p-2 dark:bg-[#081c18]"
		>
			<p
				class="flex h-12 w-auto items-center justify-center rounded-xl bg-[#D3F9E9] px-4 dark:bg-[#11433A] dark:text-white"
			>
				<span class="pr-4 font-bold text-[#1e4f3b] dark:text-[#54cc9c]">Total:</span>
				{Number(data.deposits?.data.reduce((total, deposit) => total + deposit.price, 0)).toFixed(
					2
				)}
			</p>
			<a href="/deposit/{$page.params.name}/{$page.params.id}/add">
				<button
					class="h-12 rounded-lg bg-[#24b97d] px-4 text-white"
					style="box-shadow:0 1px 8px 0px #24b97d;"><span>+</span> Add Deposit</button
				>
			</a>
		</div>
		<!---  START TABLE  -->

		<div class="mx-2 flex h-auto w-full items-center justify-center">
			<table class="table w-full rounded-xl text-[5px] text-white md:text-lg">
				<thead>
					<tr>
						<th scope="col">Image</th>
						<th scope="col">Description</th>
						<th scope="col">Price</th>
						<th scope="col">Date</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{#if data.deposits?.count !== 0 && data.deposits?.data}
						{#each data.deposits.data as deposit}
							<tr>
								<td class="flex h-28 items-center justify-center">
									<img
										src={deposit.image
											? `${VITE_SUPABASE_BUCKET_SANYA}${deposit.image}`
											: '/images/spark.png'}
										class="h-10 w-10 rounded-lg object-contain"
										alt=""
									/>
								</td>
								<td>{deposit.description}</td>
								<td>{deposit.price}</td>
								<td>{deposit.date}</td>

								<td>
									<!-- svelte-ignore a11y_click_events_have_key_events -->
									<!-- svelte-ignore a11y_no_static_element_interactions -->
									<!-- svelte-ignore a11y_missing_attribute -->
									<div class="flex h-auto w-auto items-center justify-center gap-2">
										<a
											href="/deposit/{$page.params.name}/{$page.params.id}/edit/{deposit.id}"
											class="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 p-2 hover:bg-green-500 md:h-12 md:w-12"
										>
											<img
												src="/images/edit.png"
												class="h-4 w-4 object-contain md:h-8 md:w-8"
												alt=""
											/>
										</a>
										<!-- svelte-ignore a11y_click_events_have_key_events -->
										<a
											class="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 p-2 hover:bg-red-500 md:h-12 md:w-12"
											onclick={() => {
												deleteModal = true;
												deleteId = deposit.id;
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

		<!---  END TABLE  -->

		<div class="flex h-auto w-full items-center justify-center py-12">
			<!-- <Pagination
      classType={typeof data.projects}
      StoreData={data.projects}
      currentPage={Number($page.params.page)}
      name={"project"}
    /> -->
		</div>
	</div>
</div>
<DeleteModal bind:deleteModal Store={depositStore} id={deleteId} />
