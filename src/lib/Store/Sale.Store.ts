import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { SalesRepository } from "$lib/Repositories/Implementations/Sales.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { writable } from "svelte/store";

const salesRepository = new SalesRepository();

const createSaleStore = () => {
  const { subscribe, set, update } = writable<
    Store<Database["public"]["Tables"]["Sales"]["Row"]>
  >({
    data: [],
    count: 0,
  });
  return {
    subscribe,
    set: async (data: Store<Database["public"]["Tables"]["Sales"]["Row"]>) =>
      set(data),
    create: async (data: Database["public"]["Tables"]["Sales"]["Insert"]) => {
      try {
        const response = await salesRepository.createSaleAsync(data);
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
        const response = await salesRepository.readSaleAsync(id);
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
        const response = await salesRepository.readSalesAsync(options);
        if (response.error) {
          throw new Error(response.error.message);
        }
        const pages = Math.ceil(response.count! / (options?.limit! ?? 10));
        set({
          data: response.data,
          count: response.count ?? 0,
          pages,
        });
        return { data: response.data, count: response.count ?? 0, pages };
      } catch (error) {
        console.log(error);
      }
    },
    update: async (data: Database["public"]["Tables"]["Sales"]["Update"]) => {
      try {
        if (!data.id || data.id === 0) {
          throw new Error("ID is required to update a sale");
        }
        const response = await salesRepository.updateSaleAsync(data);
        if (response.error) {
          throw new Error(response.error.message);
        }
        update((store) => {
          store.data = store.data.map((sale) =>
            sale.id === data.id ? response.data : sale,
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
        const response = await salesRepository.deleteSaleAsync(id);
        if (response.error) {
          throw new Error(response.error.message);
        }
        update((store) => {
          store.data = store.data.filter((sale) => sale.id !== id);
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

export const saleStore = createSaleStore();
