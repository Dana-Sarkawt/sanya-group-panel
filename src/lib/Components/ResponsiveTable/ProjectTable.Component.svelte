<script lang="ts">
  import type { Store } from "$lib/Models/Response/Store.Response.Model";
  import type { Database } from "$lib/Supabase/Types/database.types";
  import DeleteModal from "$lib/Components/DeleteModal.Component.svelte";
  import { projectStore } from "$lib/Store/Project.Store";
  import { Status } from "$lib/Models/Enum/Status.Enum.Model";
  import { VITE_SUPABASE_BUCKET_SANYA } from "$env/static/public";

  export let projects: Store<Database["public"]["Tables"]["Projects"]["Row"]> =
    {
      data: [],
      count: 0,
    };
  let deleteId: number = 0;

  let deleteModal = false;
</script>

<div class="w-full h-auto flex justify-center items-center mx-2">
  <table class="table w-full text-white text-[5px] md:text-lg rounded-xl">
    <thead>
      <tr>
        <th scope="col">Image</th>
        <th scope="col">Project ID</th>
        <th scope="col">Project Name</th>
        <th scope="col">Status</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      {#if projects.count !== 0}
        {#each projects.data as project}
          <tr>
            <td class="flex justify-center"
              >
              <img
                src="{project.image ? `${VITE_SUPABASE_BUCKET_SANYA}${project.image}`:"/images/spark.png"}"
                class="w-8 h-8 object-contain"
                alt=""
              />
              </td
            >
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>
              <div class="w-full flex justify-center rounded-xl">
                <p
                  class={`w-12 md:w-32 p-2 rounded-3xl font-medium text-white shadow-lg ${
                    project.status === Status.Stopped
                      ? "bg-gradient-to-b from-[#ff8f1f] to-[#d66b00] shadow-[0_4px_6px_-1px_rgba(214,107,0,0.5)]"
                      : project.status === Status.Failed
                        ? "bg-gradient-to-b from-[#b51717] to-[#8b1313] shadow-[0_4px_6px_-1px_rgba(139,19,19,0.5)]"
                        : project.status === Status.In_Progress
                          ? "bg-gradient-to-b from-[#1969c4] to-[#144b90] shadow-[0_4px_6px_-1px_rgba(20,75,144,0.5)]"
                          : project.status === Status.Done
                            ? "bg-gradient-to-b from-[#13983d] to-[#0f762e] shadow-[0_4px_6px_-1px_rgba(15,118,46,0.5)]"
                            : ""
                  }`}
                >
                  {project.status}
                </p>
              </div>
            </td>
            <td>
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <div class="flex h-auto w-auto items-center justify-center gap-2">
                <a
                  href="/project/{project.id}/0"
                  class="bg-blue-600 hover:bg-blue-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
                >
                  <img
                    src="/images/vision.png"
                    class="w-4 h-4 md:h-8 md:w-8 object-contain"
                    alt=""
                  />
                </a>
                <a
                  href="edit/{project.id}"
                  class="bg-green-600 hover:bg-green-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
                >
                  <img
                    src="/images/edit.png"
                    class="w-4 h-4 md:h-8 md:w-8 object-contain"
                    alt=""
                  />
                </a>
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <a
                  class="bg-red-600 hover:bg-red-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
                  on:click={() => {
                    deleteModal = true;
                    deleteId = project.id;
                  }}
                >
                  <img
                    src="/images/delete.png"
                    class="w-4 h-4 md:h-8 md:w-8 object-contain"
                    alt=""
                  />
                </a>
              </div>
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

<DeleteModal bind:deleteModal Store={projectStore} id={deleteId} />
