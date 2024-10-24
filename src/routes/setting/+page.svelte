<script lang="ts">
  import { onMount } from "svelte";
  import { roleStore } from "$lib/Store/Role.Store";
  import { Button, Modal } from "flowbite-svelte";
  import { Role } from "$lib/Models/Request/Role.Request.Model";
  import { _ } from "svelte-i18n";

  let roleModal = false;
  let roleRequest: Role.Change = new Role.Change();
  onMount(async () => {
    await roleStore.getAll();
  });

  async function changeRole(request: Role.Change) {
    try {
      request.id
        ? await roleStore.update(roleRequest)
        : await roleStore.create(roleRequest);
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      roleModal = false;
    }
  }

  async function deleteStore(id: number) {
    try {
      await roleStore.delete(id);
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      roleModal = false;
    }
  }

  function clearInput() {
    roleRequest = new Role.Change();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="w-full h-auto flex flex-wrap justify-center items-start pt-12 gap-4"
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="w-[300px] h-[300px] rounded-lg bg-[#228c62] dark:bg-[#0F4E35] hover:bg-[#33b883] dark:hover:bg-[#1e9163] flex flex-col justify-center items-center text-white text-2xl duration-300 ease-in-out cursor-pointer"
    on:click={() => (roleModal = true)}
  >
    <img src="" alt="" />
    <p>Role</p>
  </div>

  <a href="#">
    <div
      class="w-[300px] h-[300px] rounded-lg bg-[#228c62] dark:bg-[#0F4E35] hover:bg-[#33b883] dark:hover:bg-[#1e9163] flex flex-col justify-center items-center text-white text-2xl duration-300 ease-in-out"
    >
      <img src="" alt="" />
      <p>Language</p>
    </div>
  </a>
</div>

<Modal title="Create Role" bind:open={roleModal}>
  <div class="w-full h-auto flex flex-col justify-center items-start gap-2">
    <div class="w-full h-auto flex justify-between items-center">
      <p class="dark:text-white">Role Name</p>
      <button
        class="w-20 h-12 rounded-xl bg-blue-500 hover:bg-blue-400 ease-in-out duration-300 text-white"
        on:click={clearInput}>Reset</button
      >
    </div>

    <input
      type="text"
      bind:value={roleRequest.name}
      class="w-full h-12 border-0 rounded-xl bg-[#f1f1f1] dark:bg-[#123d3745]"
    />
  </div>

  <div
    class="w-full h-[200px] overflow-y-auto bg-[#f1f1f1] dark:bg-[#123d3745] p-4 rounded-xl flex flex-col justify-start items-center gap-2"
  >
    {#if $roleStore.data}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      {#each $roleStore.data as role}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="w-full h-12 flex justify-between items-center px-4 text-black dark:text-white bg-white dark:bg-[#2e3e53] p-8 rounded-xl"
        >
          <p>{role.name}</p>

          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div class="w-auto flex gap-2">
            <div
              class="w-12 h-12 flex justify-center items-center gap-2 rounded-xl bg-[#167b53] hover:bg-[#209d6b] duration-300 ease-in-out cursor-pointer"
              on:click={() => {
                roleRequest = role;
              }}
            >
              <img
                src="/images/edit.png"
                class="w-6 h-6 object-contain"
                alt=""
              />
            </div>

            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              class="w-12 h-12 flex justify-center items-center gap-2 rounded-xl bg-[#c53232] hover:bg-[#e03f3f] duration-300 ease-in-out cursor-pointer"
              on:click={() => deleteStore(role.id)}
            >
              <img
                src="/images/delete.png"
                class="w-6 h-6 object-contain"
                alt=""
              />
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <svelte:fragment slot="footer">
    <Button
      class="w-full h-12 bg-green-500 dark:bg-green-500 hover:bg-green-400 dark:hover:bg-green-400 rounded-xl duration-300 ease-in-out"
      on:click={() => changeRole(roleRequest)}
    >
      {$_("submit")}
    </Button>
  </svelte:fragment>
</Modal>
