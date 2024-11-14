import { goto } from "$app/navigation";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { ProjectsRepository } from "$lib/Repositories/Implementations/Projects.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { _ } from "svelte-i18n";
import { get, writable } from "svelte/store";
import { toastStore } from "./Toast.Store";

const projectsRepository = new ProjectsRepository();

const createProjectStore = () => {
  const { subscribe, set, update } = writable<
    Store<Database["public"]["Tables"]["Projects"]["Row"]>
  >({
    data: [],
    count: 0,
  });
  return {
    subscribe,
    set: async (data: Store<Database["public"]["Tables"]["Projects"]["Row"]>) =>
      set(data),
    create: async (
      data: Database["public"]["Tables"]["Projects"]["Insert"]
    ) => {
      try {
        if (!data.name || data.name === "") {
          throw new Error(get(_)("name-is-required"));
        }
        const response = await projectsRepository.createProjectAsync(data);
        if (response.error) {
          throw new Error(get(_)("failed-to-create-project"));
        }
        toastStore.success(get(_)("project-created-successfully"));
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
          toastStore.error(get(_)("failed-to-create-project"));
        }
      }
    },
    get: async (id: number) => {
      try {
        const response = await projectsRepository.readProjectAsync(id);
        if (response.error) {
          throw new Error(get(_)("failed-to-get-project"));
        }
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-project"));
        }
      }
    },
    getAll: async (options?: GenericListOptions) => {
      try {
        const response = await projectsRepository.readProjectsAsync(options);
        if (response.error) {
          throw new Error(get(_)("failed-to-get-project"));
        }
        const pages = Math.ceil(response.count! / (options?.limit! ?? 10));
        set({
          data: response.data,
          count: response.count ?? 0,
          pages: pages,
        });
        return {
          data: response.data,
          count: response.count ?? 0,
          pages: pages,
        };
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-project"));
        }
      }
    },
    getAllWithoutFilter: async () => {
      try {
        const response =
          await projectsRepository.readProjectsWithoutFilterAsync();
        if (response.error) {
          throw new Error(get(_)("failed-to-get-project"));
        }
        return {
          data: response.data,
          count: response.count ?? 0,
        };
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-project"));
        }
      }
    },
    getTotalPrice: async () => {
      try {
        const response =
          await projectsRepository.readTotalPriceOfProjectsAsync();
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-project"));
        }
      }
    },
    update: async (
      data: Database["public"]["Tables"]["Projects"]["Update"]
    ) => {
      try {
        if (!data.id) {
          throw new Error(get(_)("id-is-required"));
        }
        const response = await projectsRepository.updateProjectAsync(data);
        if (response.error) {
          throw new Error(get(_)("failed-to-update-project"));
        }
        update((store) => {
          const index = store.data.findIndex(
            (project) => project.id === data.id
          );
          store.data[index] = response.data;
          return store;
        });
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-update-project"));
        }
      }
    },
    delete: async (id: number) => {
      try {
        const response = await projectsRepository.deleteProjectAsync(id);
        if (response.error) {
          throw new Error(get(_)("failed-to-delete-project"));
        }
        update((store) => {
          const index = store.data.findIndex((project) => project.id === id);
          store.data.splice(index, 1);
          store.count--;
          return store;
        });
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-delete-project"));
        }
      }
    },
  };
};

export const projectStore = createProjectStore();
