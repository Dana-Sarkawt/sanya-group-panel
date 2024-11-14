import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { FinancialDuesRepository } from "$lib/Repositories/Implementations/FinancialDues.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { get, writable } from "svelte/store";
import { toastStore } from "./Toast.Store";
import { _ } from "svelte-i18n";

const financialDuesRepository = new FinancialDuesRepository();

const createFinancialDueStore = () => {
  const { subscribe, set, update } = writable<
    Store<Database["public"]["Tables"]["Financial Dues"]["Row"]>
  >({
    data: [],
    count: 0,
  });
  return {
    subscribe,
    set: async (
      data: Store<Database["public"]["Tables"]["Financial Dues"]["Row"]>,
    ) => set(data),
    create: async (
      data: Database["public"]["Tables"]["Financial Dues"]["Insert"],
    ) => {
      try {
        const response =
          await financialDuesRepository.createFinancialDueAsync(data);
        if (response.error) {
          throw new Error(get(_)("failed-to-create-financial-due"));
        }
        toastStore.success(get(_)("financial-due-created-successfully"));
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
          toastStore.error(get(_)("failed-to-create-financial-due"));
        }
      }
    },
    get: async (id: number) => {
      try {
        const response =
          await financialDuesRepository.readFinancialDueAsync(id);
        if (response.error) {
          throw new Error(get(_)("failed-to-get-financial-due"));
        }
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-financial-due"));
        }
      }
    },
    getAll: async (options?: GenericListOptions) => {
      try {
        const response =
          await financialDuesRepository.readFinancialDuesAsync(options);
        if (response.error) {
          throw new Error(get(_)("failed-to-get-financial-due"));
        }
        const pages = Math.ceil(response.count! / (options?.limit! ?? 10));
        set({
          data: response.data,
          count: response.count ?? 0,
          pages,
        });
        return {
          data: response.data,
          count: response.count ?? 0,
          pages,
        };
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-financial-due"));
        }
      }
    },
    update: async (
      data: Database["public"]["Tables"]["Financial Dues"]["Update"],
    ) => {
      try {
        const response =
          await financialDuesRepository.updateFinancialDueAsync(data);
        if (response.error) {
          throw new Error(get(_)("failed-to-update-financial-due"));
        }
        toastStore.success(get(_)("financial-due-updated-successfully"));
        update((store) => {
          store.data = store.data.map((financialDue) =>
            financialDue.id === response.data.id ? response.data : financialDue,
          );
          return store;
        });
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-update-financial-due"));
        }
      }
    },
    delete: async (id: number) => {
      try {
        const response =
          await financialDuesRepository.deleteFinancialDueAsync(id);
        if (response.error) {
          throw new Error(get(_)("failed-to-delete-financial-due"));
        }
        toastStore.success(get(_)("financial-due-deleted-successfully"));
        update((store) => {
          store.data = store.data.filter(
            (financialDue) => financialDue.id !== id,
          );
          store.count--;
          return store;
        });
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-delete-financial-due"));
        }
      }
    },
  };
};

export const financialDueStore = createFinancialDueStore();
