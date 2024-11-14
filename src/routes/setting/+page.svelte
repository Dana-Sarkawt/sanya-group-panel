<script lang="ts">
	import { onMount } from 'svelte';
	import { roleStore } from '$lib/Store/Role.Store';
	import { Button, Modal } from 'flowbite-svelte';
	import { Role } from '$lib/Models/Request/Role.Request.Model';
	import { _ } from 'svelte-i18n';

	let roleModal = $state(false);
	let roleRequest: Role.Change = $state(new Role.Change());
	onMount(async () => {
		await roleStore.getAll();
	});

	async function changeRole(request: Role.Change) {
		try {
			request.id ? await roleStore.update(roleRequest) : await roleStore.create(roleRequest);
			window.location.reload();
		} catch (error) {
			console.error(error);
		} finally {
			roleModal = false;
		}
	}

	async function deleteStore(id: number) {
		try {
			await roleStore.delete(id);
			window.location.reload();
		} catch (error) {
			console.error(error);
		} finally {
			roleModal = false;
		}
	}

	function clearInput() {
		roleRequest = new Role.Change();
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="flex h-auto w-full flex-wrap items-start justify-center gap-4 pt-12">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="flex h-[300px] w-[300px] cursor-pointer flex-col items-center justify-center rounded-lg bg-[#228c62] text-2xl text-white duration-300 ease-in-out hover:bg-[#33b883] dark:bg-[#0F4E35] dark:hover:bg-[#1e9163]"
		onclick={() => (roleModal = true)}
	>
		<img src="" alt="" />
		<p>Role</p>
	</div>
</div>

<Modal title="Create Role" bind:open={roleModal}>
	<div class="flex h-auto w-full flex-col items-start justify-center gap-2">
		<div class="flex h-auto w-full items-center justify-between">
			<p class="dark:text-white">Role Name</p>
			<button
				class="h-12 w-20 rounded-xl bg-blue-500 text-white duration-300 ease-in-out hover:bg-blue-400"
				onclick={clearInput}>Reset</button
			>
		</div>

		<input
			type="text"
			bind:value={roleRequest.name}
			class="h-12 w-full rounded-xl border-0 bg-[#f1f1f1] dark:bg-[#123d3745]"
		/>
	</div>

	<div
		class="flex h-[200px] w-full flex-col items-center justify-start gap-2 overflow-y-auto rounded-xl bg-[#f1f1f1] p-4 dark:bg-[#123d3745]"
	>
		{#if $roleStore.data}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			{#each $roleStore.data as role}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div
					class="flex h-12 w-full items-center justify-between rounded-xl bg-white p-8 px-4 text-black dark:bg-[#2e3e53] dark:text-white"
				>
					<p>{role.name}</p>

					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="flex w-auto gap-2">
						<div
							class="flex h-12 w-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#167b53] duration-300 ease-in-out hover:bg-[#209d6b]"
							onclick={() => {
								roleRequest = role;
							}}
						>
							<img src="/images/edit.png" class="h-6 w-6 object-contain" alt="" />
						</div>

						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<div
							class="flex h-12 w-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#c53232] duration-300 ease-in-out hover:bg-[#e03f3f]"
							onclick={() => deleteStore(role.id)}
						>
							<img src="/images/delete.png" class="h-6 w-6 object-contain" alt="" />
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>

	{#snippet footer()}
		<Button
			class="h-12 w-full rounded-xl bg-green-500 duration-300 ease-in-out hover:bg-green-400 dark:bg-green-500 dark:hover:bg-green-400"
			on:click={() => changeRole(roleRequest)}
		>
			{$_('submit')}
		</Button>
	{/snippet}
</Modal>
