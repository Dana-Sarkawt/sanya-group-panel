<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { saleStore } from '$lib/Store/Sale.Store';
	import { Sale } from '$lib/Models/Request/Sale.Request.Model';
	import { onMount } from 'svelte';
	import { ImageCommon } from '$lib/Models/Common/Image.Common.Model';
	import { storageStore } from '$lib/Store/Storage.Store';
	import ImageField from '$lib/Components/ImageField.Component.svelte';
	import { _ } from 'svelte-i18n';
	import { Spinner } from 'flowbite-svelte';

	let saleRequest = $state({
		...new Sale.Update(),
		project_id: Number($page.params.projectId)
	});
	const image = $state(new ImageCommon());
	let isLoading = $state(false);

	onMount(async () => {
		const sale = await saleStore.get(Number($page.params.id));
		if (!sale) {
			throw new Error('Failed to fetch sale');
		}
		saleRequest = {
			...saleRequest,
			description: sale.data.description as string,
			id: sale.data.id,
			image: sale.data.image as string
		};
		image.localUrl = sale.data.image as string;
	});

	async function updateSale(request: Sale.Update) {
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
			const response = await saleStore.update(request);
			if (!response) {
				throw new Error('Failed to update sale');
			}
			goto(`/project/${$page.params.projectId}/0`);
		} catch (error) {
			console.log(error);
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="flex h-auto w-full items-center justify-center md:px-44">
	<a href="/project/{$page.params.projectId}/0">
		<p
			class="flex h-12 w-24 items-center justify-center rounded-xl bg-green-700 text-white duration-300 ease-in-out hover:bg-green-500"
		>
			{$_('back')}
		</p>
	</a>

	<p class="my-12 h-auto w-full text-center text-2xl md:text-4xl dark:text-white">
		{$_('update-sale')}
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
				bind:value={saleRequest.description}
			></textarea>
		</div>

		{#if !isLoading}
			<button
				class="h-12 w-full rounded-xl bg-green-600 text-white duration-300 ease-in-out hover:bg-green-500"
				onclick={() => updateSale(saleRequest)}
			>
				{$_('update-sale')}
			</button>
		{:else}
			<Spinner size={6} color="green" />
		{/if}
	</div>
</div>
