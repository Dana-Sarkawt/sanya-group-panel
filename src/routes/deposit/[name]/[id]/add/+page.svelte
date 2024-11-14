<script lang="ts">
	import moment from 'moment';
	import { goto } from '$app/navigation';
	import { depositStore } from '$lib/Store/Deposit.Store';
	import { page } from '$app/stores';
	import { Deposit } from '$lib/Models/Request/Deposit.Request.Model';
	import { FilterTextFieldToNumbers } from '$lib/Utils/FilterFields.Utils';
	import { ImageCommon } from '$lib/Models/Common/Image.Common.Model';
	import { storageStore } from '$lib/Store/Storage.Store';
	import ImageField from '$lib/Components/ImageField.Component.svelte';
	let {
		depositRequest = $bindable({
			...new Deposit.Create(),
			[`${$page.params.name}_id`]: Number($page.params.id)
		})
	} = $props();
	const image = new ImageCommon();

	async function addDeposit(request: Deposit.Create) {
		try {
			if (image.file && image.file.size > 0) {
				const response = await storageStore.uploadImage(image.file);
				if (!response) {
					throw new Error('Failed to upload image');
				}
				request.image = response;
			}
			depositStore.create({
				...request,
				date: moment(request.date).format('YYYY-MM-DD')
			});
			goto(`/deposit/${$page.params.name}/${$page.params.id}`);
		} catch (error) {
			console.log(error);
		}
	}
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

<p class="my-12 h-auto w-full text-center text-4xl dark:text-white">Add Deposit</p>
<div class="flex h-auto w-full items-center justify-center">
	<div
		class="flex h-auto w-[90%] flex-col items-center justify-center gap-6 rounded-xl border border-[#11433A] bg-[#94DCBA] p-10 md:w-[50%] dark:border-[#94DCBA] dark:bg-[#11433A]"
	>
		<ImageField {image} />
		<div class="flex h-auto w-full flex-col items-start justify-center">
			<p class="dark:text-white">Description</p>
			<textarea
				class="w-full rounded-xl border-0 bg-[#daffee] dark:bg-[#0d2621] dark:text-white"
				bind:value={depositRequest.description}
			></textarea>
		</div>

		<div class="flex h-auto w-full flex-col items-start justify-center">
			<p class="dark:text-white">Price</p>
			<input
				type="text"
				class="w-full rounded-xl border-0 bg-[#daffee] dark:bg-[#0d2621] dark:text-white"
				oninput={FilterTextFieldToNumbers}
				bind:value={depositRequest.price}
			/>
		</div>

		<div class="flex h-auto w-full flex-col items-start justify-center">
			<p class="dark:text-white">Date</p>
			<input
				type="date"
				class="w-full rounded-xl border-0 bg-[#daffee] dark:bg-[#0d2621] dark:text-white"
				bind:value={depositRequest.date}
			/>
		</div>

		<button
			class="h-12 w-full rounded-xl bg-green-600 text-white duration-300 ease-in-out hover:bg-green-500"
			onclick={() => addDeposit(depositRequest)}>Add Deposit</button
		>
	</div>
</div>
