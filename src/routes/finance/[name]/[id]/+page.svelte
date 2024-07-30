<script lang="ts">
  import { page } from "$app/stores";
  import DeleteModal from "$lib/Components/DeleteModal.Component.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  let deleteModal = false;
</script>

<div class="w-full h-auto flex justify-center items-center md:px-44">
  <a href="/project/1/0">
    <p
      class="w-24 h-12 rounded-xl flex justify-center items-center bg-green-700 hover:bg-green-500 text-white duration-300 ease-in-out"
    >
      Back
    </p>
  </a>

  <p
    class="w-full h-auto text-2xl md:text-4xl dark:text-white text-center my-12"
  ></p>
</div>


<div class=" w-full h-auto flex justify-center items-center">
  <div
    class="  flex h-[100vh] w-full flex-col justify-start items-center lg:mx-24"
    id="subDiv"
  >
    <div
      class="flex h-24 w-full items-center justify-start pl-2 text-4xl text-[#0F4E35] dark:text-white font-bold"
    >
      Financial Table
    </div>

    <div
      class="flex h-16 w-full items-center justify-end rounded-t-lg p-2 dark:bg-[#081c18] bg-[#ffffff]"
    >
      <a href="/finance/{$page.params.name}/{$page.params.id}/add">
        <button
          class="h-12 rounded-lg bg-[#24b97d] px-4 text-white"
          style="box-shadow:0 1px 8px 0px #24b97d;"
          ><span>+</span> Add Financial</button
        >
      </a>
    </div>

    <!---  START TABLE  -->

    <div class="w-full h-auto flex justify-center items-center mx-2">
      <table class="table w-full text-white text-[5px] md:text-lg rounded-xl">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {#if data.financialDues?.count !== 0 && data.financialDues?.data}
            {#each data.financialDues.data as financial}
              <tr>
                <td>{financial.description}</td>
                <td>{financial.price}</td>
                <td>{financial.date}</td>

                <td>
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <!-- svelte-ignore a11y-no-static-element-interactions -->
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <div
                    class="flex h-auto w-auto items-center justify-center gap-2"
                  >
                    <a
                      href="/finance/edit/{financial.id}"
                      class="bg-green-600 hover:bg-green-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
                    >
                      <img
                        src="/images/edit.png"
                        class="w-4 h-4 md:h-8 md:w-8 object-contain"
                        alt=""
                      />
                    </a>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <a
                      class="bg-red-600 hover:bg-red-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
                      on:click={() => (deleteModal = true)}
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
            {/each}
          {/if}
        </tbody>
      </table>
    </div>

    <!---  END TABLE  -->

    <div class="w-full h-auto flex justify-center items-center py-12">
      <!-- <Pagination
      classType={typeof data.projects}
      StoreData={data.projects}
      currentPage={Number($page.params.page)}
      name={"project"}
    /> -->
    </div>
  </div>
</div>
<DeleteModal bind:deleteModal />
