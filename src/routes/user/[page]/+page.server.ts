import { userStore } from "$lib/Store/User.Store";

export async function load() {
  const users = await userStore.getAll();
  return {
    users,
  };
}
