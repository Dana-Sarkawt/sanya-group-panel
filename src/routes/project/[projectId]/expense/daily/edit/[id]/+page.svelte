<script lang="ts">
	import { onMount } from 'svelte';
	import moment from 'moment';
	import { goto } from '$app/navigation';
	import { dailyStore } from '$lib/Store/Daily.Store';
	import { page } from '$app/stores';
	import { Daily } from '$lib/Models/Request/Daily.Request.Model';
	import { FilterTextFieldToNumbers } from '$lib/Utils/FilterFields.Utils';
	import { ImageCommon } from '$lib/Models/Common/Image.Common.Model';
	import { storageStore } from '$lib/Store/Storage.Store';
	import ImageField from '$lib/Components/ImageField.Component.svelte';
	import { _ } from 'svelte-i18n';
	import { Spinner } from 'flowbite-svelte';

	let dailyRequest = $state({
		...new Daily.Update(),
		project_id: Number($page.params.projectId)
	});
	const image = $state(new ImageCommon());
	let isLoading = $state(false);
	onMount(async () => {
		const daily = await dailyStore.get(Number($page.params.id));
		if (!daily) {
			throw new Error('Failed to fetch daily');
		}
		dailyRequest = {
			...dailyRequest,
			description: daily.data.description as string,
			price: daily.data.price as number,
			date: daily.data.date as string,
			id: daily.data.id,
			image: daily.data.image as string
		};
		image.localUrl = daily.data.image as string;
	});

	async function UpdateDaily(request: Daily.Update) {
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
			await dailyStore.update({
				...request,
				date: moment(request.date).format('YYYY-MM-DD')
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
		{$_('update-daily')}
	</p>
</div>

<div class="flex h-auto w-full items-center justify-center">
	<div
		class="flex h-auto w-[90%] flex-col items-center justify-center gap-6 rounded-xl border border-[#11433A] bg-[#94DCBA] p-10 md:w-[50%] dark:border-[#94DCBA] dark:bg-[#11433A]"
	>
		<ImageField {image} />
		<div class="flex h-auto w-full flex-col items-start justify-center">
			<p class="dark:text-white">Description</p>
			<textarea
				class="w-full rounded-xl border-0 bg-[#daffee] dark:bg-[#0d2621] dark:text-white"
				bind:value={dailyRequest.description}
			></textarea>
		</div>

		<div class="flex h-auto w-full flex-col items-start justify-center">
			<p class="dark:text-white">{$_('price')}</p>
			<input
				type="text"
				class="w-full rounded-xl border-0 bg-[#daffee] dark:bg-[#0d2621] dark:text-white"
				oninput={FilterTextFieldToNumbers}
				bind:value={dailyRequest.price}
			/>
		</div>

		<div class="flex h-auto w-full flex-col items-start justify-center">
			<p class="dark:text-white">{$_('date')}</p>
			<input
				type="date"
				class="w-full rounded-xl border-0 bg-[#daffee] dark:bg-[#0d2621] dark:text-white"
				bind:value={dailyRequest.date}
			/>
		</div>

		{#if !isLoading}
			<button
				class="h-12 w-full rounded-xl bg-green-600 text-white duration-300 ease-in-out hover:bg-green-500"
				onclick={() => UpdateDaily(dailyRequest)}
			>
				{$_('update-daily')}
			</button>
		{:else}
			<Spinner size={6} color="green" />
		{/if}
	</div>
</div>
