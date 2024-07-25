import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { DailysRepository } from "$lib/Repositories/Implementations/Dailys.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { writable } from "svelte/store";

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
          throw new Error(response.error.message);
        }

        update((store) => {
          store.data.push(response.data);
          store.count++;
          return store;
        });

        return response;
      } catch (error) {
        console.log(error);
      }
    },
    get: async (id: number) => {
      try {
        const response = await dailysRepository.readDailyAsync(id);

        if (response.error) {
          throw new Error(response.error.message);
        }

        return response;
      } catch (error) {
        console.log(error);
      }
    },
    getAll: async (options?: GenericListOptions) => {
      try {
        const response = await dailysRepository.readDailysAsync(options);
        console.log("response", response);

        if (response.error) {
          throw new Error(response.error.message);
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
        console.log(error);
      }
    },
    update: async (data: Database["public"]["Tables"]["Dailys"]["Update"]) => {
      try {
        const response = await dailysRepository.updateDailyAsync(data);

        if (response.error) {
          throw new Error(response.error.message);
        }

        update((store) => {
          const index = store.data.findIndex((x) => x.id === data.id);
          store.data[index] = response.data;
          return store;
        });

        return response;
      } catch (error) {
        console.log(error);
      }
    },
    delete: async (id: number) => {
      try {
        const response = await dailysRepository.deleteDailyAsync(id);

        if (response.error) {
          throw new Error(response.error.message);
        }

        update((store) => {
          store.data = store.data.filter((x) => x.id !== id);
          store.count--;
          return store;
        });

        return response;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const dailyStore = createDailyStore();
