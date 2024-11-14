<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Authentication } from '$lib/Models/Request/Authentication.Request.Model';
	import { authStore } from '$lib/Store/Auth.Store';
	import { _ } from 'svelte-i18n';

	const loginRequest = $state(new Authentication.Login());

	onMount(async () => {
		await checkAuth();
	});

	async function login(request: Authentication.Login) {
		try {
			const response = await authStore.login(request.email, request.password);
			if (!response) {
				throw new Error('Invalid credentials');
			}
			checkAuth();
		} catch (error) {
			console.log(error);
		}
	}

	async function checkAuth() {
		const response = await authStore.get();
		if (response) {
			goto('/');
		} else {
			goto('/login');
		}
	}
</script>

<p class="my-12 h-auto w-full text-center text-4xl font-bold dark:text-white">Sanay Group</p>

<div class="flex h-auto w-full items-center justify-center">
	<div
		class="flex h-auto w-[90%] flex-col items-center justify-center gap-6 rounded-xl border border-[#11433A] bg-[#94DCBA] p-10 md:w-[50%] dark:border-[#94DCBA] dark:bg-[#11433A]"
	>
		<div class="flex h-auto w-full flex-col items-start justify-center">
			<p class="dark:text-white">{$_('email')}</p>
			<input
				dir="ltr"
				type="text"
				bind:value={loginRequest.email}
				class="w-full rounded-xl border-0 bg-[#daffee] dark:bg-[#0d2621] dark:text-white"
			/>
		</div>

		<div class="flex h-auto w-full flex-col items-start justify-center">
			<p class="dark:text-white">{$_('password')}</p>
			<input
				dir="ltr"
				type="password"
				bind:value={loginRequest.password}
				class="w-full rounded-xl border-0 bg-[#daffee] dark:bg-[#0d2621] dark:text-white"
			/>
		</div>

		<!-- <div class="w-full h-auto flex flex-col justify-center items-start">
            <p class="dark:text-white">Role</p>
            <select name="" id="" class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white">
                <option value="">Super Admin</option>
                <option value="">Admin</option>
            </select>
        </div> -->

		<button
			class="h-12 w-full rounded-xl bg-green-600 text-white duration-300 ease-in-out hover:bg-green-500"
			onclick={() => login(loginRequest)}
		>
			{$_('login')}
		</button>
	</div>
</div>
