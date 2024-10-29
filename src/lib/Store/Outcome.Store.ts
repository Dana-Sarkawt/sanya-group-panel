import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { OutcomeRepository } from "$lib/Repositories/Implementations/Outcome.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { get, writable } from "svelte/store";
import { toastStore } from "./Toast.Store";
import { _ } from "svelte-i18n";

const outcomeRepository = new OutcomeRepository();

const createOutcomeStore = () => {
  const { subscribe, set, update } = writable<
    Store<Database["public"]["Tables"]["Outcome"]["Row"]>
  >({
    data: [],
    count: 0,
  });

  return {
    subscribe,
    set: async (data: Store<Database["public"]["Tables"]["Outcome"]["Row"]>) =>
      set(data),
    create: async (data: Database["public"]["Tables"]["Outcome"]["Insert"]) => {
      try {
        const response = await outcomeRepository.createOutcomeAsync(data);

        if (response.error) {
          toastStore.error(get(_)("failed-to-create-outcome"));
          throw new Error(response.error.message);
        }

        update((state) => ({
          ...state,
          data: [response.data, ...state.data],
        }));
        toastStore.success(get(_)("outcome-created-successfully"));
        return response;
      } catch (error) {
        toastStore.error(get(_)("failed-to-create-outcome"));
      }
    },
    get: async (id: number) => {
      try {
        const response = await outcomeRepository.readOutcomeAsync(id);

        if (response.error) {
          toastStore.error(get(_)("failed-to-get-outcome"));
          throw new Error(response.error.message);
        }

        return response;
      } catch (error) {
        toastStore.error(get(_)("failed-to-get-outcome"));
      }
    },
    update: async (data: Database["public"]["Tables"]["Outcome"]["Update"]) => {
      try {
        const response = await outcomeRepository.updateOutcomeAsync(data);

        update((store) => {
          store.data = store.data.map((item) =>
            item?.id === response.data?.id ? response.data : item
          );
          return store;
        });
        toastStore.success(get(_)("outcome-updated-successfully"));
        return response;
      } catch (error) {
        toastStore.error(get(_)("failed-to-update-outcome"));
      }
    },
    getAll: async (options?: GenericListOptions) => {
      try {
        const response = await outcomeRepository.readOutcomesAsync(options);

        if (response.error) {
          toastStore.error(get(_)("failed-to-get-outcome"));
          throw new Error(response.error.message);
        }

        const pages = Math.ceil((response.count ?? 0) / (options?.limit || 10));
        set({
          data: response.data ?? [],
          count: response.count ?? 0,
          pages,
        });

        return response;
      } catch (error) {
        toastStore.error(get(_)("failed-to-get-outcome"));
      }
    },
  };
};

export const outcomeStore = createOutcomeStore();
