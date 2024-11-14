<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { workerStore } from '$lib/Store/Worker.Store';
	import { Worker } from '$lib/Models/Request/Worker.Request.Model';
	import { onMount } from 'svelte';
	import { ImageCommon } from '$lib/Models/Common/Image.Common.Model';
	import { storageStore } from '$lib/Store/Storage.Store';
	import { _ } from 'svelte-i18n';
	import { Spinner } from 'flowbite-svelte';

	let workerRequest = $state({
		...new Worker.Update(),
		project_id: Number($page.params.projectId)
	});
	const image = new ImageCommon();
	let isLoading = $state(false);
	onMount(async () => {
		const worker = await workerStore.get(Number($page.params.id));
		if (!worker) {
			throw new Error('Failed to fetch worker');
		}
		workerRequest = {
			...workerRequest,
			name: worker.data.name as string,
			id: worker.data.id,
			image: worker.data.image as string
		};
		image.localUrl = worker.data.image as string;
	});

	async function UpdateWorker(request: Worker.Update) {
		if (isLoading) return;
		try {
			isLoading = true;
			if (image.file && image.file.size > 0) {
				const response = await storageStore.uploadImage(image.file);
				if (!response) {
					throw new Error('Failed to upload image');
				}
				request.image = response;
			}
			await workerStore.update({
				...request
			});
			goto(`/project/${$page.params.projectId}/expense/0`);
		} catch (error) {
			console.log(error);
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="flex h-auto w-full items-center justify-center md:px-44">
	<a href="/project/{$page.params.projectId}/expense/0">
		<p
			class="flex h-12 w-24 items-center justify-center rounded-xl bg-green-700 text-white duration-300 ease-in-out hover:bg-green-500"
		>
			{$_('back')}
		</p>
	</a>

	<p class="my-12 h-auto w-full text-center text-2xl md:text-4xl dark:text-white">
		{$_('update-worker')}
	</p>
</div>

<div class="flex h-auto w-full items-center justify-center">
	<div
		class="flex h-auto w-[90%] flex-col items-center justify-center gap-6 rounded-xl border border-[#11433A] bg-[#94DCBA] p-10 md:w-[50%] dark:border-[#94DCBA] dark:bg-[#11433A]"
	>
		<div class="flex h-auto w-full flex-col items-start justify-center">
			<p class="dark:text-white">{$_('name')}</p>
			<input
				type="text"
				class="w-full rounded-xl border-0 bg-[#daffee] dark:bg-[#0d2621] dark:text-white"
				bind:value={workerRequest.name}
			/>
		</div>

		{#if !isLoading}
			<button
				class="h-12 w-full rounded-xl bg-green-600 text-white duration-300 ease-in-out hover:bg-green-500"
				onclick={() => UpdateWorker(workerRequest)}
			>
				{$_('update-worker')}
			</button>
		{:else}
			<Spinner size={6} color="green" />
		{/if}
	</div>
</div>
