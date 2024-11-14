<script lang="ts">
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { DarkMode } from 'flowbite-svelte';
	import { Tooltip, Img } from 'flowbite-svelte';
	import { authStore } from '$lib/Store/Auth.Store';
	import { _, locale } from 'svelte-i18n';

	let activeUrl = $derived($page.url.pathname);
	let activeClass =
		'text-white bg-green-700 md:bg-transparent md:text-green-700 md:dark:text-green-300 dark:bg-green-600 md:dark:bg-transparent duration-300 ease-in-out';
	let nonActiveClass =
		'text-white hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent duration-300 ease-in-out';

	interface Props {
		isLoading: boolean;
	}

	let { isLoading = $bindable(false) }: Props = $props();

	function toggleNavBar() {
		document.querySelector('.navbarContainer')?.setAttribute('hidden', 'true');
		document.querySelector('.navbarContainer')?.removeAttribute('tabindex');
		document.querySelector('.navbarContainer')?.removeAttribute('role');
	}

	let languages = [
		{ name: 'English', code: 'en', flag: '/images/en.png' },
		{ name: 'Arabic', code: 'ar', flag: '/images/ar.png' },
		{ name: 'Kurdish', code: 'ckb', flag: '/images/ckb.png' }
	];

	function getIconColor(isActive: boolean) {
		return isActive ? 'currentColor' : 'gray';
	}
</script>

