<script lang="ts">
  import { Email } from "$lib/Utils/Regex/Email.Regex";
  import { roleStore } from "$lib/Store/Role.Store";
  import { userStore } from "$lib/Store/User.Store";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { User } from "$lib/Models/Request/User.Request.Model";
  import { onMount } from "svelte";
  import { Phone } from "$lib/Utils/Regex/Phone.Regex";
  import { phone } from "phone";
  import { _ } from "svelte-i18n";
  import { Spinner } from 'flowbite-svelte';
  let userRequest = new User.Update();
  let isLoading = false;

  onMount(async () => {
    const user = await userStore.get(Number($page.params.id));
    await roleStore.getAll();
    if (!user) {
      throw new Error("Failed to fetch user");
    }
    userRequest = {
      ...userRequest,
      name: user.data.name as string,
      phone: user.data.phone.replace("+964", "0") as string,
      email: user.data.email as string,
      role: user.data.role as number,
      id: user.data.id,
    };
  });

  async function updateUser(request: User.Update) {
    if (isLoading) return;
    isLoading = true;
    try {
      if (!phone(request.phone, { country: "IQ" }).isValid) {
        throw new Error("Invalid phone number");
      }
      const phoneData = phone(request.phone, { country: "IQ" })
        .phoneNumber as string;
      if (!Email.test(request.email)) {
        throw new Error("Invalid email");
      }
      const response = await userStore.update({ ...request, phone: phoneData });
      if (!response) {
        throw new Error("Failed to update user");
      }
      goto(`/user/0`);
    } catch (error) {
      console.log(error);
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
    {$_("update-user")}
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
          on:input={phoneField}
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
      <p class="dark:text-white">{$_("role")}</p>
      <select
        name=""
        id=""
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={userRequest.role}
      >
        {#if $roleStore.data}
          {#each $roleStore.data as key, value}
            <option value={key.id}>{key.name}</option>
          {/each}
        {/if}
      </select>
    </div>

    <button
      class="w-full h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
      on:click={() => updateUser(userRequest)}
      disabled={isLoading}
    >
      {#if isLoading}
        <Spinner size="6" color="white" />
      {:else}
        {$_("update-user")}
      {/if}
    </button>
  </div>
</div>
