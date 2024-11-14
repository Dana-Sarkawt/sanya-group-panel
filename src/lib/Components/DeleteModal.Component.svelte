<script lang="ts">
	import { toastStore } from '$lib/Store/Toast.Store';
	import { Button, Modal } from 'flowbite-svelte';
	import { _ } from 'svelte-i18n';
	interface Props {
		deleteModal?: boolean;
		//@typescript-eslint/no-explicit-any
		Store: any;
		id?: number;
	}

	let { deleteModal = $bindable(false), Store, id = 0 }: Props = $props();

	async function deleteStore() {
		try {
			await Store.delete(id);
			window.location.reload();
		} catch (error) {
			toastStore.error($_('failed-to-delete-item'));
		} finally {
			deleteModal = false;
		}
	}
</script>

<Modal
	title="Delete Alert"
	bind:open={deleteModal}
	dialogClass="fixed top-0 start-0 end-0 h-modal md:inset-0 md:h-full z-[1000] w-full p-4 flex"
>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		<span class="text-red-500">{$_('do-you-want-to-delete')}</span>
	</p>
	{@render footer()}
</Modal>

{#snippet footer()}
	<Button
		class="h-12 w-full rounded-xl bg-red-500 duration-300 ease-in-out hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400"
		on:click={() => {
			deleteModal = false;
		}}>{$_('no')}</Button
	>
	<Button
		class="h-12 w-full rounded-xl bg-green-500 duration-300 ease-in-out hover:bg-green-400 dark:bg-green-500 dark:hover:bg-green-400"
		on:click={deleteStore}>{$_('yes')}</Button
	>
{/snippet}
