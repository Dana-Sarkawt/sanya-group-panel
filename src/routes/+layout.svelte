<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/Components/Navbar.Component.svelte";
  import { goto, invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { authStore } from "$lib/Store/Auth.Store";
  $: activeUrl = $page.url.pathname;

  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
      checkAuth();
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });
    return () => data.subscription.unsubscribe();
  });

  async function checkAuth() {
    const response = await authStore.get();
    if (!response) {
      goto("/login");
    }
  }
</script>

{#if activeUrl !== "/login"}
  <Navbar />
{/if}
<slot></slot>
