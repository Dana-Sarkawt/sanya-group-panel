import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { DepositsRepository } from "$lib/Repositories/Implementations/Deposits.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { writable } from "svelte/store";

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
      data: Database["public"]["Tables"]["Deposits"]["Insert"]
    ) => {
      try {
        const response = await depositsRepository.createDepositAsync(data);
        if (response.error) {
          throw new Error(response.error.message);
        }
        update((store) => {
          store.data.push(response.data);
          store.count++;
          return store;
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    get: async (id: number) => {
      try {
        const response = await depositsRepository.readDepositAsync(id);
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    getAll: async () => {
      try {
        const response = await depositsRepository.readDepositsAsync();
        if (response.error) {
          throw new Error(response.error.message);
        }
        set({
          data: response.data,
          count: response.count ?? 0,
        });
      } catch (error) {
        console.log(error);
      }
    },
    update: async (
      data: Database["public"]["Tables"]["Deposits"]["Update"]
    ) => {
      try {
        if (!data.id || data.id === 0) {
          throw new Error("Invalid deposit id");
        }
        const response = await depositsRepository.updateDepositAsync(data);
        if (response.error) {
          throw new Error(response.error.message);
        }
        update((store) => {
          store.data = store.data.map((deposit) =>
            deposit.id === response.data.id ? response.data : deposit
          );
          return store;
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    delete: async (id: number) => {
      try {
        if (!id || id === 0) {
          throw new Error("Invalid deposit id");
        }
        const response = await depositsRepository.deleteDepositAsync(id);
        if (response.error) {
          throw new Error(response.error.message);
        }
        update((store) => {
          store.data = store.data.filter((deposit) => deposit.id !== id);
          store.count--;
          return store;
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const depositStore = createDepositStore();