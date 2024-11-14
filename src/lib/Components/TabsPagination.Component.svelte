<script lang="ts">
  import { Pagination, type LinkType } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";

  export let filter = {
    page: 0,
    limit: 10,
  };
  export let StoreData: any;
  export let Store: any;
  let currentPage: number = 0;
  let pageCount: LinkType[] = [];
  export let isTableLoading = false;

  onMount(() => {
    debouncedFetchData();
  });

  async function fetchData() {
    isTableLoading = true;
    try {
      updatePageCount();
      Store.getAll(filter);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        isTableLoading = false;
      }, 300);
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
    fetchData();
  };

  const next = async () => {
    if (currentPage == StoreData.pages! - 1) {
      return;
    }
    currentPage += 1;
    filter.page = currentPage;
    debouncedFetchData();
  };

  const setPage = async (event: MouseEvent) => {
    const target = event.target as HTMLElement; // Type assertion here
    const page = parseInt(target.innerText) - 1;
    if (page === currentPage) return;
    currentPage = page;
    filter.page = currentPage;
    debouncedFetchData();
  };

  $: if (currentPage) {
    filter.page = currentPage;
    debouncedFetchData();
  }

  function debounce(func: any, wait: number) {
    let timeout: any;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  const debouncedFetchData = debounce(fetchData, 10);
</script>

{#if StoreData && (StoreData.pages ?? 0) > 1}
  <Pagination
    ulClass="inline-flex -space-x-px rtl:space-x-reverse items-center gap-4"
    normalClass="text-black bg-green-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-[#192520] border-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white rounded-xl"
    activeClass="text-white border-0 bg-green-500 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:text-white rounded-xl"
    pages={pageCount}
    large
    on:previous={previous}
    on:next={next}
    on:click={(event) => {
      setPage(event);
    }}
  >
    <svelte:fragment slot="prev">
      <span class="sr-only">{$_("previous")}</span>
      <p>{$_("previous")}</p>
    </svelte:fragment>
    <svelte:fragment slot="next">
      <span class="sr-only">{$_("next")}</span>
      <p>{$_("next")}</p>
    </svelte:fragment>
  </Pagination>
{/if}
