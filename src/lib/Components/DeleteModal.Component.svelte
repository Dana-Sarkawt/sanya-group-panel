<script lang="ts">
  import { Button, Modal } from "flowbite-svelte";
  import { _ } from "svelte-i18n";
  export let deleteModal: boolean = false;
  export let Store: any;
  export let id: number = 0;

  async function deleteStore() {
    try {
      await Store.delete(id);
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      deleteModal = false;
    }
  }
</script>

<Modal title="Delete Alert" bind:open={deleteModal}>
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
    <span class="text-red-500">{$_("do-you-want-to-delete")}</span>
  </p>
  <svelte:fragment slot="footer">
    <Button
      class="w-full h-12 bg-red-500 dark:bg-red-500 hover:bg-red-400 dark:hover:bg-red-400 rounded-xl duration-300 ease-in-out"
      on:click={() => {
        deleteModal = false;
      }}>{$_("no")}</Button
    >
    <Button
      class="w-full h-12 bg-green-500 dark:bg-green-500 hover:bg-green-400 dark:hover:bg-green-400 rounded-xl duration-300 ease-in-out"
      on:click={deleteStore}>{$_("yes")}</Button
    >
  </svelte:fragment>
</Modal>
