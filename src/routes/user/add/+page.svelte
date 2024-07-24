<script lang="ts">
  import { goto } from "$app/navigation";
  import { User } from "$lib/Models/Request/User.Request.Model";
  import { authStore } from "$lib/Store/Auth.Store";
  import type { PageData } from "./$types";
  export let data: PageData;
  const userRequest = new User.Create();

  async function addUser(request: User.Create) {
    try {
      const response = await authStore.create(request);
      if (!response || response.error) {
        throw new Error("Failed to add user");
      }
      goto("/user/1");
    } catch (error) {
      console.log(error);
    }
  }
</script>

<p class="w-full h-auto text-4xl dark:text-white text-center my-12">Add User</p>
<div class="w-full h-auto flex justify-center items-center">
  <div
    class="w-[90%] md:w-[50%] h-auto p-10 bg-[#94DCBA] dark:bg-[#11433A] border border-[#11433A] dark:border-[#94DCBA] rounded-xl flex flex-col justify-center items-center gap-6"
  >
    <div class="w-full h-auto flex flex-col justfiy-center items-start">
      <p class="dark:text-white">Name</p>
      <input
        type="text"
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={userRequest.name}
      />
    </div>

    <div class="w-full h-auto flex flex-col justfiy-center items-start">
      <p class="dark:text-white">Phone</p>
      <input
        type="text"
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={userRequest.phone}
      />
    </div>

    <div class="w-full h-auto flex flex-col justfiy-center items-start">
      <p class="dark:text-white">E-mail</p>
      <input
        type="text"
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={userRequest.email}
      />
    </div>

    <div class="w-full h-auto flex flex-col justfiy-center items-start">
      <p class="dark:text-white">Password</p>
      <input
        type="password"
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={userRequest.password}
      />
    </div>

    <div class="w-full h-auto flex flex-col justfiy-center items-start">
      <p class="dark:text-white">Role</p>
      <select
        name=""
        id=""
        class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
        bind:value={userRequest.role}
      >
        {#if data.roles}
          <option value="">None</option>
          {#each data.roles.data as role}
            <option value={role.id}>{role.name}</option>
          {/each}
        {/if}
      </select>
    </div>

    <button
      class="w-full h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white duration-300 ease-in-out"
      on:click={() => addUser(userRequest)}>Add User</button
    >
  </div>
</div>
