<script lang="ts">
  import InboxTable from "$lib/Components/ResponsiveTable/InboxTable.Component.svelte";
  import { _ } from "svelte-i18n";
</script>

<div class="w-full h-auto flex justify-center items-center">
  <div class="flex w-full justify-center items-center h-auto flex-col lg:mx-24">
    <div
      class="flex h-[100vh] w-full flex-col justify-start items-center mt-20"
      id="subDiv"
    >
      <InboxTable />
    </div>
  </div>
</div>

<style>
  .loaderPink {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    border: 10px solid;
    border-color: #2875fa1d #2875fa39 #2875fa58 #2875fa7b;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
