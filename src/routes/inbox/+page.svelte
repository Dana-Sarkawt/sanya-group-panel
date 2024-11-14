<script lang="ts">
	import InboxTable from '$lib/Components/ResponsiveTable/InboxTable.Component.svelte';
	import { _ } from 'svelte-i18n';
</script>

<div class="flex h-auto w-full items-center justify-center">
	<div class="flex h-auto w-full flex-col items-center justify-center lg:mx-24">
		<div class="mt-20 flex h-[100vh] w-full flex-col items-center justify-start" id="subDiv">
			<InboxTable />
		</div>
	</div>
</div>

<style>
	.loaderPink {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		display: inline-block;
		position: relative;
		border: 10px solid;
		border-color: #2875fa1d #2875fa39 #2875fa58 #2875fa7b;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
