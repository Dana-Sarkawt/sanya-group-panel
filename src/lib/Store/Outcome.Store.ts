import { writable } from 'svelte/store';
import { OutcomeRepository } from '../Repositories/Implementations/Outcome.Repository';
import type { GenericListOptions } from '$lib/Models/Common/ListOptions.Common.Model';
import type { Store } from '$lib/Models/Response/Store.Response.Model';
import type { Database } from '$lib/Supabase/Types/database.types';
const outcomeRepository = new OutcomeRepository();
const createOutcomeStore = () => {
    const { subscribe, set, update } = writable({
        data: [],
        count: 0,
    });
    return {
        subscribe,
        
        get: async (id: number) => {
            try {
                const response = await outcomeRepository.readOutcomeAsync(id);
                if (response.error) {
                    throw new Error(response.error.message);
                }
                return response;
            }
            catch (error) {
                console.log(error);
            }
        },
        getAll: async (options?: GenericListOptions) => {
            try {
                const response = await outcomeRepository.readOutcomesAsync(options);
                if (response.error) {
                    throw new Error(response.error.message);
                }
                return response;
            }
            catch (error) {
                console.log(error);
            }
        },
    };
}

export const outcomeStore = createOutcomeStore();