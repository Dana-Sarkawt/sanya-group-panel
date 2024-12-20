import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { IncomeRepository } from "$lib/Repositories/Implementations/Income.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { get, writable } from "svelte/store";
import { toastStore } from "$lib/Store/Toast.Store";
import { _ } from "svelte-i18n";

const incomeRepository = new IncomeRepository();

const createIncomeStore = () => {
  const { subscribe, set, update } = writable<
    Store<Database["public"]["Tables"]["Income"]["Row"]>
  >({
    data: [],
    count: 0,
  });

  return {
    subscribe,
    set: async (data: Store<Database["public"]["Tables"]["Income"]["Row"]>) =>
      set(data),
    create: async (data: Database["public"]["Tables"]["Income"]["Insert"]) => {
      try {
        const response = await incomeRepository.createIncomeAsync(data);

        if (response.error) {
          throw new Error(get(_)("failed-to-create-income"));
        }

        update((state) => ({
          ...state,
          data: [response.data, ...state.data],
        }));

        toastStore.success(get(_)("income-created-successfully"));
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-create-income"));
        }
      }
    },

    get: async (id: number) => {
      try {
        const response = await incomeRepository.readIncomeAsync(id);

        if (response.error) {
          throw new Error(get(_)("failed-to-get-income"));
        }

        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-income"));
        }
      }
    },
    getAll: async (options?: GenericListOptions) => {
      try {
        const response = await incomeRepository.readIncomesAsync(options);

        if (response.error) {
          throw new Error(get(_)("failed-to-get-incomes"));
        }

        const pages = Math.ceil((response.count ?? 0) / (options?.limit || 10));

        set({
          data: response.data ?? [],
          count: response.count ?? 0,
          pages,
          filters: options,
        });

        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-incomes"));
        }
      }
    },
    getTotal: async () => {
      try {
        const response = await incomeRepository.readIncomesTotalAsync();
        return response.data?.total ?? 0;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-incomes-total"));
        }
        return 0;
      }
    },
    update: async (data: Database["public"]["Tables"]["Income"]["Update"]) => {
      try {
        const response = await incomeRepository.updateIncomeAsync(data);
        update((store) => {
          store.data = store.data.map((item) =>
            item?.id === response.data?.id ? response.data : item
          );
          return store;
        });
        toastStore.success(get(_)("income-updated-successfully"));
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-update-income"));
        }
      }
    },
    delete: async (id: number) => {
      try {
        const response = await incomeRepository.deleteIncomeAsync(id);

        toastStore.success(get(_)("income-deleted-successfully"));
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-delete-income"));
        }
      }
    },
  };
};

export const incomeStore = createIncomeStore();
