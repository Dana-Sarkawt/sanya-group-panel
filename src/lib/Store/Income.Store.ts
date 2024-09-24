import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { IncomeRepository } from "$lib/Repositories/Implementations/Income.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { writable } from "svelte/store";

const incomeRepository = new IncomeRepository();

const createIncomeStore = () => {
    const { subscribe, set, update } = writable<Store<Database["public"]["Tables"]["Income"]["Row"]>>({
        data: [],
        count: 0,
    });

    return {
        subscribe,
        set: async (data: Store<Database["public"]["Tables"]["Income"]["Row"]>) => set(data),
       
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
        getAll: async (options?: GenericListOptions) => {
            try {
                const response = await incomeRepository.readIncomesAsync(options);

                if (response.error) {
                    throw new Error(response.error.message);
                }

                return response;
            } catch (error) {
                console.log(error);
            }
        },
    };
}


export const incomeStore = createIncomeStore();