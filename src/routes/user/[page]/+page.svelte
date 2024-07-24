<script lang="ts">
	import { userStore } from '$lib/Store/User.Store';
  import type { PageData } from "./$types";
  import UserTable from "$lib/Components/ResponsiveTable/UserTable.Component.svelte";
  import Pagination from "$lib/Components/Pagination.Component.svelte";
  export let data: PageData;
</script>

<div class=" w-full h-auto flex justify-center items-center ">
  <div
    class="  flex h-[100vh] w-[90%] flex-col justify-start items-center "
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
    <!-- <UserTable bind:users={data.users} /> -->
    <UserTable bind:users={data.users} />

  </div>
</div>


<!-- <Pagination {...data} classType={/* provide the classType value */} Store={/* provide the Store value */} StoreData={/* provide the StoreData value */} currentPage={/* provide the currentPage value */} /> -->
















<!--   RESPONSIVE TABLE EXAMPLE   -->


<!-- <div class="w-full h-auto flex justify-center items-center mx-2">

  <table class="table w-full text-white text-[5px] md:text-lg rounded-xl">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Phone</th>
        <th scope="col">Email</th>
        <th scope="col">Email</th>
        <th scope="col">Email</th>
        <th scope="col">Email</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Mark</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>Otto</td>
        <td>Otto</td>
        <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit error expedita ut dolor voluptatem facere doloremque maiores libero qui, in excepturi eligendi blanditiis, perspiciatis numquam nostrum exercitationem. Doloribus, cumque tenetur!</td>
        <td>

          <div class="flex h-auto w-auto items-center justify-center gap-2">
            <a
              href="edit/1"
              class="bg-green-600 hover:bg-green-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
            >
              <img
                src="/images/edit.png"
                class="w-4 h-4 md:h-8 md:w-8 object-contain"
                alt=""
              />
            </a>
            <a
              href="edit/1"
              class="bg-red-600 hover:bg-red-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full" 
            >
              <img
                src="/images/delete.png"
                class="w-4 h-4 md:h-8 md:w-8 object-contain"
                alt=""
              />
            </a>
          </div>


        </td>
      </tr>
      <tr>
        <td>Jacob</td>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>Thornton</td>
        <td>Thornton</td>
        <td>Thornton</td>
        <td>

          <div class="flex h-auto w-auto items-center justify-center gap-2">
            <a
              href="edit/1"
              class="bg-green-600 hover:bg-green-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
            >
              <img
                src="/images/edit.png"
                class="w-4 h-4 md:h-8 md:w-8 object-contain"
                alt=""
              />
            </a>
            <a
              href="edit/1"
              class="bg-red-600 hover:bg-red-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full" 
            >
              <img
                src="/images/delete.png"
                class="w-4 h-4 md:h-8 md:w-8 object-contain"
                alt=""
              />
            </a>
          </div>



        </td>
      </tr>
      <tr>
        <td>Larry</td>
        <td>Larry</td>
        <td>Larry</td>
        <td>Larry</td>
        <td>Larry</td>
        <td>Larry</td>

        <td>
          <div class="flex h-auto w-auto items-center justify-center gap-2">
            <a
              href="edit/1"
              class="bg-green-600 hover:bg-green-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
            >
              <img
                src="/images/edit.png"
                class="w-4 h-4 md:h-8 md:w-8 object-contain"
                alt=""
              />
            </a>
            <a
              href="edit/1"
              class="bg-red-600 hover:bg-red-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full" 
            >
              <img
                src="/images/delete.png"
                class="w-4 h-4 md:h-8 md:w-8 object-contain"
                alt=""
              />
            </a>
          </div>

        </td>

      </tr>
    </tbody>
  </table>

</div> -->