import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { WorkersRepository } from "$lib/Repositories/Implementations/Workers.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { get, writable } from "svelte/store";
import { toastStore } from "./Toast.Store";
import { _ } from "svelte-i18n";

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
          toastStore.error(get(_)("name-is-required"));
          throw new Error(get(_)("name-is-required"));
        }
        const response = await workersRepository.createWorkerAsync(data);

        if (response.error) {
          toastStore.error(get(_)("failed-to-create-worker"));
          throw new Error(response.error.message);
        }

        update((store) => {
          store.data.push(response.data);
          store.count++;
          return store;
        });

        return response;
      } catch (error) {
        toastStore.error(get(_)("failed-to-create-worker"));
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
        toastStore.error(get(_)("failed-to-get-worker"));
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
        toastStore.error(get(_)("failed-to-get-workers"));
      }
    },
    getAllWithoutFilter: async (projectId: number) => {
      try {
        const response =
          await workersRepository.readWorkersWithoutFilterAsync(projectId);
        if (response.error) {
          throw new Error(response.error.message);
        }
        return {
          data: response.data,
          count: response.count ?? 0,
        };
      } catch (error) {
        toastStore.error(get(_)("failed-to-get-workers"));
      }
    },
    getOverhaulDepositsByProjectId: async (projectId: number) => {
      try {
        const response =
          await workersRepository.readOverhaulDepositsByProjectIdAsync(
            projectId
          );
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response.data;
      } catch (error) {
        toastStore.error(get(_)("failed-to-get-overhaul-deposits"));
      }
    },
    getOverhaulFinancialsByProjectId: async (projectId: number) => {
      try {
        const response =
          await workersRepository.readOverhaulFinancialsByProjectIdAsync(
            projectId
          );
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response.data;
      } catch (error) {
        toastStore.error(get(_)("failed-to-get-overhaul-financials"));
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
        toastStore.error(get(_)("failed-to-get-deposits"));
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
        toastStore.error(get(_)("failed-to-get-financials"));
      }
    },
    update: async (data: Database["public"]["Tables"]["Workers"]["Update"]) => {
      try {
        const response = await workersRepository.updateWorkerAsync(data);

        if (response.error) {
          toastStore.error(get(_)("failed-to-update-worker"));
          throw new Error(response.error.message);
        }
        toastStore.success(get(_)("worker-updated-successfully"));
        update((store) => {
          const index = store.data.findIndex((item) => item.id === data.id);
          store.data[index] = response.data;
          return store;
        });

        return response;
      } catch (error) {
        toastStore.error(get(_)("failed-to-update-worker"));
      }
    },
    delete: async (id: number) => {
      try {
        const response = await workersRepository.deleteWorkerAsync(id);

        if (response.error) {
          toastStore.error(get(_)("failed-to-delete-worker"));
          throw new Error(response.error.message);
        }
        toastStore.success(get(_)("worker-deleted-successfully"));

        update((store) => {
          store.data = store.data.filter((item) => item.id !== id);
          store.count--;
          return store;
        });
      } catch (error) {
        toastStore.error(get(_)("failed-to-delete-worker"));
      }
    },
  };
};

export const workerStore = createWorkerStore();
