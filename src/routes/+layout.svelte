<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/Components/Navbar.Component.svelte";
  import { goto, invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { authStore } from "$lib/Store/Auth.Store";
  import { locale } from "svelte-i18n";
  import { Toast } from "flowbite-svelte";
  import { toastStore } from "$lib/Store/Toast.Store";

  $: activeUrl = $page.url.pathname;

  export let data;
  let isLoading = true;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(() => {
    try {
      isLoading = true;
      const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
        checkAuth();
        if (newSession?.expires_at !== session?.expires_at) {
          invalidate("supabase:auth");
        }
      });
      return () => data.subscription.unsubscribe();
    } finally {
      isLoading = false;
    }
  });

  async function checkAuth() {
    const response = await authStore.get();
    if (!response) {
      goto("/login");
    }
  }
</script>

{#if activeUrl !== "/login"}
  <Navbar bind:isLoading />
{/if}

<!-- Toast Container -->
<div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
  {#each $toastStore as toast (toast.id)}
    <Toast
      color={toast.type === 'error' ? 'red' : 
            toast.type === 'success' ? 'green' : 
            toast.type === 'warning' ? 'yellow' : 'blue'}
      class="mb-2"
    >
      <svelte:fragment slot="icon">
        {#if toast.type === 'success'}
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
        {:else if toast.type === 'error'}
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        {/if}
      </svelte:fragment>
      {toast.message}
    </Toast>
  {/each}
</div>

<div dir={$locale === "en" ? "ltr" : "rtl"}>
  <slot />
</div>
