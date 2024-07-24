import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { PreparationsRepository } from "$lib/Repositories/Implementations/Preparations.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { writable } from "svelte/store";

const preparationsRepository = new PreparationsRepository();

const createPreparationStore = () => {
  const { subscribe, set, update } = writable<
    Store<Database["public"]["Tables"]["Preparations"]["Row"]>
  >({
    data: [],
    count: 0,
  });

  return {
    subscribe,
    set: async (
      data: Store<Database["public"]["Tables"]["Preparations"]["Row"]>
    ) => set(data),
    create: async (
      data: Database["public"]["Tables"]["Preparations"]["Insert"]
    ) => {
      try {
        const response =
          await preparationsRepository.createPreparationAsync(data);

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
        const response = await preparationsRepository.readPreparationAsync(id);

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
        const response =
          await preparationsRepository.readPreparationsAsync(options);

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
    update: async (
      data: Database["public"]["Tables"]["Preparations"]["Update"]
    ) => {
      try {
        if (!data.id) {
          throw new Error("ID is required");
        }

        const response =
          await preparationsRepository.updatePreparationAsync(data);

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
        const response =
          await preparationsRepository.deletePreparationAsync(id);

        if (response.error) {
          throw new Error(response.error.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const preparationStore = createPreparationStore();
