import type { User } from "$lib/Models/Request/User.Request.Model";
import { AuthRepository } from "$lib/Repositories/Implementations/Auth.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { get, writable } from "svelte/store";

const authRepository = new AuthRepository();

const createAuthStore = () => {
  const { subscribe, set, update } = writable<
    Database["public"]["Tables"]["Users"]["Row"] | null
  >(null);
  return {
    subscribe,
    set: async (data: Database["public"]["Tables"]["Users"]["Row"] | null) =>
      set(data),
    create: async (request: User.Create) => {
      try {
        const response = await authRepository.createAsync(request);
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    get: async () => {
      try {
        const response = await authRepository.getUserAsync();
        if (response.error) {
          throw new Error(response.error.message);
        }
        set(response.data);
        console.log(response.data);
        return response;
      } catch (error) {
        console.log(error);
        set(null);
        return null;
      }
    },
    login: async (email: string, password: string) => {
      try {
        const response = await authRepository.loginAsync(email, password);
        if (response.error) {
          throw new Error(response.error.message);
        }
        set(response.data);
        return response;
      } catch (error) {
        console.log(error);
        set(null);
      }
    },
    logout: async () => {
      try {
        await authRepository.logoutAsync();
        set(null);
      } catch (error) {
        console.log(error);
        set(null);
      }
    },
  };
};

export const authStore = createAuthStore();
