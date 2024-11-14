<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { projectStore } from '$lib/Store/Project.Store';
	import { Status } from '$lib/Models/Enum/Status.Enum.Model';
	import { Project } from '$lib/Models/Request/Project.Request.Model';
	import { onMount } from 'svelte';
	import ImageField from '$lib/Components/ImageField.Component.svelte';
	import { ImageCommon } from '$lib/Models/Common/Image.Common.Model';
	import { storageStore } from '$lib/Store/Storage.Store';
	import { _ } from 'svelte-i18n';
	let projectRequest = $state(new Project.Update());
	const image = $state(new ImageCommon());

	onMount(async () => {
		const project = await projectStore.get(Number($page.params.id));
		if (!project) {
			throw new Error('Failed to fetch project');
		}
		projectRequest = {
			...projectRequest,
			name: project.data.name as string,
			status: project.data.status as Status,
			id: project.data.id,
			image: project.data.image as string
		};
		image.localUrl = project.data.image as string;
	});

	async function UpdateProject(request: Project.Update) {
		try {
			if (image.file && image.file.size > 0) {
				const response = await storageStore.uploadImage(image.file);
				if (!response) {
					throw new Error('Failed to upload image');
				}
				request.image = response;
			}
			const response = await projectStore.update(request);
			if (!response) {
				throw new Error('Failed to update project');
			}
			goto(`/project/0`);
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div class="flex h-auto w-full items-center justify-center md:px-44">
	<a href="/project/0">
		<p
			class="flex h-12 w-24 items-center justify-center rounded-xl bg-green-700 text-white duration-300 ease-in-out hover:bg-green-500"
		>
			{$_('back')}
		</p>
	</a>

	<p class="my-12 h-auto w-full text-center text-2xl md:text-4xl dark:text-white">
		{$_('update-project')}
	</p>
</div>

<div class="flex h-auto w-full items-center justify-center">
	<div
		class="flex h-auto w-[90%] flex-col items-center justify-center gap-6 rounded-xl border border-[#11433A] bg-[#94DCBA] p-10 md:w-[50%] dark:border-[#94DCBA] dark:bg-[#11433A]"
	>
		<ImageField {image} />
		<div class="flex h-auto w-full flex-col items-start justify-center">
			<p class="dark:text-white">{$_('project-name')}</p>
			<input
				type="text"
				class="w-full rounded-xl border-0 bg-[#daffee] dark:bg-[#0d2621] dark:text-white"
				bind:value={projectRequest.name}
			/>
		</div>

		<div class="flex h-auto w-full flex-col items-start justify-center">
			<p class="dark:text-white">{$_('status')}</p>
			<select
				name=""
				id=""
				class="w-full rounded-xl border-0 bg-[#daffee] dark:bg-[#0d2621] dark:text-white"
				bind:value={projectRequest.status}
			>
				{#each Object.values(Status) as key, value}
					<option value={key}>{key}</option>
				{/each}
			</select>
		</div>

		<button
			class="h-12 w-full rounded-xl bg-green-600 text-white duration-300 ease-in-out hover:bg-green-500"
			onclick={() => UpdateProject(projectRequest)}
		>
			{$_('update-project')}
		</button>
	</div>
</div>
