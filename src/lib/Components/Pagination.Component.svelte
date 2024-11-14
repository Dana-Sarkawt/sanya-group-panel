<script lang="ts">
  import { run } from "svelte/legacy";

  import { goto } from "$app/navigation";
  import type { Filtration } from "$lib/Models/Common/Filteration.Common.Model";
  import { Pagination, type LinkType } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";

  interface Props {
    classType: any;
    filter?: Filtration<typeof classType>;
    StoreData: any;
    currentPage: number;
    name: string;
  }

  let {
    classType,
    filter = $bindable({
      page: 0,
      limit: 10,
    }),
    StoreData,
    currentPage = $bindable(),
    name,
  }: Props = $props();
  let pageCount: LinkType[] = $state([]);

  onMount(() => {
    fetchData();
  });

  async function fetchData() {
    try {
      updatePageCount();
    } catch (e) {
      console.log(e);
    }
  }

  function updatePageCount() {
    const totalPages = StoreData.pages!;
    const current = filter.page;

    let startPage = Math.max(0, current! - 1);
    let endPage = Math.min(totalPages - 1, current! + 1);

    if (current === 0) {
      endPage = Math.min(totalPages - 1, 2);
    } else if (current === totalPages - 1) {
      startPage = Math.max(0, totalPages - 3);
    }

    pageCount = Array.from({ length: endPage - startPage + 1 }, (_, i) => ({
      name: (startPage + i + 1).toString(),
      active: startPage + i === current,
    }));
  }

  const previous = async () => {
    if (currentPage === 0) {
      return;
    }
    currentPage -= 1;
    filter.page = currentPage;
    goto(`/${name}/${currentPage}`);
    fetchData();
  };

  const nextAction = async () => {
    if (currentPage == StoreData.pages! - 1) {
      return;
    }
    currentPage += 1;
    filter.page = currentPage;
    goto(`/${name}/${currentPage}`);
    fetchData();
  };

  const setPage = async (event: MouseEvent) => {
    const target = event.target as HTMLElement; // Type assertion here
    const page = parseInt(target.innerText) - 1;
    if (page === currentPage) return;
    currentPage = page;
    filter.page = currentPage;
    goto(`/${name}/${page}`);
    fetchData();
  };

  run(() => {
    if (currentPage) {
      filter.page = currentPage;
      fetchData();
    }
  });
</script>

{#if StoreData && (StoreData.pages ?? 0) > 1}
  <Pagination
    ulClass="inline-flex -space-x-px rtl:space-x-reverse items-center gap-4"
    normalClass="text-black bg-green-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-[#192520] border-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white rounded-xl"
    activeClass="text-white border-0 bg-green-500 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:text-white rounded-xl"
    pages={pageCount}
    large
    on:previous={previous}
    on:next={nextAction}
    on:click={(event) => {
      setPage(event);
    }}
  >
    {@render prev()}
    {@render next()}
  </Pagination>
{/if}

{#snippet prev()}
  <span class="sr-only">{$_("previous")}</span>
  <p>{$_("previous")}</p>
{/snippet}
{#snippet next()}
  <span class="sr-only">{$_("next")}</span>
  <p>{$_("next")}</p>
{/snippet}
