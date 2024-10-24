<script lang="ts">
  import { Modal, Img } from "flowbite-svelte";
  import { _ } from "svelte-i18n";

  export let image: string = "";
  export let open = false;
</script>

<Modal bind:open size="xl" outsideclose={true}>
  <svelte:fragment slot="header">
    <div class="w-full h-auto flex justify-end items-center">
      <h1>{$_("image-view")}</h1>
    </div>
  </svelte:fragment>
  <div
    class="w-full h-auto flex justify-center items-center bg-transparent rounded-xl"
  >
    <Img src={image} alt={$_("image")} class="rounded-xl" />
  </div>
</Modal>
