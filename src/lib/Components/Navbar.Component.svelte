<script>
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
  } from "flowbite-svelte";
  import { DarkMode } from "flowbite-svelte";
  import { authStore } from "$lib/Store/Auth.Store";
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
        <NavLi href="/project/0">Project</NavLi>
        <NavLi href="/user/1">Users</NavLi>
        <NavLi href="/setting">Setting</NavLi>
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