<div class="flex h-auto w-full items-center justify-center gap-2">
	<Navbar
		let:NavContainer
		class="flex w-full items-center justify-between bg-transparent md:w-auto dark:bg-transparent"
	>
		<NavContainer
			class="sm:h-26 h-20 rounded-lg border border-[#24b97d] bg-[#24b97d7e] px-2 text-white [box-shadow:_0_1px_5px_#24b97d] sm:px-5 md:rounded-full dark:bg-[#11433A]"
		>
			<NavBrand href="/" class="">
				<span
					class="mr-2 self-center whitespace-nowrap text-xs font-semibold text-[#0e714a] [text-shadow:_0_1px_15px_#24b97d] sm:mr-12 sm:text-sm lg:text-xl dark:text-[#24b97d]"
					>Sanay Group</span
				>
			</NavBrand>

			<div
				class="my-4 mr-12 flex h-12 w-12 items-center justify-center rounded-full border border-[#24b97d] bg-[#24b97d7e] [box-shadow:_0_1px_5px_#24b97d] md:hidden dark:bg-[#11433A]"
			>
				{#if (isLoading && !$authStore) || $authStore?.name === undefined}
					<span class="loader"></span>
				{:else}
					{$authStore?.name
						?.split(' ')
						.map((word) => word.charAt(0))
						.join('') ?? 'SM'}
				{/if}
			</div>

			<NavHamburger
				menuClass="text-[#104e35] dark:text-white"
				onClick={() => {
					if (document.querySelector('.navbarContainer')?.hasAttribute('hidden')) {
						document.querySelector('.navbarContainer')?.removeAttribute('hidden');
						document.querySelector('.navbarContainer')?.setAttribute('tabindex', '0');
						document.querySelector('.navbarContainer')?.setAttribute('role', 'button');
					} else {
						document.querySelector('.navbarContainer')?.setAttribute('hidden', 'true');
						document.querySelector('.navbarContainer')?.removeAttribute('tabindex');
						document.querySelector('.navbarContainer')?.removeAttribute('role');
					}
				}}
			/>

			<NavUl
				{activeUrl}
				{activeClass}
				{nonActiveClass}
				class="navbarContainer z-50 rounded-b-lg bg-[#85DBB8] md:rounded-none md:bg-transparent dark:bg-[#11433A] md:dark:bg-transparent"
				ulClass="bg-transparent dark:bg-transparent md:bg-transparent dark:md:bg-transparent border-0 mt-4 flex items-center flex-col p-4 md:flex-row md:space-x-2 lg:space-x-8 rtl:space-x-reverse md:mt-0 text-xs lg:text-sm xl:text-base shrink-10"
			>
				<NavLi
					href="/project/0"
					class={`${activeUrl.startsWith('/project') ? activeClass : nonActiveClass} flex items-center justify-center gap-4 transition-all duration-300 ease-in-out md:flex-col md:gap-0`}
					on:click={toggleNavBar}
				>
					<svg
						class="h-4 w-4 sm:h-6 sm:w-6"
						fill="none"
						stroke={getIconColor(activeUrl.startsWith('/project'))}
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
						></path>
					</svg>
					<span
						class={`mt-1 transition-opacity duration-300 ease-in-out ${activeUrl.startsWith('/project') ? 'flex' : 'flex md:hidden'}`}
						>{$_('project')}</span
					>
				</NavLi>
				<NavLi
					href="/inbox"
					class={`${activeUrl.startsWith('/inbox') ? activeClass : nonActiveClass} flex items-center justify-center gap-4 transition-all duration-300 ease-in-out md:flex-col md:gap-0`}
					on:click={toggleNavBar}
				>
					<svg
						class="h-4 w-4 sm:h-6 sm:w-6"
						fill="none"
						stroke={getIconColor(activeUrl.startsWith('/inbox'))}
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
						></path>
					</svg>
					<span
						class={`mt-1 transition-opacity duration-300 ease-in-out ${activeUrl.startsWith('/inbox') ? 'flex' : 'flex md:hidden'}`}
						>{$_('inbox')}</span
					>
				</NavLi>

				<NavLi
					href="/user/0"
					class={`${activeUrl.startsWith('/user') ? activeClass : nonActiveClass} flex items-center justify-center gap-4 transition-all duration-300 ease-in-out md:flex-col md:gap-0`}
					on:click={toggleNavBar}
				>
					<svg
						class="h-4 w-4 sm:h-6 sm:w-6"
						fill="none"
						stroke={getIconColor(activeUrl.startsWith('/user'))}
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
						></path>
					</svg>
					<span
						class={`mt-1 transition-opacity duration-300 ease-in-out ${activeUrl.startsWith('/user') ? 'flex' : 'flex md:hidden'}`}
						>{$_('users')}</span
					>
				</NavLi>

				<NavLi
					href="/setting"
					class={`${activeUrl.startsWith('/setting') ? activeClass : nonActiveClass} flex items-center justify-center gap-4 transition-all duration-300 ease-in-out md:flex-col md:gap-0`}
					on:click={toggleNavBar}
				>
					<svg
						class="h-4 w-4 sm:h-6 sm:w-6"
						fill="none"
						stroke={getIconColor(activeUrl.startsWith('/setting'))}
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						></path>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						></path>
					</svg>
					<span
						class={`mt-1 ${activeUrl.startsWith('/setting') ? 'flex' : 'flex md:hidden'} transition-all duration-300 ease-in-out`}
						>{$_('setting')}</span
					>
				</NavLi>

				<NavLi
					class="flex cursor-pointer items-center justify-center gap-4 transition-all duration-300 ease-in-out md:flex-col md:gap-0"
					on:click={() => authStore.logout()}
				>
					<svg
						class="h-4 w-4 sm:h-6 sm:w-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
						></path>
					</svg>
					<span class={`mt-1 flex transition-opacity duration-300 ease-in-out md:hidden`}
						>{$_('logout')}</span
					>
				</NavLi>

				<DarkMode
					class="text-lg"
					btnClass="text-gray-500 dark:text-gray-400 rounded-lg text-sm p-2.5"
				>
					{@render lightIcon()}
					{@render darkIcon()}
				</DarkMode>
				<button class="w-fit uppercase"
					><Img
						class="rounded-full object-contain"
						src={languages.find((lang) => lang.code === $locale)?.flag}
						width={25}
						height={25}
					/></button
				>
				<Dropdown class="w-36">
					{#each languages as language}
						<DropdownItem
							class="flex items-center text-xs font-medium text-black sm:text-sm dark:text-white"
							on:click={() => {
								locale.set(language.code);
								localStorage.setItem('lang', language.code);
							}}
						>
							<img src={language.flag} alt={language.name} class="mr-2 h-5 w-5 rounded-full" />
							{language.name}
						</DropdownItem>
					{/each}
				</Dropdown>
			</NavUl>
		</NavContainer>
	</Navbar>

	<div
		class="hidden h-16 w-16 cursor-pointer items-center justify-center rounded-full border border-[#24b97d] bg-[#24b97d7e] text-2xl text-white [box-shadow:_0_1px_5px_#24b97d] sm:h-20 sm:w-20 sm:text-3xl md:flex md:h-24 md:w-24 md:text-4xl dark:bg-[#11433A]"
	>
		{#if (isLoading && !$authStore) || $authStore?.name === undefined}
			<span class="loader"></span>
		{:else}
			{$authStore?.name
				?.split(' ')
				.map((word) => word.charAt(0))
				.join('')}
		{/if}
	</div>
	<Tooltip defaultClass="py-2 px-3 text-xs sm:text-sm font-medium">{$authStore?.name}</Tooltip>
</div>

{#snippet lightIcon()}
	<img src="/images/sun.png" class="w-4 object-cover sm:w-6 md:w-8" alt="" />
{/snippet}

{#snippet darkIcon()}
	<img src="/images/moon.png" class="w-4 object-cover sm:w-6 md:w-8" alt="" />
{/snippet}
