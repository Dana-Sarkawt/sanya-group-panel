import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { RolesRepository } from "$lib/Repositories/Implementations/Roles.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { writable } from "svelte/store";

const rolesRepository = new RolesRepository();

const createRoleStore = () => {
  const { subscribe, set, update } = writable<
    Store<Database["public"]["Tables"]["Roles"]["Row"]>
  >({
    data: [],
    count: 0,
  });
  return {
    subscribe,
    set: async (data: Store<Database["public"]["Tables"]["Roles"]["Row"]>) =>
      set(data),
    create: async (data: Database["public"]["Tables"]["Roles"]["Insert"]) => {
      try {
        if (!data.name || data.name === "") {
          throw new Error("Name is required");
        }
        const response = await rolesRepository.createRoleAsync(data);
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
        const response = await rolesRepository.readRoleAsync(id);
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
        const response = await rolesRepository.readRolesAsync(options);
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
        const response = await rolesRepository.readRolesWithoutFilterAsync();
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
    update: async (data: Database["public"]["Tables"]["Roles"]["Update"]) => {
      try {
        const response = await rolesRepository.updateRoleAsync(data);
        if (response.error) {
          throw new Error(response.error.message);
        }
        update((store) => {
          const index = store.data.findIndex((role) => role.id === data.id);
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
        const response = await rolesRepository.deleteRoleAsync(id);
        if (response.error) {
          throw new Error(response.error.message);
        }
        update((store) => {
          store.data = store.data.filter((role) => role.id !== id);
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

export const roleStore = createRoleStore();
