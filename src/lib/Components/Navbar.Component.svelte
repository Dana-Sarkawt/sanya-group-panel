<script lang="ts">
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
  } from "flowbite-svelte";
  import { page } from '$app/stores';
  import { DarkMode } from "flowbite-svelte";
  import { Tooltip } from "flowbite-svelte";
  import { authStore } from "$lib/Store/Auth.Store";

  $: activeUrl = $page.url.pathname;
  let activeClass = 'text-green-500 bg-green-700 md:bg-transparent md:text-green-700 md:dark:text-green-300 dark:bg-green-600 md:dark:bg-transparent duration-300 ease-in-out';
  let nonActiveClass = 'text-white hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent duration-300 ease-in-out';

  export let isLoading;

  function toggleNavBar() {
    document.querySelector(".navbarContainer")?.setAttribute("hidden", "true");
    document.querySelector(".navbarContainer")?.removeAttribute("tabindex");
    document.querySelector(".navbarContainer")?.removeAttribute("role");
  }
</script>

<div class="w-full h-auto flex justify-center items-center gap-2">
  <Navbar
    let:NavContainer
    class="bg-transparent dark:bg-transparent  w-full md:w-auto"
  >
    <NavContainer
      class="border px-5 h-26 rounded-lg md:rounded-full border-[#24b97d] bg-[#24b97d7e] dark:bg-[#11433A] text-white"
    >
      <NavBrand href="/" class="">
        <span
          class="self-center whitespace-nowrap text-sm lg:text-xl font-semibold text-[#104e35] dark:text-white mr-12 "
          >Sanya Group</span
        >
      </NavBrand>

      <div
        class="w-12 h-12 rounded-full border border-[#24b97d] bg-[#24b97d7e] dark:bg-[#11433A] flex md:hidden my-4 justify-center items-center mr-12"
      >
        {#if (isLoading && !$authStore) || $authStore?.name === undefined}
          <span class="loader"></span>
        {:else}
          {$authStore?.name
            ?.split(" ")
            .map((word) => word.charAt(0))
            .join("") ?? "SM"}
        {/if}
      </div>

      <NavHamburger
        class
        menuClass="text-[#104e35] dark:text-white"
        onClick={() => {
          if (
            document.querySelector(".navbarContainer")?.hasAttribute("hidden")
          ) {
            document
              .querySelector(".navbarContainer")
              ?.removeAttribute("hidden");
            document
              .querySelector(".navbarContainer")
              ?.setAttribute("tabindex", "0");
            document
              .querySelector(".navbarContainer")
              ?.setAttribute("role", "button");
          } else {
            document
              .querySelector(".navbarContainer")
              ?.setAttribute("hidden", "true");
            document
              .querySelector(".navbarContainer")
              ?.removeAttribute("tabindex");
            document.querySelector(".navbarContainer")?.removeAttribute("role");
          }
        }}
      />

      <NavUl
      {activeUrl} {activeClass} {nonActiveClass}
        class="navbarContainer"
        
        ulClass="bg-transparent dark:bg-transparent md:bg-transparent dark:md:bg-transparent border-0 mt-4  flex items-center flex-col p-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 text-xs lg:text-md xl:text-lg shrink-10"
      >
        <NavLi href="/project/0" class= {activeUrl.startsWith("/project") ? activeClass : nonActiveClass}
        on:click={toggleNavBar}>Project</NavLi>

        <NavLi href="/user/0" class= {activeUrl.startsWith("/user") ? activeClass : nonActiveClass}
        on:click={toggleNavBar}>Users</NavLi>


        <!-- <NavLi href="/setting">Setting</NavLi> -->
        <NavLi class="cursor-pointer" on:click={() => authStore.logout()}
          >Logout</NavLi
        >

        <DarkMode
          class="text-lg"
          btnClass="text-gray-500 dark:text-gray-400  rounded-lg text-sm p-2.5 "
        >
          <img
            src="/images/sun.png"
            slot="lightIcon"
            class="w-4 md:w-8 object-cover"
            alt=""
          />

          <img
            src="/images/moon.png"
            slot="darkIcon"
            class="w-4 md:w-8 object-cover"
            alt=""
          />
        </DarkMode>
      </NavUl>
    </NavContainer>
  </Navbar>

  <div
    class="w-24 h-24 rounded-full border border-[#24b97d] bg-[#24b97d7e] dark:bg-[#11433A] hidden md:flex justify-center items-center text-4xl text-white cursor-pointer"
  >
    {#if (isLoading && !$authStore) || $authStore?.name === undefined}
      <span class="loader"></span>
    {:else}
      {$authStore?.name
        ?.split(" ")
        .map((word) => word.charAt(0))
        .join("")}
    {/if}
  </div>
  <Tooltip defaultClass="py-2 px-3 text-sm font-medium"
    >{$authStore?.name}</Tooltip
  >
</div>
