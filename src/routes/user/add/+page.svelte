<script lang="ts">
  import { phone } from "phone";
  import { goto } from "$app/navigation";
  import { User } from "$lib/Models/Request/User.Request.Model";
  import { authStore } from "$lib/Store/Auth.Store";
  import { Email } from "$lib/Utils/Regex/Email.Regex";
  import { Phone } from "$lib/Utils/Regex/Phone.Regex";
  import type { PageData } from "./$types";
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import { Spinner } from 'flowbite-svelte';
  import { toastStore } from "$lib/Store/Toast.Store";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
  const userRequest = $state(new User.Create());
  let isLoading = $state(false);

  async function addUser(request: User.Create) {
    if (isLoading) return;
    isLoading = true;
    try {
      if (!phone(request.phone, { country: "IQ" }).isValid) {
        toastStore.error($_("invalid-phone-number"));
        throw new Error($_("invalid-phone-number"));
      }
      const phoneData = phone(request.phone, { country: "IQ" })
        .phoneNumber as string;
      if (!Email.test(request.email)) {
        toastStore.error($_("invalid-email"));
        throw new Error($_("invalid-email"));
      }
      const response = await authStore.create({ ...request, phone: phoneData });
      if (!response || response.error) {
        toastStore.error($_("failed-to-add-user"));
        throw new Error($_("failed-to-add-user"));
      }
      goto("/user/0");
    } catch (error) {
      toastStore.error($_("failed-to-add-user"));
    } finally {
      isLoading = false;
    }
  }

  function phoneField(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let currentValue = inputElement.value;

    // Remove non-digit characters
    currentValue = currentValue.replace(/\D/g, "");

    // Check the length of the input value
    if (currentValue.length > 11) {
      currentValue = currentValue.slice(0, 11);
    }

    // Update the input value
    inputElement.value = currentValue;
  }
</script>

<div class="w-full h-auto flex justify-center items-center md:px-44">
  <a href="/user/0">
    <p
      class="w-24 h-12 rounded-xl flex justify-center items-center bg-green-700 hover:bg-green-500 text-white duration-300 ease-in-out"
    >
      {$_("back")}  
    </p>
  </a>

  <p
    class="w-full h-auto text-2xl md:text-4xl dark:text-white text-center my-12"
  >
    {$_("add-user")}
  </p>
</div>

<div class="w-full h-auto flex justify-center items-center">
  <div
    class="w-[90%] md:w-[50%] h-auto p-10 bg-[#94DCBA] dark:bg-[#11433A] border border-[#11433A] dark:border-[#94DCBA] rounded-xl flex flex-col justify-center items-center gap-6"
  >
    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">{$_("name")}</p>
      <input
        type="text"
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={userRequest.name}
      />
    </div>

    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">{$_("phone")}</p>

      <div
        class="w-full bg-[#daffee] dark:bg-[#0d2621] flex rounded-xl border-0 dark:text-white"
      >
        <input
          type="text"
          class="phone-input w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white focus:ring-1 {userRequest.phone
            ? Phone.test(userRequest.phone)
              ? 'focus:ring-green-500'
              : 'focus:ring-red-500'
            : 'focus:ring-0'}"
          bind:value={userRequest.phone}
          oninput={phoneField}
        />

        <div class="w-auto h-auto flex justify-center items-center px-2">
          <img
            src="/images/{userRequest.phone
              ? Phone.test(userRequest.phone)
                ? 'check.png'
                : 'cross.png'
              : 'question.png'}"
            class="w-6 h-6 object-contain"
            alt=""
          />
        </div>
      </div>
    </div>

    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">{$_("email")}</p>
      <div
        class="w-full bg-[#daffee] dark:bg-[#0d2621] flex rounded-xl border-0 dark:text-white"
      >
        <input
          type="text"
          class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white focus:ring-1 {userRequest.email
            ? Email.test(userRequest.email)
              ? 'focus:ring-green-500'
              : 'focus:ring-red-500'
            : 'focus:ring-1'}"
          bind:value={userRequest.email}
        />

        <div class="w-auto h-auto flex justify-center items-center px-2">
          <img
            src="/images/{userRequest.email
              ? Email.test(userRequest.email)
                ? 'check.png'
                : 'cross.png'
              : 'question.png'}"
            class="w-6 h-6 object-contain"
            alt=""
          />
        </div>
      </div>
    </div>

    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">{$_("password")}</p>
      <input
        type="password"
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={userRequest.password}
      />
    </div>

    <div class="w-full h-auto flex flex-col justify-center items-start">
      <p class="dark:text-white">{$_("role")}</p>
      <select
        name=""
        id=""
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={userRequest.role}
      >
        {#if data.roles}
          <option value="">{$_("none")}</option>
          {#each data.roles.data as role}
            <option value={role.id}>{role.name}</option>
          {/each}
        {/if}
      </select>
    </div>

    <button
      class="w-full h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
      onclick={() => addUser(userRequest)}
      disabled={isLoading}
    >
      {#if isLoading}
        <Spinner size="6" color="white" />
      {:else}
        {$_("add-user")}
      {/if}
    </button>
  </div>
</div>
