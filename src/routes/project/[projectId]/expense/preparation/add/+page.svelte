<script lang="ts">
	import { preparationStore } from '$lib/Store/Preparation.Store';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Preparation } from '$lib/Models/Request/Preparation.Request.Model';
	import { ImageCommon } from '$lib/Models/Common/Image.Common.Model';
	import { storageStore } from '$lib/Store/Storage.Store';
	import ImageField from '$lib/Components/ImageField.Component.svelte';
	import { _ } from 'svelte-i18n';
	import { Spinner } from 'flowbite-svelte';

	const preparationRequest = $state({
		...new Preparation.Create(),
		project_id: Number($page.params.projectId)
	});
	const image = new ImageCommon();
	let isLoading = $state(false);

	async function addPreparation(request: Preparation.Create) {
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
			const response = await preparationStore.create(request);
			if (!response) throw new Error('Failed to add preparation');
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
		{$_('add-preparation')}
	</p>
</div>

<div class="flex h-auto w-full items-center justify-center">
	<div
		class="flex h-auto w-[90%] flex-col items-center justify-center gap-6 rounded-xl border border-[#11433A] bg-[#94DCBA] p-10 md:w-[50%] dark:border-[#94DCBA] dark:bg-[#11433A]"
	>
		<ImageField {image} />
		<div class="flex h-auto w-full flex-col items-start justify-center">
			<p class="dark:text-white">{$_('description')}</p>
			<textarea
				class="w-full rounded-xl border-0 bg-[#daffee] dark:bg-[#0d2621] dark:text-white"
				bind:value={preparationRequest.description}
			></textarea>
		</div>

		{#if !isLoading}
			<button
				class="h-12 w-full rounded-xl bg-green-600 text-white duration-300 ease-in-out hover:bg-green-500"
				onclick={() => addPreparation(preparationRequest)}
			>
				{$_('add-preparation')}
			</button>
		{:else}
			<Spinner size={6} color="green" />
		{/if}
	</div>
</div>
