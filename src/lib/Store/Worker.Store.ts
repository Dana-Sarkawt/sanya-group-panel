import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { WorkersRepository } from "$lib/Repositories/Implementations/Workers.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { writable } from "svelte/store";

const workersRepository = new WorkersRepository();

const createWorkerStore = () => {
  const { subscribe, set, update } = writable<
    Store<Database["public"]["Tables"]["Workers"]["Row"]>
  >({
    data: [],
    count: 0,
  });

  return {
    subscribe,
    set: async (data: Store<Database["public"]["Tables"]["Workers"]["Row"]>) =>
      set(data),
    create: async (data: Database["public"]["Tables"]["Workers"]["Insert"]) => {
      try {
        if (!data.name || data.name === "") {
          throw new Error("Name is required");
        }
        const response = await workersRepository.createWorkerAsync(data);

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
        const response = await workersRepository.readWorkerAsync(id);

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
        const response = await workersRepository.readWorkersAsync(options);

        if (response.error) {
          throw new Error(response.error.message);
        }

        const pages = Math.ceil(response.count! / (options?.limit! ?? 10));

        set({
          data: response.data,
          count: response.count ?? 0,
          pages,
        });

        return response;
      } catch (error) {
        console.log(error);
      }
    },
    getDepositsByWorkerIds: async (ids: number[]) => {
      try {
        const response =
          await workersRepository.readDepositsByWorkerIdsAsync(ids);
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    getFinancialByWorkerIds: async (ids: number[]) => {
      try {
        const response =
          await workersRepository.readFinancialByWorkerIdsAsync(ids);
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    update: async (data: Database["public"]["Tables"]["Workers"]["Update"]) => {
      try {
        const response = await workersRepository.updateWorkerAsync(data);

        if (response.error) {
          throw new Error(response.error.message);
        }

        update((store) => {
          const index = store.data.findIndex((item) => item.id === data.id);
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
        const response = await workersRepository.deleteWorkerAsync(id);

        if (response.error) {
          throw new Error(response.error.message);
        }

        update((store) => {
          store.data = store.data.filter((item) => item.id !== id);
          store.count--;
          return store;
        });
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const workerStore = createWorkerStore();
