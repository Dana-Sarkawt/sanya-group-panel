import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { DailysRepository } from "$lib/Repositories/Implementations/Dailys.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { get, writable } from "svelte/store";
import { toastStore } from "./Toast.Store";
import { _ } from "svelte-i18n";

const dailysRepository = new DailysRepository();

const createDailyStore = () => {
  const { subscribe, set, update } = writable<
    Store<Database["public"]["Tables"]["Dailys"]["Row"]>
  >({
    data: [],
    count: 0,
  });

  return {
    subscribe,
    set: async (data: Store<Database["public"]["Tables"]["Dailys"]["Row"]>) =>
      set(data),
    create: async (data: Database["public"]["Tables"]["Dailys"]["Insert"]) => {
      try {
        const response = await dailysRepository.createDailyAsync(data);

        if (response.error) {
          throw new Error(get(_)("failed-to-create-daily"));
        }

        toastStore.success(get(_)("daily-created-successfully"));
        update((store) => {
          store.data.push(response.data);
          store.count++;
          return store;
        });

        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-create-daily"));
        }
      }
    },
    get: async (id: number) => {
      try {
        const response = await dailysRepository.readDailyAsync(id);

        if (response.error) {
          throw new Error(get(_)("failed-to-get-daily"));
        }

        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-daily"));
        }
      }
    },
    getAll: async (options?: GenericListOptions) => {
      try {
        const response = await dailysRepository.readDailysAsync(options);

        if (response.error) {
          throw new Error(get(_)("failed-to-get-daily"));
        }

        const pages = Math.ceil(response.count! / (options?.limit! ?? 10));

        set({
          data: response.data,
          count: response.count ?? 0,
          pages: pages,
        });

        return {
          data: response.data,
          count: response.count ?? 0,
          pages: pages,
        };
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-daily"));
        }
      }
    },
    getAllWithoutFilter: async (projectId: number) => {
      try {
        const response =
          await dailysRepository.readDailysWithoutFilterAsync(projectId);
        if (response.error) {
          throw new Error(get(_)("failed-to-get-daily"));
        }
        return {
          data: response.data,
          count: response.count ?? 0,
        };
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-daily"));
        }
      }
    },
    getTotalPrice: async (projectId: number) => {
      try {
        const response =
          await dailysRepository.readDailysTotalPriceAsync(projectId);

        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-daily"));
        }
      }
    },
    update: async (data: Database["public"]["Tables"]["Dailys"]["Update"]) => {
      try {
        const response = await dailysRepository.updateDailyAsync(data);

        if (response.error) {
          throw new Error(get(_)("failed-to-update-daily"));
        }

        toastStore.success(get(_)("daily-updated-successfully"));
        update((store) => {
          const index = store.data.findIndex((x) => x.id === data.id);
          store.data[index] = response.data;
          return store;
        });

        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-update-daily"));
        }
      }
    },
    delete: async (id: number) => {
      try {
        const response = await dailysRepository.deleteDailyAsync(id);

        if (response.error) {
          throw new Error(get(_)("failed-to-delete-daily"));
        }

        toastStore.success(get(_)("daily-deleted-successfully"));
        update((store) => {
          store.data = store.data.filter((x) => x.id !== id);
          store.count--;
          return store;
        });

        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-delete-daily"));
        }
      }
    },
  };
};

export const dailyStore = createDailyStore();
