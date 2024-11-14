<script lang="ts">
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

	const dailyRequest = $state({
		...new Daily.Create(),
		project_id: Number($page.params.projectId)
	});
	let isLoading = $state(false);
	const image = new ImageCommon();

	async function addDaily(request: Daily.Create) {
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
			const response = await dailyStore.create({
				...request,
				date: moment(request.date).format('YYYY-MM-DD')
			});
			if (!response) throw new Error('Failed to add daily');
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
		{$_('add-daily')}
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
				onclick={() => addDaily(dailyRequest)}
				disabled={isLoading}
			>
				{$_('add-daily')}
			</button>
		{:else}
			<Spinner size={6} color="green" />
		{/if}
	</div>
</div>
