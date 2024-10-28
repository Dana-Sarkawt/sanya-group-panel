import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { CapitalsRepository } from "$lib/Repositories/Implementations/Capitals.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { get, writable } from "svelte/store";
import { toastStore } from "./Toast.Store";
import { _ } from "svelte-i18n";

const capitalsRepository = new CapitalsRepository();

const createCapitalStore = () => {
  const { subscribe, set, update } = writable<
    Store<Database["public"]["Tables"]["Capitals"]["Row"]>
  >({
    data: [],
    count: 0,
  });
  return {
    subscribe,
    set: async (data: Store<Database["public"]["Tables"]["Capitals"]["Row"]>) =>
      set(data),
    create: async (
      data: Database["public"]["Tables"]["Capitals"]["Insert"],
    ) => {
      try {
        if (!data.date || data.date === "") {
          toastStore.error(get(_)("date-is-required"));
          throw new Error(get(_)("date-is-required"));
        }
        if (!data.price || data.price === 0) {
          toastStore.error(get(_)("price-is-required"));
          throw new Error(get(_)("price-is-required"));
        }
        const response = await capitalsRepository.createCapitalAsync(data);
        if (response.error) {
          toastStore.error(get(_)("failed-to-create-capital"));
          throw new Error(response.error.message);
        }
        toastStore.success(get(_)("capital-created-successfully"));
        update((store) => {
          store.data.push(response.data);
          store.count++;
          return store;
        });
        return response;
      } catch (error) {
        toastStore.error(get(_)("failed-to-create-capital"));
      }
    },
    get: async (id: number) => {
      try {
        const response = await capitalsRepository.readCapitalAsync(id);
        if (response.error) {
          toastStore.error(get(_)("failed-to-get-capital"));
          throw new Error(response.error.message);
        }
        return response;
      } catch (error) {
        toastStore.error(get(_)("failed-to-get-capital"));
      }
    },
    getAll: async (options?: GenericListOptions) => {
      try {
        const response = await capitalsRepository.readCapitalsAsync(options);
        if (response.error) {
          toastStore.error(get(_)("failed-to-get-capitals"));
          throw new Error(response.error.message);
        }
        const pages = Math.ceil(response.count! / (options?.limit ?? 10));
        set({
          data: response.data,
          count: response.count ?? 0,
          pages,
        });
        return { data: response.data, count: response.count ?? 0 };
      } catch (error) {
        toastStore.error(get(_)("failed-to-get-capitals"));
      }
    },
    getAllWithoutFilter: async (projectId: number) => {
      try {
        const response =
          await capitalsRepository.readCapitalsWithoutFilterAsync(projectId);
        if (response.error) {
          toastStore.error(get(_)("failed-to-get-capitals"));
          throw new Error(response.error.message);
        }
        return {
          data: response.data,
          count: response.count ?? 0,
        };
      } catch (error) {
        toastStore.error(get(_)("failed-to-get-capitals"));
      }
    },
    getTotalPrice: async (projectId: number) => {
      try {
        const response =
          await capitalsRepository.readCapitalsTotalPriceAsync(projectId);
        if (response == 0) {
          toastStore.error(get(_)("no-capitals-found-for-this-project"));
          throw new Error(get(_)("no-capitals-found-for-this-project"));
        }
        return response;
      } catch (error) {
        toastStore.error(get(_)("no-capitals-found-for-this-project"));
      }
    },
    update: async (
      data: Database["public"]["Tables"]["Capitals"]["Update"],
    ) => {
      try {
        const response = await capitalsRepository.updateCapitalAsync(data);
        if (response.error) {
          toastStore.error(get(_)("failed-to-update-capital"));
          throw new Error(response.error.message);
        }
        update((store) => {
          store.data = store.data.map((item) =>
            item.id === response.data.id ? response.data : item,
          );
          return store;
        });
        return response;
      } catch (error) {
        toastStore.error(get(_)("failed-to-update-capital"));
      }
    },
    delete: async (id: number) => {
      try {
        const response = await capitalsRepository.deleteCapitalAsync(id);
        if (response.error) {
          toastStore.error(get(_)("failed-to-delete-capital"));
          throw new Error(response.error.message);
        }
        update((store) => {
          store.data = store.data.filter((item) => item.id !== id);
          store.count--;
          return store;
        });
        return response;
      } catch (error) {
        toastStore.error(get(_)("failed-to-delete-capital"));
      }
    },
  };
};

export const capitalStore = createCapitalStore();
