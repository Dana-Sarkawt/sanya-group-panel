<script>
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Dropdown,
    DropdownItem,
    DropdownDivider,
  } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import { DarkMode } from "flowbite-svelte";
  import { ThumbsUpSolid, ThumbsDownSolid } from "flowbite-svelte-icons";
  import { page } from "$app/stores";
  import { authStore } from "$lib/Store/Auth.Store";
  $: activeUrl = $page.url.pathname;

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
        <!-- <img src="/images/flowbite-svelte-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
        <span
          class="self-center whitespace-nowrap text-sm lg:text-xl font-semibold text-[#104e35] dark:text-white"
          >Sanya Group</span
        >
      </NavBrand>

      <div
        class="w-12 h-12 rounded-full border border-[#24b97d] bg-[#24b97d7e] dark:bg-[#11433A] flex md:hidden my-4 justify-center items-center"
      >
        {$authStore?.name
          ?.split(" ")
          .map((word) => word.charAt(0))
          .join("") ?? "SM"}
      </div>

      <NavHamburger class menuClass="text-[#104e35] dark:text-white" />

      <NavUl
        nonActiveClass="text-[#104e35] dark:text-white"
        ulClass="bg-transparent dark:bg-transparent md:bg-transparent dark:md:bg-transparent border-0 mt-4  flex items-center flex-col p-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 text-xs lg:text-md xl:text-lg"
      >
        <NavLi class="cursor-pointer">
          Company<ChevronDownOutline
            class="w-6 h-6 ms-2 text-[#104e35] dark:text-white inline"
          />
        </NavLi>
        <Dropdown
          class="w-44 z-20 dark:bg-[#11433A] dark:border border-[#24b97d] rounded-xl"
        >
          <DropdownItem href="/project/1" class="dark:hover:bg-[#336f64]"
            >Project</DropdownItem
          >
          <DropdownItem class="dark:hover:bg-[#336f64]">
            <NavLi class="cursor-pointer text-black dark:text-white ">
              Expenses<ChevronDownOutline
                class="w-6 h-6 ms-2 text-green-500 inline"
              />
            </NavLi>

            <Dropdown
              class="w-44 z-20 absolute  bg-white dark:bg-[#11433A] border border-[#24b97d] rounded-xl"
            >
              <DropdownItem
                href="/daily/1"
                class="dark:hover:bg-[#336f64] hover:bg-[#f2f2f2]"
                activeClass="bg-[#24b97d]">Daily</DropdownItem
              >
              <DropdownItem
                href="/"
                class="dark:hover:bg-[#336f64] hover:bg-[#f2f2f2]"
                activeClass="bg-[#24b97d]">Worker</DropdownItem
              >
              <DropdownItem
                href="/"
                class="dark:hover:bg-[#336f64] hover:bg-[#f2f2f2]"
                activeClass="bg-[#24b97d]">Preparation</DropdownItem
              >
            </Dropdown>
          </DropdownItem>
          <DropdownItem href="/capital/1" class="dark:hover:bg-[#336f64]"
            >Capital</DropdownItem
          >
          <DropdownItem href="/sales/1" class="dark:hover:bg-[#336f64]"
            >Sales</DropdownItem
          >
        </Dropdown>

        <NavLi href="/user/1">Users</NavLi>
        <NavLi href="/docs/components/navbar">Setting</NavLi>
        <NavLi class="cursor-pointer" on:click={() => authStore.logout()}
          >Logout</NavLi
        >

        <DarkMode
          class="text-lg"
          btnClass="text-gray-500 dark:text-gray-400  rounded-lg text-sm p-2.5"
        >
          <img
            src="/images/sun.png"
            slot="lightIcon"
            class="w-32 object-cover"
            alt=""
          />
          <img
            src="/images/moon.png"
            slot="darkIcon"
            class="w-32 object-cover"
            alt=""
          />
        </DarkMode>
      </NavUl>
    </NavContainer>
  </Navbar>

  <div
    class="w-24 h-24 rounded-full border border-[#24b97d] bg-[#24b97d7e] dark:bg-[#11433A] hidden md:flex justify-center items-center text-4xl text-white"
  >
    {$authStore?.name
      ?.split(" ")
      .map((word) => word.charAt(0))
      .join("") ?? "SM"}
  </div>
</div>
