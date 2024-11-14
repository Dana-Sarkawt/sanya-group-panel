import type { User } from "$lib/Models/Request/User.Request.Model";
import { AuthRepository } from "$lib/Repositories/Implementations/Auth.Repository";
import { UsersRepository } from "$lib/Repositories/Implementations/Users.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { get, writable } from "svelte/store";
import { toastStore } from "./Toast.Store";
import { _ } from "svelte-i18n";

const authRepository = new AuthRepository();
const usersRepository = new UsersRepository();

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
        const checkEmail = await usersRepository.readUserByEmailAsync(
          request.email,
        );
        if (checkEmail.data) {
          throw new Error(get(_)("email-already-exists"));
        }
        const checkPhone = await usersRepository.readUserByPhoneAsync(
          request.phone,
        );
        if (checkPhone.data) {
          throw new Error(get(_)("phone-number-already-exists"));
        }
        const response = await authRepository.createAsync(request);
        if (response.error) {
          throw new Error(get(_)("failed-to-create-user"));
        }
        toastStore.success(get(_)("user-created-successfully"));
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-create-user"));
        }
      }
    },
    get: async () => {
      try {
        const response = await authRepository.getUserAsync();
        if (response.error) {
          throw new Error(get(_)("failed-to-get-user"));
        }
        set(response.data);
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-get-user"));
        }
        set(null);
        return null;
      }
    },
    login: async (email: string, password: string) => {
      try {
        const response = await authRepository.loginAsync(email, password);
        if (response.error) {
          throw new Error(get(_)("failed-to-login"));
        }
        set(response.data);
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-login"));
        }
        set(null);
      }
    },
    logout: async () => {
      try {
        await authRepository.logoutAsync();
        set(null);
      } catch (error) {
        if (error instanceof Error) {
          toastStore.error(error.message);
        } else {
          toastStore.error(get(_)("failed-to-logout"));
        }
        set(null);
      }
    },
  };
};

export const authStore = createAuthStore();
