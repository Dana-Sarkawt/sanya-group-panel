<script lang="ts">
  import { Modal, Img } from "flowbite-svelte";
  import { _ } from "svelte-i18n";

  interface Props {
    image?: string;
    open?: boolean;
  }

  let { image = $bindable(""), open = $bindable(false) }: Props = $props();
</script>

<Modal bind:open size="lg" outsideclose={true}>
  {@render header()}
  <div
    class="w-full h-auto flex justify-center items-center bg-transparent rounded-xl"
  >
    <Img src={image} alt={$_("image")} class="rounded-xl" />
  </div>
</Modal>

{#snippet header()}
  <div class="w-full h-auto flex justify-end items-center">
    <h1>{$_("image-view")}</h1>
  </div>
{/snippet}
