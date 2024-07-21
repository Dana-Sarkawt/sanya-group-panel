<script>
      import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
  import { ChevronDownOutline } from 'flowbite-svelte-icons';
  import { page } from '$app/stores';
  $: activeUrl = $page.url.pathname;
  </script>

<Navbar let:NavContainer >
    <NavContainer class="border px-5 py-2 rounded-lg bg-[#24b97d] text-white">
      <NavBrand href="/">
        <!-- <img src="/images/flowbite-svelte-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
        <span class="self-center whitespace-nowrap text-xl font-semibold text-white">Sanya Group</span>
      </NavBrand>
      <NavHamburger/>
      <NavUl nonActiveClass="text-white" ulClass="bg-[#198359] md:bg-transparent border-0 mt-4  flex flex-col p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium">
        <NavLi class="cursor-pointer">
            Company<ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white inline" />
          </NavLi>
          <Dropdown class="w-44 z-20">
            <DropdownItem href="/">Project</DropdownItem>
            <DropdownItem >
                <NavLi class="cursor-pointer text-black">
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

        <NavLi href="/about">Users</NavLi>
        <NavLi href="/docs/components/navbar">Setting</NavLi>
        <NavLi href="/pricing">Logout</NavLi>
      </NavUl>
    </NavContainer>
  </Navbar>