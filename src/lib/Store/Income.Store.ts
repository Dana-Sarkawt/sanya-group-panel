import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { IncomeRepository } from "$lib/Repositories/Implementations/Income.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { writable } from "svelte/store";

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
        console.log("data", data);
        
        const response = await incomeRepository.createIncomeAsync(data);

        if (response.error) {
          throw new Error(response.error.message);
        }
        update((state) => ({
          ...state,
          data: [response.data, ...state.data],
        }));

        return response;
      } catch (error) {
        console.log(error);
      }
    },

    get: async (id: number) => {
      try {
        const response = await incomeRepository.readIncomeAsync(id);

        if (response.error) {
          throw new Error(response.error.message);
        }

        return response;
      } catch (error) {
        console.log(error);
      }
    },
    getAll: async (options?: GenericListOptions, inbox_id?: number) => {
      try {
        const response = await incomeRepository.readIncomesAsync(
          options,
          inbox_id
        );

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

export const incomeStore = createIncomeStore();
