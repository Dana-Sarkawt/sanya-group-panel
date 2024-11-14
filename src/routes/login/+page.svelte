<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { Authentication } from "$lib/Models/Request/Authentication.Request.Model";
  import { authStore } from "$lib/Store/Auth.Store";
  import { _ } from "svelte-i18n";

  const loginRequest = $state(new Authentication.Login());

  onMount(async () => {
    await checkAuth();
  });

  async function login(request: Authentication.Login) {
    try {
      const response = await authStore.login(request.email, request.password);
      if (!response) {
        throw new Error("Invalid credentials");
      }
      checkAuth();
    } catch (error) {
      console.log(error);
    }
  }

  async function checkAuth() {
    const response = await authStore.get();
    if (response) {
      goto("/");
    } else {
      goto("/login");
    }
  }
</script>

<p class="w-full h-auto text-4xl dark:text-white text-center my-12 font-bold">
  Sanay Group
</p>

<div class="w-full h-auto flex justify-center items-center">
  <div
    class="w-[90%] md:w-[50%] h-auto p-10 bg-[#94DCBA] dark:bg-[#11433A] border border-[#11433A] dark:border-[#94DCBA] rounded-xl flex flex-col justify-center items-center gap-6"
  >
    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">{$_("email")}</p>
      <input
        dir="ltr"
        type="text"
        bind:value={loginRequest.email}
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
      />
    </div>

    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">{$_("password")}</p>
      <input
        dir="ltr"
        type="password"
        bind:value={loginRequest.password}
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
      />
    </div>

    <!-- <div class="w-full h-auto flex flex-col justify-center items-start">
            <p class="dark:text-white">Role</p>
            <select name="" id="" class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white">
                <option value="">Super Admin</option>
                <option value="">Admin</option>
            </select>
        </div> -->

    <button
      class="w-full h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white duration-300 ease-in-out"
      onclick={() => login(loginRequest)}
    >
      {$_("login")}
    </button>
  </div>
</div>
