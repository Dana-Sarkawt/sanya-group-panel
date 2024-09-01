<script lang="ts">
  import { ImageCommon } from "$lib/Models/Common/Image.Common.Model";
  import { Dropzone } from "flowbite-svelte";

  export let image: ImageCommon | undefined = new ImageCommon();

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    image!.file = file;
    image!.localUrl = URL.createObjectURL(file);
  }
</script>

<Dropzone
  id="dropzone"
  on:change={handleFileChange}
  accept="image/png, image/jpeg, image/svg"
  defaultClass="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:border-gray-500 dark:hover:bg-[#123b34]-600 dark:bg-[#123b34] hover:opacity-70 hover:bg-[#123b34] dark:border-[#318f7f]"
>
 
  {#if image?.file && image.file.size > 0 && image?.localUrl}
    <img src={image.localUrl} alt={image.file.name} class="w-full object-contain h-[252px] rounded-lg"/>
  {:else}
  <svg
  aria-hidden="true"
  class="mb-3 w-10 h-10 text-gray-400"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  ><path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
  /></svg
>
    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
      <span class="font-semibold">Click to upload</span> or drag and drop
    </p>
    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
  {/if}
</Dropzone>
