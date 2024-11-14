import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { UsersRepository } from "$lib/Repositories/Implementations/Users.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { get, writable } from "svelte/store";
import { toastStore } from "./Toast.Store";
import { _ } from "svelte-i18n";

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
          throw new Error(get(_)("email-is-required"));
        }
        if (!data.phone || data.phone === "") {
          throw new Error(get(_)("phone-is-required"));
        }
        const response = await usersRepository.createUserAsync(data);
        if (response.error) {
          throw new Error(get(_)("failed-to-create-user"));
        }
        toastStore.success(get(_)("user-created-successfully"));
        update((store) => {
          store.data.push(response.data);
          store.count++;
          return store;
        });
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-create-user"));
        }
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
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-user"));
        }
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
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-user"));
        }
      }
    },
    getAllWithoutFilter: async () => {
      try {
        const response = await usersRepository.readUsersWithoutFilterAsync();
        if (response.error) {
          throw new Error(response.error.message);
        }
        return {
          data: response.data,
          count: response.count ?? 0,
        };
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-user"));
        }
      }
    },
    update: async (data: Database["public"]["Tables"]["Users"]["Update"]) => {
      try {
        if (!data.id || data.id === 0) {
          throw new Error(get(_)("id-is-required"));
        }
        if (!data.email || data.email === "") {
          throw new Error(get(_)("email-is-required"));
        }
        if (!data.phone || data.phone === "") {
          throw new Error(get(_)("phone-is-required"));
        }
        const response = await usersRepository.updateUserAsync(data);
        if (response.error) {
          throw new Error(get(_)("failed-to-update-user"));
        }
        toastStore.success(get(_)("user-updated-successfully"));
        update((store) => {
          const index = store.data.findIndex((user) => user.id === data.id);
          store.data[index] = response.data;
          return store;
        });
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-update-user"));
        }
      }
    },
    delete: async (id: number) => {
      try {
        const response = await usersRepository.deleteUserAsync(id);
        if (response.error) {
          throw new Error(response.error.message);
        }
        toastStore.success(get(_)("user-deleted-successfully"));
        update((store) => {
          store.data = store.data.filter((user) => user.id !== id);
          store.count--;
          return store;
        });
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-delete-user"));
        }
      }
    },
  };
};

export const userStore = createUserStore();
