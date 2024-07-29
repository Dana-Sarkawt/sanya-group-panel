import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { UsersRepository } from "$lib/Repositories/Implementations/Users.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { get, writable } from "svelte/store";

const usersRepository = new UsersRepository();

const createUserStore = () => {
  const { subscribe, set, update } = writable<
    Store<Database["public"]["Tables"]["Users"]["Row"]>
  >({
    data: [],
    count: 0,
  });
  return {
    subscribe,
    set: async (data: Store<Database["public"]["Tables"]["Users"]["Row"]>) =>
      set(data),
    create: async (data: Database["public"]["Tables"]["Users"]["Insert"]) => {
      try {
        if (!data.email || data.email === "") {
          throw new Error("Email is required");
        }
        if (!data.phone || data.phone === "") {
          throw new Error("Phone is required");
        }
        const response = await usersRepository.createUserAsync(data);
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
        const response = await usersRepository.readUserAsync(id);
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
        const response = await usersRepository.readUsersAsync(options);
        if (response.error) {
          throw new Error(response.error.message);
        }
        set({
          data: response.data,
          count: response.count ?? 0,
        });
        return {
          data: response.data,
          count: response.count ?? 0,
        };
      } catch (error) {
        console.log(error);
      }
    },
    getAllWithoutFilter: async () => {
      try {
        const response = await usersRepository.readUsersWithouFilterAsync();
        if (response.error) {
          throw new Error(response.error.message);
        }
        return {
          data: response.data,
          count: response.count ?? 0,
        };
      } catch (error) {
        console.log(error);
      }
    },
    update: async (data: Database["public"]["Tables"]["Users"]["Update"]) => {
      try {
        if (!data.id || data.id === 0) {
          throw new Error("ID is required");
        }
        if (!data.email || data.email === "") {
          throw new Error("Email is required");
        }
        if (!data.phone || data.phone === "") {
          throw new Error("Phone is required");
        }
        const response = await usersRepository.updateUserAsync(data);
        if (response.error) {
          throw new Error(response.error.message);
        }
        update((store) => {
          const index = store.data.findIndex((user) => user.id === data.id);
          store.data[index] = response.data;
          return store;
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    delete: async (id: number) => {
      try {
        const response = await usersRepository.deleteUserAsync(id);
        if (response.error) {
          throw new Error(response.error.message);
        }
        update((store) => {
          store.data = store.data.filter((user) => user.id !== id);
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

export const userStore = createUserStore();
