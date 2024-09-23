<script lang="ts">
    import { Button, Modal } from "flowbite-svelte";
    export let revenueModal: boolean = false;
    import { Tabs, TabItem } from 'flowbite-svelte';
  
   
  </script>
  
  <Modal size="xl" title="Revenue Modal" bind:open={revenueModal}>
   
    <Tabs>
        <TabItem open title="Income">
          <p class="text-sm text-gray-500 dark:text-gray-400">
           test1
          </p>
        </TabItem>
        <TabItem title="Outcome">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            test2
          </p>
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
  