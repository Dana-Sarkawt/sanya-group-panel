import { userStore } from "$lib/Store/User.Store";

export async function load({ params, url }) {
  const page = Number(params.page);
  const users = await userStore.getAll({
    limit: 10,
    page: page,
  });
  return {
    users,
  };
}
