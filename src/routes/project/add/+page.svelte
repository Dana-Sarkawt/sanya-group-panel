<script lang="ts">
  import { storageStore } from "$lib/Store/Storage.Store";
  import { ImageCommon } from "$lib/Models/Common/Image.Common.Model";
  import { goto } from "$app/navigation";
  import { projectStore } from "$lib/Store/Project.Store";
  import { Status } from "$lib/Models/Enum/Status.Enum.Model";
  import { Project } from "$lib/Models/Request/Project.Request.Model";
  import ImageField from "$lib/Components/ImageField.Component.svelte";
  import { _ } from "svelte-i18n";
  const projectRequest = new Project.Create();
  const image = new ImageCommon();

  async function addProject(request: Project.Create) {
    try {
      if(image.file && image.file.size > 0) {
        const response = await storageStore.uploadImage(image.file);
        if (!response) {
          throw new Error("Failed to upload image");
        }
        request.image = response;
      }
      const response = await projectStore.create(request);
      if (!response) {
        throw new Error("Failed to create project");
      }
      goto(`/project/0`);
    } catch (error) {
      console.log(error);
    }
  }
</script>

<div class="w-full h-auto flex justify-center items-center md:px-44">
  <a href="/project/0">
    <p
      class="w-24 h-12 rounded-xl flex justify-center items-center bg-green-700 hover:bg-green-500 text-white duration-300 ease-in-out"
    >
      {$_("back")}
    </p>
  </a>

  <p
    class="w-full h-auto text-2xl md:text-4xl dark:text-white text-center my-12"
  >
    {$_("add-project")}
  </p>
</div>

<div class="w-full h-auto flex justify-center items-center">
  <div
    class="w-[90%] md:w-[50%] h-auto p-10 bg-[#94DCBA] dark:bg-[#11433A] border border-[#11433A] dark:border-[#94DCBA] rounded-xl flex flex-col justify-center items-center gap-6"
  >
    <ImageField {image} />
    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">{$_("project-name")}</p>
      <input
        type="text"
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={projectRequest.name}
      />
    </div>

    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">{$_("status")}</p>
      <select
        name=""
        id=""
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={projectRequest.status}
      >
        {#each Object.values(Status) as key, value}
          <option value={key}>{key}</option>
        {/each}
      </select>
    </div>

    <button
      class="w-full h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white duration-300 ease-in-out"
      on:click={async () => addProject(projectRequest)}
    >
      {$_("add-project")}
    </button>
  </div>
</div>
