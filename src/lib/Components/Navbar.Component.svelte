<script lang="ts">
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Dropdown,
    DropdownItem,
  } from "flowbite-svelte";
  import { page } from "$app/stores";
  import { DarkMode } from "flowbite-svelte";
  import { Tooltip, Img } from "flowbite-svelte";
  import { authStore } from "$lib/Store/Auth.Store";
  import { _, locale } from "svelte-i18n";

  $: activeUrl = $page.url.pathname;
  let activeClass =
    "text-white bg-green-700 md:bg-transparent md:text-green-700 md:dark:text-green-300 dark:bg-green-600 md:dark:bg-transparent duration-300 ease-in-out";
  let nonActiveClass =
    "text-white hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent duration-300 ease-in-out";

  // Add these classes for responsive text

  export let isLoading;

  function toggleNavBar() {
    document.querySelector(".navbarContainer")?.setAttribute("hidden", "true");
    document.querySelector(".navbarContainer")?.removeAttribute("tabindex");
    document.querySelector(".navbarContainer")?.removeAttribute("role");
  }

  let languages = [
    { name: "English", code: "en", flag: "/images/en.png" },
    { name: "Arabic", code: "ar", flag: "/images/ar.png" },
    { name: "Kurdish", code: "ckb", flag: "/images/ckb.png" },
  ];

  function getIconColor(isActive: boolean) {
    return isActive ? "currentColor" : "gray";
  }
</script>

<div class="w-full h-auto flex justify-center items-center gap-2">
  <Navbar
    let:NavContainer
    class="bg-transparent dark:bg-transparent w-full md:w-auto flex justify-between items-center"
  >
    <NavContainer
      class="[box-shadow:_0_1px_5px_#24b97d] border px-2 sm:px-5 h-20 sm:h-26 rounded-lg md:rounded-full border-[#24b97d] bg-[#24b97d7e] dark:bg-[#11433A] text-white"
    >
      <NavBrand href="/" class="">
        <span
          class="[text-shadow:_0_1px_15px_#24b97d] text-[#0e714a] dark:text-[#24b97d] self-center whitespace-nowrap text-xs sm:text-sm lg:text-xl font-semibold mr-2 sm:mr-12"
          >Sanya Group</span
        >
      </NavBrand>

      <div
        class="w-12 h-12 rounded-full [box-shadow:_0_1px_5px_#24b97d] border border-[#24b97d] bg-[#24b97d7e] dark:bg-[#11433A] flex md:hidden my-4 justify-center items-center mr-12"
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
        {activeUrl}
        {activeClass}
        {nonActiveClass}
        class="navbarContainer z-50 dark:bg-[#11433A] bg-[#85DBB8] md:dark:bg-transparent md:bg-transparent md:rounded-none rounded-b-lg"
        ulClass="bg-transparent dark:bg-transparent md:bg-transparent dark:md:bg-transparent border-0 mt-4 flex items-center flex-col p-4 md:flex-row md:space-x-2 lg:space-x-8 rtl:space-x-reverse md:mt-0 text-xs lg:text-sm xl:text-base shrink-10"
      >
        <NavLi
          href="/project/0"
          class={`${activeUrl.startsWith("/project") ? activeClass : nonActiveClass} flex md:flex-col gap-4 md:gap-0 items-center justify-center transition-all duration-300 ease-in-out`}
          on:click={toggleNavBar}
        >
          <svg
            class="w-4 h-4 sm:w-6 sm:h-6"
            fill="none"
            stroke={getIconColor(activeUrl.startsWith("/project"))}
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
            class={`mt-1 transition-opacity duration-300 ease-in-out ${activeUrl.startsWith("/project") ? "flex" : "flex md:hidden"}`}
            >{$_("project")}</span
          >
        </NavLi>
        <NavLi
          href="/inbox"
          class={`${activeUrl.startsWith("/inbox") ? activeClass : nonActiveClass} flex md:flex-col gap-4 md:gap-0 items-center justify-center transition-all duration-300 ease-in-out`}
          on:click={toggleNavBar}
        >
          <svg
            class="w-4 h-4 sm:w-6 sm:h-6"
            fill="none"
            stroke={getIconColor(activeUrl.startsWith("/inbox"))}
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
            class={`mt-1 transition-opacity duration-300 ease-in-out ${activeUrl.startsWith("/inbox") ? "flex" : "flex md:hidden"}`}
            >{$_("inbox")}</span
          >
        </NavLi>

        <NavLi
          href="/user/0"
          class={`${activeUrl.startsWith("/user") ? activeClass : nonActiveClass} flex md:flex-col gap-4 md:gap-0 items-center justify-center transition-all duration-300 ease-in-out`}
          on:click={toggleNavBar}
        >
          <svg
            class="w-4 h-4 sm:w-6 sm:h-6"
            fill="none"
            stroke={getIconColor(activeUrl.startsWith("/user"))}
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
            class={`mt-1 transition-opacity duration-300 ease-in-out ${activeUrl.startsWith("/user") ? "flex" : "flex md:hidden"}`}
            >{$_("users")}</span
          >
        </NavLi>

        <NavLi
          href="/setting"
          class={`${activeUrl.startsWith("/setting") ? activeClass : nonActiveClass} flex md:flex-col gap-4 md:gap-0 items-center justify-center transition-all duration-300 ease-in-out`}
          on:click={toggleNavBar}
        >
          <svg
            class="w-4 h-4 sm:w-6 sm:h-6"
            fill="none"
            stroke={getIconColor(activeUrl.startsWith("/setting"))}
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
            class={`mt-1 ${activeUrl.startsWith("/setting") ? "flex" : "flex md:hidden"} transition-all duration-300 ease-in-out`}
            >{$_("setting")}</span
          >
        </NavLi>

        <NavLi
          class="cursor-pointer flex md:flex-col gap-4 md:gap-0 items-center justify-center transition-all duration-300 ease-in-out"
          on:click={() => authStore.logout()}
        >
          <svg
            class="w-4 h-4 sm:w-6 sm:h-6"
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
          <span
            class={`mt-1 transition-opacity duration-300 ease-in-out flex md:hidden`}
            >{$_("logout")}</span
          >
        </NavLi>

        <DarkMode
          class="text-lg"
          btnClass="text-gray-500 dark:text-gray-400 rounded-lg text-sm p-2.5"
        >
          <img
            src="/images/sun.png"
            slot="lightIcon"
            class="w-4 sm:w-6 md:w-8 object-cover"
            alt=""
          />

          <img
            src="/images/moon.png"
            slot="darkIcon"
            class="w-4 sm:w-6 md:w-8 object-cover"
            alt=""
          />
        </DarkMode>
        <button class="uppercase w-fit"
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
              class="flex items-center text-xs sm:text-sm font-medium dark:text-white text-black"
              on:click={() => {
                locale.set(language.code);
                localStorage.setItem("lang", language.code);
              }}
            >
              <img
                src={language.flag}
                alt={language.name}
                class="w-5 h-5 mr-2 rounded-full"
              />
              {language.name}
            </DropdownItem>
          {/each}
        </Dropdown>
      </NavUl>
    </NavContainer>
  </Navbar>

  <div
    class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full [box-shadow:_0_1px_5px_#24b97d] border border-[#24b97d] bg-[#24b97d7e] dark:bg-[#11433A] hidden md:flex justify-center items-center text-2xl sm:text-3xl md:text-4xl text-white cursor-pointer"
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
  <Tooltip defaultClass="py-2 px-3 text-xs sm:text-sm font-medium"
    >{$authStore?.name}</Tooltip
  >
</div>
