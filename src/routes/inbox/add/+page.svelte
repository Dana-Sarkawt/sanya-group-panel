<script lang="ts">
	import { goto } from '$app/navigation';
	import { inboxStore } from '$lib/Store/Inbox.Store';
	import { Inbox } from '$lib/Models/Request/Inbox.Request.Model';
	import { _ } from 'svelte-i18n';
	import { toastStore } from '$lib/Store/Toast.Store';

	const inboxRequest = $state(new Inbox.Create());

	async function addInbox(request: Inbox.Create) {
		try {
			const response = await inboxStore.create(request);
			if (!response) {
				toastStore.error($_('failed-to-create-inbox-item'));
				throw new Error($_('failed-to-create-inbox-item'));
			}
			goto(`/inbox/0`);
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div class="flex h-auto w-full items-center justify-center md:px-44">
	<a href="/inbox/0">
		<p
			class="flex h-12 w-24 items-center justify-center rounded-xl bg-green-700 text-white duration-300 ease-in-out hover:bg-green-500"
		>
			{$_('back')}
		</p>
	</a>

	<p class="my-12 h-auto w-full text-center text-2xl md:text-4xl dark:text-white">
		{$_('add-inbox')}
	</p>
</div>

<div class="flex h-auto w-full items-center justify-center">
	<div
		class="flex h-auto w-[90%] flex-col items-center justify-center gap-6 rounded-xl border border-[#11433A] bg-[#94DCBA] p-10 md:w-[50%] dark:border-[#94DCBA] dark:bg-[#11433A]"
	>
		<div class="flex h-auto w-full flex-col items-start justify-center">
			<p class="dark:text-white">{$_('inbox-title')}</p>
			<input
				type="text"
				class="w-full rounded-xl border-0 bg-[#daffee] dark:bg-[#0d2621] dark:text-white"
				bind:value={inboxRequest.title}
			/>
		</div>

		<div class="flex h-auto w-full flex-col items-start justify-center">
			<p class="dark:text-white">{$_('description')}</p>
			<textarea
				class="w-full rounded-xl border-0 bg-[#daffee] dark:bg-[#0d2621] dark:text-white"
				rows="4"
				bind:value={inboxRequest.description}
			></textarea>
		</div>

		<button
			class="h-12 w-full rounded-xl bg-green-600 text-white duration-300 ease-in-out hover:bg-green-500"
			onclick={async () => addInbox(inboxRequest)}
		>
			{$_('add-inbox')}
		</button>
	</div>
</div>
