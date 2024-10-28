<script lang="ts">
  import { goto } from "$app/navigation";
  import { inboxStore } from "$lib/Store/Inbox.Store";
  import { Inbox } from "$lib/Models/Request/Inbox.Request.Model";
  import { _ } from "svelte-i18n";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  const inboxRequest = new Inbox.Update();
  const id = Number($page.params.id);

  onMount(async () => {
    try {
      const response = await inboxStore.get(id);
      if (!response || !response.data) {
        throw new Error("Failed to get inbox item");
      }
      inboxRequest.id = response.data.id;
      inboxRequest.title = response.data.title;
      inboxRequest.description = response.data.description;
    } catch (error) {
      console.log(error);
    }
  });

  async function updateInbox(request: Inbox.Update) {
    try {
      const response = await inboxStore.update(request);
      if (!response) {
        throw new Error("Failed to update inbox item");
      }
      goto(`/inbox/0`);
    } catch (error) {
      console.log(error);
    }
  }
</script>

<div class="w-full h-auto flex justify-center items-center md:px-44">
  <a href="/inbox/0">
    <p
      class="w-24 h-12 rounded-xl flex justify-center items-center bg-green-700 hover:bg-green-500 text-white duration-300 ease-in-out"
    >
      {$_("back")}
    </p>
  </a>

  <p
    class="w-full h-auto text-2xl md:text-4xl dark:text-white text-center my-12"
  >
    {$_("edit-inbox")}
  </p>
</div>

<div class="w-full h-auto flex justify-center items-center">
  <div
    class="w-[90%] md:w-[50%] h-auto p-10 bg-[#94DCBA] dark:bg-[#11433A] border border-[#11433A] dark:border-[#94DCBA] rounded-xl flex flex-col justify-center items-center gap-6"
  >
    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">{$_("inbox-title")}</p>
      <input
        type="text"
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={inboxRequest.title}
      />
    </div>

    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">{$_("description")}</p>
      <textarea
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        rows="4"
        bind:value={inboxRequest.description}
      />
    </div>

    <button
      class="w-full h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white duration-300 ease-in-out"
      on:click={async () => updateInbox(inboxRequest)}
    >
      {$_("update-inbox")}
    </button>
  </div>
</div>
