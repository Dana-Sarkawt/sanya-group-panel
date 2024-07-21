<script>
      import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
  import { ChevronDownOutline } from 'flowbite-svelte-icons';
  import { DarkMode } from 'flowbite-svelte';
  import { ThumbsUpSolid, ThumbsDownSolid } from 'flowbite-svelte-icons';
  import { page } from '$app/stores';
  $: activeUrl = $page.url.pathname;
  </script>

<Navbar let:NavContainer class="bg-transparent dark:bg-transparent">
    <NavContainer class="border px-5 h-26 rounded-lg md:rounded-full border-[#24b97d] bg-[#24b97d7e] text-white">
      <NavBrand href="/">
        <!-- <img src="/images/flowbite-svelte-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
        <span class="self-center whitespace-nowrap text-xl font-semibold text-[#104e35] dark:text-white">Sanya Group</span>
      </NavBrand>
      <NavHamburger menuClass="text-[#104e35] dark:text-white"/>
      <NavUl nonActiveClass="text-[#104e35] dark:text-white" ulClass="bg-transparent dark:bg-transparent md:bg-transparent dark:md:bg-transparent border-0 mt-4  flex items-center flex-col p-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium">
        <NavLi class="cursor-pointer">
            Company<ChevronDownOutline class="w-6 h-6 ms-2 text-[#104e35] dark:text-white inline" />
          </NavLi>
          <Dropdown class="w-44 z-20">
            <DropdownItem href="/">Project</DropdownItem>
            <DropdownItem >
                <NavLi class="cursor-pointer text-black dark:text-white">
                    Expenses<ChevronDownOutline class="w-6 h-6 ms-2 text-green-500  inline" />
                  </NavLi>

                  <Dropdown class="w-44 z-20">

                    <DropdownItem href="/">Daily</DropdownItem>
                    <DropdownItem href="/">Worker</DropdownItem>
                    <DropdownItem href="/">Preparation</DropdownItem>
                  </Dropdown>
            </DropdownItem>
            <DropdownItem href="/">Capital</DropdownItem>
            <DropdownItem href="/">Sales</DropdownItem>
          </Dropdown>

        <NavLi href="/user/1">Users</NavLi>
        <NavLi href="/docs/components/navbar">Setting</NavLi>
        <NavLi href="/pricing">Logout</NavLi>


        <DarkMode class="text-lg" btnClass = 'text-gray-500 dark:text-gray-400  rounded-lg text-sm p-2.5'>
            <img src="/images/sun.png" slot="lightIcon" class="w-32  object-cover" alt="">
            <img src="/images/moon.png" slot="darkIcon" class="w-32 object-cover" alt="">
        </DarkMode>


      </NavUl>
    </NavContainer>
  </Navbar>