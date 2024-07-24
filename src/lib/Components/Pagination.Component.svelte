<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Filtration } from "$lib/Models/Common/Filteration.Common.Model";
  import { Pagination, type LinkType } from "flowbite-svelte";
  import { onMount } from "svelte";

  export let classType;
  export let filter: Filtration<typeof classType> = {
    page: 0,
    limit: 10,
  };
  export let StoreData: any;
  export let currentPage: number;
  export let name: string;
  let pageCount: LinkType[] = [];

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

  const next = async () => {
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

  $: {
    if (currentPage) {
      filter.page = currentPage;
      fetchData();
    }
  }
</script>

{#if StoreData && (StoreData.pages ?? 0) > 1}
  <Pagination
    ulClass="inline-flex -space-x-px rtl:space-x-reverse items-center gap-4"
    normalClass="text-black bg-[#F7F6FE] hover:bg-gray-100 hover:text-gray-700 dark:bg-[#141432] border-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white rounded-xl"
    activeClass="text-white border-0 bg-[#F17F18] hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:text-white rounded-xl"
    pages={pageCount}
    large
    on:previous={previous}
    on:next={next}
    on:click={(event) => {
      setPage(event);
    }}
    icon
  >
    <svelte:fragment slot="prev">
      <span class="sr-only">Previous</span>
      <p>Previous</p>
    </svelte:fragment>
    <svelte:fragment slot="next">
      <span class="sr-only">Next</span>
      <p>Next</p>
    </svelte:fragment>
  </Pagination>
{/if}
