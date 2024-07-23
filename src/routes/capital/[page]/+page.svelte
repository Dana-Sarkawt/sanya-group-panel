<script lang="ts">

import CapitalTable from '$lib/Components/Tables/Capital.Table.Component.svelte';    
        import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
        let dropDownOpen = false;
        let openSearch = false;
        let search: string = '';
        // let filter: Filtration<ApolloRequestModels.ApolloGet> = {
        // 	limit: 10,
        // 	page: 0,
        // 	options: new ApolloRequestModels.ApolloGet()
        // };
    </script>
    
    
    <div class=" w-full h-auto flex justfiy-center items-center ">
    
        <div
            class="  flex h-[100vh] w-full flex-col justify-start items-center lg:mx-24"
            id="subDiv"
        >
            <div class="flex h-24 w-full items-center justify-start pl-2 text-4xl text-[#0F4E35] dark:text-white font-bold " >
                Capital Table
            </div>
        
            <div
                    class="flex h-16 w-full items-center justify-end rounded-t-lg  p-2 dark:bg-[#081c18] bg-[#ffffff]"
            >
                <!-- <div class="flex h-auto w-auto items-center justify-center gap-2"> -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <!-- <img
                        src="/images/search.png"
                        class="h-8 w-8 cursor-pointer object-contain duration-300 ease-in-out"
                        alt=""
                        
                    />
                    <input
                        type="text"
                        class="h-12 rounded-lg bg-[#F7F6FE] duration-300 ease-in-out dark:border dark:border-[#393C49] dark:bg-[#221F4A] dark:text-white {!openSearch
                            ? 'hidden'
                            : ''} disabled:opacity-50"
                        placeholder="Search..."
                        bind:value={search}
                    />
        
                    <Button
                        on:click={() => (dropDownOpen = !dropDownOpen)}
                        class="h-12 gap-4 bg-[#ED7F22] dark:border dark:border-[#393C49] dark:bg-[#221F4A] "
                        ><div class="h-6 w-6 object-contain dark:h-4 dark:w-4" id="filter-btn"></div>
                        
                        <div class="h-4 w-4 object-contain" id="dropDown-btn"></div></Button
                    >
                    <Dropdown open={dropDownOpen}>
                            <DropdownItem
                                >test</DropdownItem
                            >
                    </Dropdown>
                </div> -->
        
                <a href="/capital/add">
                    <button
                        class="h-12 rounded-lg bg-[#24b97d] px-4 text-white"
                        style="box-shadow:0 1px 8px 0px #24b97d;"><span>+</span> Add Capital</button
                    >
                </a>
            </div>
        
        
        <CapitalTable/>
        
        </div>
    </div>
    