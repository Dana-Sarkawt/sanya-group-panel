import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { ProjectsRepository } from "$lib/Repositories/Implementations/Projects.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { writable } from "svelte/store";

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
          throw new Error("Name is required");
        }
        const response = await projectsRepository.createProjectAsync(data);
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
        const response = await projectsRepository.readProjectAsync(id);
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
        const response = await projectsRepository.readProjectsAsync();
        if (response.error) {
          throw new Error(response.error.message);
        }
        set({
          data: response.data,
          count: response.count ?? 0,
        });
        return { data: response.data, count: response.count ?? 0 };
      } catch (error) {
        console.log(error);
      }
    },
    update: async (
      data: Database["public"]["Tables"]["Projects"]["Update"]
    ) => {
      try {
        if (!data.id) {
          throw new Error("ID is required");
        }
        const response = await projectsRepository.updateProjectAsync(data);
        if (response.error) {
          throw new Error(response.error.message);
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
        console.log(error);
      }
    },
    delete: async (id: number) => {
      try {
        const response = await projectsRepository.deleteProjectAsync(id);
        if (response.error) {
          throw new Error(response.error.message);
        }
        update((store) => {
          const index = store.data.findIndex((project) => project.id === id);
          store.data.splice(index, 1);
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

export const projectStore = createProjectStore();
