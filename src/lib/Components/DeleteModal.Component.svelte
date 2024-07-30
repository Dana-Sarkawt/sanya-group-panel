<script lang="ts">
  import { Button, Modal } from "flowbite-svelte";
  export let deleteModal: boolean = false;
  export let Store: any;
  export let id: number = 0;

  async function deleteStore() {
    try {
      await Store.delete(id);
      // window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      deleteModal = false;
    }
  }
</script>

<Modal title="Delete Alert" bind:open={deleteModal}>
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
    Do you want to <span class="text-red-500">delete</span> this?
  </p>
  <svelte:fragment slot="footer">
    <Button
      class="w-full h-12 bg-red-500 dark:bg-red-500 hover:bg-red-400 dark:hover:bg-red-400 rounded-xl duration-300 ease-in-out"
      >No</Button
    >
    <Button
      class="w-full h-12 bg-green-500 dark:bg-green-500 hover:bg-green-400 dark:hover:bg-green-400 rounded-xl duration-300 ease-in-out"
      on:click={deleteStore}>Yes</Button
    >
  </svelte:fragment>
</Modal>
