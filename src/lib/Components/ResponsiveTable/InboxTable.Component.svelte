<script lang="ts">
  import { _ } from "svelte-i18n";
  import { inboxStore } from "$lib/Store/Inbox.Store";
  import { onMount } from "svelte";
  import type { Store } from "$lib/Models/Response/Store.Response.Model";
  import type { Database } from "$lib/Supabase/Types/database.types";

  export const inboxes: Store<Database["public"]["Tables"]["Inbox"]["Row"]> = {
    data: [],
    count: 0,
  };

  let isMobile: boolean;

  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth <= 768;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  });

  async function handleDelete(id: number) {
    if (confirm($_("confirm-delete"))) {
      await inboxStore.delete(id);
    }
  }
</script>

{#if isMobile}
  {#each inboxes.data as item (item.id)}
    <div class="bg-white dark:bg-[#081c18] shadow-md rounded-lg p-4 mb-4">
      <p><strong>{$_("title")}:</strong> {item.title}</p>
      <p>
        <strong>{$_("description")}:</strong>
        {item.description || $_("not-available")}
      </p>
      <div class="mt-2 flex justify-end space-x-2">
        <a
          href={`/inbox/edit/${item.id}`}
          class="bg-blue-500 text-white px-2 py-1 rounded">{$_("edit")}</a
        >
        <button
          on:click={() => handleDelete(item.id)}
          class="bg-red-500 text-white px-2 py-1 rounded">{$_("delete")}</button
        >
      </div>
    </div>
  {/each}
{:else}
  <table class="min-w-full bg-white dark:bg-[#081c18]">
    <thead>
      <tr>
        <th
          class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >{$_("title")}</th
        >
        <th
          class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >{$_("description")}</th
        >
        <th
          class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >{$_("actions")}</th
        >
      </tr>
    </thead>
    <tbody>
      {#each inboxes.data as item (item.id)}
        <tr>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"
            >{item.title}</td
          >
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500"
            >{item.description || $_("not-available")}</td
          >
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <div class="flex items-center space-x-2">
              <a
                href={`/inbox/edit/${item.id}`}
                class="bg-blue-500 text-white px-2 py-1 rounded">{$_("edit")}</a
              >
              <button
                on:click={() => handleDelete(item.id)}
                class="bg-red-500 text-white px-2 py-1 rounded"
                >{$_("delete")}</button
              >
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
