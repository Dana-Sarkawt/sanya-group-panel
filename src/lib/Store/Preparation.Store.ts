import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { PreparationsRepository } from "$lib/Repositories/Implementations/Preparations.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { _ } from "svelte-i18n";
import { get, writable } from "svelte/store";
import { toastStore } from "./Toast.Store";

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
          throw new Error(get(_)("failed-to-create-preparation"));
        }
        toastStore.success(get(_)("preparation-created-successfully"));
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
          toastStore.error(get(_)("failed-to-create-preparation"));
        }
      }
    },
    get: async (id: number) => {
      try {
        const response = await preparationsRepository.readPreparationAsync(id);

        if (response.error) {
          throw new Error(get(_)("failed-to-get-preparation"));
        }

        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-preparation"));
        }
      }
    },
    getAll: async (options?: GenericListOptions) => {
      try {
        const response =
          await preparationsRepository.readPreparationsAsync(options);

        if (response.error) {
          throw new Error(get(_)("failed-to-get-preparation"));
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
          toastStore.error(get(_)("failed-to-get-preparation"));
        }
      }
    },
    getAllWithoutFilter: async (projectId: number) => {
      try {
        const response =
          await preparationsRepository.readPreparationWithoutFilterAsync(
            projectId
          );
        if (response.error) {
          throw new Error(get(_)("failed-to-get-preparation"));
        }
        return {
          data: response.data,
          count: response.count ?? 0,
        };
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-preparation"));
        }
      }
    },
    getOverhaulDepositsByProjectId: async (projectId: number) => {
      try {
        const response =
          await preparationsRepository.readOverhaulDepositsByProjectIdAsync(
            projectId
          );
        if (response.error) {
          throw new Error(get(_)("failed-to-get-preparation"));
        }
        return response.data;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-preparation"));
        }
      }
    },
    getOverhaulFinancialsByProjectId: async (projectId: number) => {
      try {
        const response =
          await preparationsRepository.readOverhaulFinancialsByProjectIdAsync(
            projectId
          );
        if (response.error) {
          throw new Error(get(_)("failed-to-get-preparation"));
        }
        return response.data;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-preparation"));
        }
      }
    },
    getDepositsByPreparationIds: async (ids: number[]) => {
      try {
        const response =
          await preparationsRepository.readDepositsByPreparationIdsAsync(ids);
        if (response.error) {
          throw new Error(get(_)("failed-to-get-preparation"));
        }
        return response.data;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-preparation"));
        }
      }
    },
    getFinancialByPreparationIds: async (ids: number[]) => {
      try {
        const response =
          await preparationsRepository.readFinancialByPreparationIdsAsync(ids);
        if (response.error) {
          throw new Error(get(_)("failed-to-get-preparation"));
        }
        return response.data;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-preparation"));
        }
      }
    },
    update: async (
      data: Database["public"]["Tables"]["Preparations"]["Update"]
    ) => {
      try {
        if (!data.id) {
          throw new Error(get(_)("id-is-required"));
        }

        const response =
          await preparationsRepository.updatePreparationAsync(data);

        if (response.error) {
          throw new Error(get(_)("failed-to-update-preparation"));
        }
        toastStore.success(get(_)("preparation-updated-successfully"));
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
          toastStore.error(get(_)("failed-to-update-preparation"));
        }
      }
    },
    delete: async (id: number) => {
      try {
        const response =
          await preparationsRepository.deletePreparationAsync(id);

        if (response.error) {
          throw new Error(get(_)("failed-to-delete-preparation"));
        }
        toastStore.success(get(_)("preparation-deleted-successfully"));
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-delete-preparation"));
        }
      }
    },
  };
};

export const preparationStore = createPreparationStore();
