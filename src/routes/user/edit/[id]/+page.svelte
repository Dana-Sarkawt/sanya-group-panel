<script lang="ts">
	import { roleStore } from '$lib/Store/Role.Store';
	import { userStore } from '$lib/Store/User.Store';
    import { goto } from "$app/navigation";
    import { page } from '$app/stores';
    import { User } from "$lib/Models/Request/User.Request.Model";
  import { onMount } from "svelte";
    import type { PageData } from "./$types";
    export let data: PageData;
    let userRequest = new User.Update();

    onMount (async () => {
      const user = await userStore.get(Number($page.params.id));
      await roleStore.getAll();
      if(!user) {
        throw new Error("Failed to fetch user");
      }
        userRequest = {
            ...userRequest,
            name: user.data.name as string,
            phone: user.data.phone as string,
            email: user.data.email as string,
            role: user.data.role as number,
            id: user.data.id,
        }
    });
  
    
    async function updateUser(request: User.Update) {
      try {
        const response = await userStore.update(request);
        if (!response) {
          throw new Error("Failed to update user");
        }
        goto(`/user/0`);
      } catch (error) {
        console.log(error);
      }
    }
  </script>
  
  <div class="w-full h-auto flex  justify-center items-center  md:px-44">
  
    <a href="/user/0">
    <p class="w-24 h-12 rounded-xl flex justify-center items-center bg-green-700 hover:bg-green-500 text-white duration-300 ease-in-out">Back</p>
    </a>
  
    <p class="w-full h-auto text-2xl md:text-4xl dark:text-white text-center my-12">
      Update User
    </p>
  </div>
  
  
  <div class="w-full h-auto flex justify-center items-center">
    <div
      class="w-[90%] md:w-[50%] h-auto p-10 bg-[#94DCBA] dark:bg-[#11433A] border border-[#11433A] dark:border-[#94DCBA] rounded-xl flex flex-col justify-center items-center gap-6"
    >
      <div class="w-full h-auto flex flex-col justify-center items-start">
        <p class="dark:text-white">Name</p>
        <input
          type="text"
          class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
          bind:value={userRequest.name}
        />
      </div>
  
      <div class="w-full h-auto flex flex-col justify-center items-start">
        <p class="dark:text-white">Phone</p>
        <input
          type="text"
          class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
          bind:value={userRequest.phone}
        />
      </div>
  
      <div class="w-full h-auto flex flex-col justify-center items-start">
        <p class="dark:text-white">E-mail</p>
        <input
          type="text"
          class="w-full bg-[#daffee] dark:bg-[#0d2621] rounded-xl border-0 dark:text-white"
          bind:value={userRequest.email}
        />
      </div>
  
      
      <div class="w-full h-auto flex flex-col justify-center items-start">
        <p class="dark:text-white">Role</p>
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
        class="w-full h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white duration-300 ease-in-out"
        on:click={()=> updateUser(userRequest)}
     >Update User</button
      >
    </div>
  </div>
  