<script lang="ts">
  import DeleteModal from "$lib/Components/DeleteModal.Component.svelte";
  import type { Store } from "$lib/Models/Response/Store.Response.Model";
  import type { Database } from "$lib/Supabase/Types/database.types";
  import { page } from "$app/stores";
  import { capitalStore } from "$lib/Store/Capital.Store";
  import { VITE_SUPABASE_BUCKET_SANYA } from "$env/static/public";
  import { _ } from "svelte-i18n";
  import ImageDialog from "../ImageDialog.Component.svelte";
  interface Props {
    capitals?: Store<Database["public"]["Tables"]["Capitals"]["Row"]>;
  }

  let {
    capitals = $bindable({
      data: [],
      count: 0,
      error: "",
    }),
  }: Props = $props();

  let selectedImage: string = $state("");
  let imageDialog = $state(false);

  let deleteModal = $state(false);
  let deleteId: number = $state(0);
</script>

<div class="w-full h-auto flex justify-center items-center mx-2">
  <table class="table w-full text-white text-[5px] md:text-lg rounded-xl">
    <thead>
      <tr>
        <th scope="col">{$_("image")}</th>
        <th scope="col">{$_("description")}</th>
        <th scope="col">{$_("price")}</th>
        <th scope="col">{$_("date")}</th>
        <th scope="col">{$_("action")}</th>
      </tr>
    </thead>
    <tbody>
      {#if capitals.count !== 0}
        {#each capitals.data as capital}
          <tr>
            <td class="flex justify-center">
              <div class="relative group">
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <img
                  src={capital.image
                    ? `${VITE_SUPABASE_BUCKET_SANYA}${capital.image}`
                    : "/images/spark.png"}
                  class="w-10 h-10 object-contain rounded-lg transition-all duration-300 group-hover:scale-150 group-hover:z-10 cursor-pointer"
                  alt={capital.image}
                  onclick={() => {
                    selectedImage = capital.image
                      ? `${VITE_SUPABASE_BUCKET_SANYA}${capital.image}`
                      : "/images/spark.png";
                    imageDialog = true;
                  }}
                />
              </div>
            </td>
            <td>{capital.description}</td>
            <td>{capital.price}</td>
            <td>{capital.date}</td>

            <td>
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <!-- svelte-ignore a11y_missing_attribute -->
              <div class="flex h-auto w-auto items-center justify-center gap-2">
                <a
                  href="/project/{$page.params
                    .projectId}/capital/edit/{capital.id}"
                  class="bg-green-600 hover:bg-green-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
                >
                  <img
                    src="/images/edit.png"
                    class="w-4 h-4 md:h-8 md:w-8 object-contain"
                    alt=""
                  />
                </a>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <a
                  class="bg-red-600 hover:bg-red-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
                  onclick={() => {
                    deleteModal = true;
                    deleteId = capital.id;
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

<DeleteModal bind:deleteModal Store={capitalStore} id={deleteId} />

<ImageDialog bind:image={selectedImage} bind:open={imageDialog} />
