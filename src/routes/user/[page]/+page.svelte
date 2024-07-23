<script lang="ts">
	import { userStore } from '$lib/Store/User.Store';
  import type { PageData } from "./$types";
  import UserTable from "$lib/Components/Tables/User.Table.Component.svelte";
  import Pagination from "$lib/Components/Pagination.Component.svelte";
  export let data: PageData;
</script>

<div class=" w-full h-auto flex justfiy-center items-center">
  <div
    class="  flex h-[100vh] w-full flex-col justify-start items-center lg:mx-24"
    id="subDiv"
  >
    <div
      class="flex h-24 w-full items-center justify-start pl-2 text-4xl text-[#0F4E35] dark:text-white font-bold"
    >
      Users Table
    </div>

    <div
      class="flex h-16 w-full items-center justify-end rounded-t-lg p-2 dark:bg-[#081c18] bg-[#ffffff]"
    >
      <a href="/user/add">
        <button
          class="h-12 rounded-lg bg-[#24b97d] px-4 text-white"
          style="box-shadow:0 1px 8px 0px #24b97d;"
          ><span>+</span> Add User</button
        >
      </a>
    </div>
    <UserTable bind:users={data.users} />
  </div>
</div>


<!-- <Pagination {...data} classType={/* provide the classType value */} Store={/* provide the Store value */} StoreData={/* provide the StoreData value */} currentPage={/* provide the currentPage value */} /> -->


/>