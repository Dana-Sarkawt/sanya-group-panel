<script lang="ts">
	import type { Store } from '$lib/Models/Response/Store.Response.Model';
	import type { Database } from '$lib/Supabase/Types/database.types';
	import DeleteModal from '$lib/Components/DeleteModal.Component.svelte';
	import { projectStore } from '$lib/Store/Project.Store';
	import { Status } from '$lib/Models/Enum/Status.Enum.Model';
	import { VITE_SUPABASE_BUCKET_SANYA } from '$env/static/public';
	import { _ } from 'svelte-i18n';
	import ImageDialog from '../ImageDialog.Component.svelte';
	import { Tooltip } from 'flowbite-svelte';

	let selectedImage: string = $state('');
	let imageDialog = $state(false);

	interface Props {
		projects?: Store<Database['public']['Tables']['Projects']['Row']>;
	}

	let {
		projects = $bindable({
			data: [],
			count: 0
		})
	}: Props = $props();
	let deleteId: number = $state(0);
	let deleteModal = $state(false);
</script>

<div class="mx-2 flex h-auto w-full items-center justify-center">
	<table class="table w-full rounded-xl text-[5px] text-white md:text-lg">
		<thead>
			<tr>
				<th scope="col">{$_('image')}</th>
				<th scope="col">{$_('project-id')}</th>
				<th scope="col">{$_('project-name')}</th>
				<th scope="col">{$_('status')}</th>
				<th scope="col">{$_('action')}</th>
			</tr>
		</thead>
		<tbody>
			{#if projects.count !== 0}
				{#each projects.data as project}
					<tr>
						<td class="flex justify-center">
							<div class="group relative">
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
								<img
									src={project.image
										? `${VITE_SUPABASE_BUCKET_SANYA}${project.image}`
										: '/images/spark.png'}
									class="h-10 w-10 cursor-pointer rounded-lg object-contain transition-all duration-300 group-hover:z-10 group-hover:scale-150"
									alt={project.image}
									onclick={() => {
										selectedImage = project.image
											? `${VITE_SUPABASE_BUCKET_SANYA}${project.image}`
											: '/images/spark.png';
										imageDialog = true;
									}}
								/>
							</div>
						</td>
						<td>{project.id}</td>
						<td>{project.name}</td>
						<td>
							<div class="flex w-full justify-center rounded-xl">
								<p
									class={`w-12 rounded-3xl p-2 font-medium text-white shadow-lg md:w-32 ${
										project.status === Status.Stopped
											? 'bg-gradient-to-b from-[#ff8f1f] to-[#d66b00] shadow-[0_4px_6px_-1px_rgba(214,107,0,0.5)]'
											: project.status === Status.Failed
												? 'bg-gradient-to-b from-[#b51717] to-[#8b1313] shadow-[0_4px_6px_-1px_rgba(139,19,19,0.5)]'
												: project.status === Status.In_Progress
													? 'bg-gradient-to-b from-[#1969c4] to-[#144b90] shadow-[0_4px_6px_-1px_rgba(20,75,144,0.5)]'
													: project.status === Status.Done
														? 'bg-gradient-to-b from-[#13983d] to-[#0f762e] shadow-[0_4px_6px_-1px_rgba(15,118,46,0.5)]'
														: ''
									}`}
								>
									{project.status}
								</p>
							</div>
						</td>
						<td>
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<div class="flex h-auto w-auto items-center justify-center gap-2">
								<a
									id="view-button-{project.id}"
									href="/project/{project.id}/0"
									class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 p-2 hover:bg-blue-500 md:h-12 md:w-12"
								>
									<img
										src="/images/vision.png"
										class="h-4 w-4 object-contain md:h-8 md:w-8"
										alt=""
									/>
								</a>
								<Tooltip triggeredBy={`#view-button-${project.id}`}>
									{$_('view')}
								</Tooltip>

								<a
									id="edit-button-{project.id}"
									href="edit/{project.id}"
									class="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 p-2 hover:bg-green-500 md:h-12 md:w-12"
								>
									<img src="/images/edit.png" class="h-4 w-4 object-contain md:h-8 md:w-8" alt="" />
								</a>
								<Tooltip triggeredBy={`#edit-button-${project.id}`}>
									{$_('edit')}
								</Tooltip>

								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<a
									id="delete-button-{project.id}"
									class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-red-600 p-2 hover:bg-red-500 md:h-12 md:w-12"
									onclick={() => {
										deleteModal = true;
										deleteId = project.id;
									}}
								>
									<img
										src="/images/delete.png"
										class="h-4 w-4 object-contain md:h-8 md:w-8"
										alt=""
									/>
								</a>
								<Tooltip triggeredBy={`#delete-button-${project.id}`}>
									{$_('delete')}
								</Tooltip>
							</div>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<DeleteModal bind:deleteModal Store={projectStore} id={deleteId} />

<!-- <RevenueModal bind:revenueModal /> -->

<ImageDialog bind:image={selectedImage} bind:open={imageDialog} />
