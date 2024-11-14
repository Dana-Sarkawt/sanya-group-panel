import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { DepositsRepository } from "$lib/Repositories/Implementations/Deposits.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { get, writable } from "svelte/store";
import { GenericListOptions } from "../Models/Common/ListOptions.Common.Model";
import { toastStore } from "./Toast.Store";
import { _ } from "svelte-i18n";

const depositsRepository = new DepositsRepository();

const createDepositStore = () => {
  const { subscribe, set, update } = writable<
    Store<Database["public"]["Tables"]["Deposits"]["Row"]>
  >({
    data: [],
    count: 0,
  });
  return {
    subscribe,
    set: async (data: Store<Database["public"]["Tables"]["Deposits"]["Row"]>) =>
      set(data),
    create: async (
      data: Database["public"]["Tables"]["Deposits"]["Insert"],
    ) => {
      try {
        const response = await depositsRepository.createDepositAsync(data);
        if (response.error) {
          throw new Error(get(_)("failed-to-create-deposit"));
        }
        toastStore.success(get(_)("deposit-created-successfully"));
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
          toastStore.error(get(_)("failed-to-create-deposit"));
        }
      }
    },
    get: async (id: number) => {
      try {
        const response = await depositsRepository.readDepositAsync(id);
        if (response.error) {
          throw new Error(get(_)("failed-to-get-deposit"));
        }
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-deposit"));
        }
      }
    },
    getAll: async (options?: GenericListOptions) => {
      try {
        const response = await depositsRepository.readDepositsAsync(options);
        if (response.error) {
          throw new Error(get(_)("failed-to-get-deposit"));
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
          toastStore.error(get(_)("failed-to-get-deposit"));
        }
      }
    },
    update: async (
      data: Database["public"]["Tables"]["Deposits"]["Update"],
    ) => {
      try {
        if (!data.id || data.id === 0) {
          throw new Error(get(_)("invalid-deposit-id"));
        }
        const response = await depositsRepository.updateDepositAsync(data);
        if (response.error) {
          throw new Error(get(_)("failed-to-update-deposit"));
        }
        toastStore.success(get(_)("deposit-updated-successfully"));
        update((store) => {
          store.data = store.data.map((deposit) =>
            deposit.id === response.data.id ? response.data : deposit,
          );
          return store;
        });
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-update-deposit"));
        }
      }
    },
    delete: async (id: number) => {
      try {
        if (!id || id === 0) {
          throw new Error(get(_)("invalid-deposit-id"));
        }
        const response = await depositsRepository.deleteDepositAsync(id);
        if (response.error) {
          throw new Error(get(_)("failed-to-delete-deposit"));
        }
        toastStore.success(get(_)("deposit-deleted-successfully"));
        update((store) => {
          store.data = store.data.filter((deposit) => deposit.id !== id);
          store.count--;
          return store;
        });
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-delete-deposit"));
        }
      }
    },
  };
};

export const depositStore = createDepositStore();
