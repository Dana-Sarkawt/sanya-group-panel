import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { UsersRepository } from "$lib/Repositories/Implementations/Users.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { writable } from "svelte/store";

const usersRepository = new UsersRepository();

const createUserStore = () => {
  const { subscribe, set, update } = writable<
    Store<Database["public"]["Tables"]["Users"]["Row"]>
  >({
    data: [],
    count: 0,
  });
};
