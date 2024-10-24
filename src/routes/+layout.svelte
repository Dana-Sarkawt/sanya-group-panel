<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/Components/Navbar.Component.svelte";
  import { goto, invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { authStore } from "$lib/Store/Auth.Store";
  import { locale } from "svelte-i18n";
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
<div dir={$locale === "en" ? "ltr" : "rtl"}>
  <slot></slot>
</div>
