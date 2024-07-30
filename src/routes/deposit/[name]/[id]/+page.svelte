<script lang="ts">
  import { depositStore } from "$lib/Store/Deposit.Store";
  import { page } from "$app/stores";
  import DeleteModal from "$lib/Components/DeleteModal.Component.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  let deleteModal = false;
  let deleteId: number = 0;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="w-full h-auto flex justify-center items-center md:px-44">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <a on:click={()=> window.history.back()} class="cursor-pointer">
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
      Deposit Table
    </div>

    <div
      class="flex h-16 w-full items-center rounded-t-lg p-2 dark:bg-[#081c18] bg-[#ffffff] justify-between"
    >
      <p
        class="h-12 w-auto flex justify-center items-center px-4 rounded-xl bg-[#D3F9E9] dark:bg-[#11433A] dark:text-white"
      >
        <span class="text-[#1e4f3b] dark:text-[#54cc9c] pr-4 font-bold"
          >Total:</span
        >
        {Number(
          data.deposits?.data.reduce(
            (total, deposit) => total + deposit.price,
            0
          )
        ).toFixed(2)}
      </p>
      <a href="/deposit/{$page.params.name}/{$page.params.id}/add">
        <button
          class="h-12 rounded-lg bg-[#24b97d] px-4 text-white"
          style="box-shadow:0 1px 8px 0px #24b97d;"
          ><span>+</span> Add Deposit</button
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
          {#if data.deposits?.count !== 0 && data.deposits?.data}
            {#each data.deposits.data as deposit}
              <tr>
                <td>{deposit.description}</td>
                <td>{deposit.price}</td>
                <td>{deposit.date}</td>

                <td>
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <!-- svelte-ignore a11y-no-static-element-interactions -->
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <div
                    class="flex h-auto w-auto items-center justify-center gap-2"
                  >
                    <a
                      href="/deposit/{$page.params.name}/{$page.params
                        .id}/edit/{deposit.id}"
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
                      on:click={() => {
                        deleteModal = true;
                        deleteId = deposit.id;
                      }}
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
<DeleteModal bind:deleteModal Store={depositStore} id={deleteId} />
