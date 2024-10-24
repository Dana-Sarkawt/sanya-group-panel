import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { OutcomeRepository } from "$lib/Repositories/Implementations/Outcome.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { writable } from "svelte/store";

const outcomeRepository = new OutcomeRepository();

const createOutcomeStore = () => {
  const { subscribe, set } = writable<
    Store<Database["public"]["Tables"]["Outcome"]["Row"]>
  >({
    data: [],
    count: 0,
  });

  return {
    subscribe,
    set: async (data: Store<Database["public"]["Tables"]["Outcome"]["Row"]>) =>
      set(data),
    get: async (id: number) => {
      try {
        const response = await outcomeRepository.readOutcomeAsync(id);

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
        const response = await outcomeRepository.readOutcomesAsync(options);

        if (response.error) {
          throw new Error(response.error.message);
        }

        const pages = Math.ceil(response.count ?? 0 / (options?.limit || 10));
        set({
          data: response.data ?? [],
          count: response.count ?? 0,
          pages,
        });

        return response;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const outcomeStore = createOutcomeStore();
