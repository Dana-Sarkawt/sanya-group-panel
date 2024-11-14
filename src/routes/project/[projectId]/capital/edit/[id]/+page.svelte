<script lang="ts">
	import { goto } from '$app/navigation';
	import moment from 'moment';
	import { capitalStore } from '$lib/Store/Capital.Store';
	import { page } from '$app/stores';
	import { Capital } from '$lib/Models/Request/Capital.Request.Model';
	import { onMount } from 'svelte';
	import { FilterTextFieldToNumbers } from '$lib/Utils/FilterFields.Utils';
	import { ImageCommon } from '$lib/Models/Common/Image.Common.Model';
	import { storageStore } from '$lib/Store/Storage.Store';
	import ImageField from '$lib/Components/ImageField.Component.svelte';
	import { _ } from 'svelte-i18n';
	import { Spinner } from 'flowbite-svelte';

	let capitalRequest = $state({
		...new Capital.Update(),
		project_id: Number($page.params.projectId)
	});
	const image = $state(new ImageCommon());
	let isLoading = $state(false);
	onMount(async () => {
		const capital = await capitalStore.get(Number($page.params.id));
		if (!capital) {
			throw new Error('Failed to fetch capital');
		}
		capitalRequest = {
			...capitalRequest,
			description: capital.data.description as string,
			price: capital.data.price as number,
			date: capital.data.date as string,
			id: capital.data.id,
			image: capital.data.image as string
		};
		image.localUrl = capital.data.image as string;
	});

	async function updateCapital(request: Capital.Update) {
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
			await capitalStore.update({
				...request,
				date: moment(request.date).format('YYYY-MM-DD')
			});
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
			Back
		</p>
	</a>

	<p class="my-12 h-auto w-full text-center text-2xl md:text-4xl dark:text-white">
		{$_('update-capital')}
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
				bind:value={capitalRequest.description}
			></textarea>
		</div>

		<div class="flex h-auto w-full flex-col items-start justify-center">
			<p class="dark:text-white">{$_('price')}</p>
			<input
				type="text"
				class="w-full rounded-xl border-0 bg-[#daffee] dark:bg-[#0d2621] dark:text-white"
				oninput={FilterTextFieldToNumbers}
				bind:value={capitalRequest.price}
			/>
		</div>

		<div class="flex h-auto w-full flex-col items-start justify-center">
			<p class="dark:text-white">{$_('date')}</p>
			<input
				type="date"
				class="w-full rounded-xl border-0 bg-[#daffee] dark:bg-[#0d2621] dark:text-white"
				bind:value={capitalRequest.date}
			/>
		</div>

		{#if !isLoading}
			<button
				class="h-12 w-full rounded-xl bg-green-600 text-white duration-300 ease-in-out hover:bg-green-500"
				onclick={() => updateCapital(capitalRequest)}
			>
				{$_('update-capital')}
			</button>
		{:else}
			<Spinner size={6} color="green" />
		{/if}
	</div>
</div>
