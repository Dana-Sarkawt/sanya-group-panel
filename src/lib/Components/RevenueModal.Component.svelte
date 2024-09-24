<script lang="ts">
    import { Button, Modal } from "flowbite-svelte";
    export let revenueModal: boolean = false;
    import { Tabs, TabItem } from 'flowbite-svelte';
    import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  
   
  </script>
  
  <Modal size="xl" title="Revenue Modal" bind:open={revenueModal}>
   
    <Tabs
    defaultClass="flex flex-wrap space-x-2 rtl:space-x-reverse w-full flex justify-center items-center bg-transparent"
    style="backdrop-blur:blur(10px);"
    id="modalHeader"
    divider={false}
    contentClass="p-4 bg-gray-50 rounded-lg bg-transparent mt-4"
    activeClasses="p-4 rounded-full bg-green-600 text-white"
    inactiveClasses="p-4 dark:text-white text-black  rounded-full hover:text-white "
    >
        <TabItem open title="Income">
          <div class="w-full h-auto bg-[#ffffff] dark:bg-[#081c18] rounded-b-xl">
            <Table striped={true}>
              <TableHead theadClass="bg-white dark:bg-[#212121] text-center">
                <TableHeadCell>Income Date</TableHeadCell>
                <TableHeadCell>Price</TableHeadCell>
              </TableHead>
              <TableBody tableBodyClass="divide-y text-center">
                <!-- {#if capitals.count !== 0}
                  {#each capitals.data as capital} -->
                    <TableBodyRow>
                      <TableBodyCell>a</TableBodyCell>
                      <TableBodyCell>45 000</TableBodyCell>
                    </TableBodyRow>
                  <!-- {/each}
                {/if} -->
              </TableBody>
            </Table>
          </div>
        </TabItem>


        <TabItem title="Outcome">
          <div class="w-full h-auto bg-[#ffffff] dark:bg-[#081c18] rounded-b-xl">
            <Table striped={true}>
              <TableHead theadClass="bg-white dark:bg-[#212121] text-center">
                <TableHeadCell>Outcome Date</TableHeadCell>
                <TableHeadCell>Price</TableHeadCell>
              </TableHead>
              <TableBody tableBodyClass="divide-y text-center">
                <!-- {#if capitals.count !== 0}
                  {#each capitals.data as capital} -->
                    <TableBodyRow>
                      <TableBodyCell>b</TableBodyCell>
                      <TableBodyCell>20 000</TableBodyCell>
                    </TableBodyRow>
                  <!-- {/each}
                {/if} -->
              </TableBody>
            </Table>
          </div>
        </TabItem>
       
      </Tabs>

    <svelte:fragment slot="footer">
      <!-- <Button
        class="w-full h-12 bg-red-500 dark:bg-red-500 hover:bg-red-400 dark:hover:bg-red-400 rounded-xl duration-300 ease-in-out"
        >No</Button
      >
      <Button
        class="w-full h-12 bg-green-500 dark:bg-green-500 hover:bg-green-400 dark:hover:bg-green-400 rounded-xl duration-300 ease-in-out"
       >Yes</Button
      > -->
    </svelte:fragment>
  </Modal>
  