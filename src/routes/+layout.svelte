<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/Components/Navbar.Component.svelte";
  import { goto, invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  $: activeUrl = $page.url.pathname;

  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });
    return () => data.subscription.unsubscribe();
  });


</script>

<Navbar />
<slot></slot>
