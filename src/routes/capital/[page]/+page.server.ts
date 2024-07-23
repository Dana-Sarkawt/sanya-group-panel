import { capitalStore } from "$lib/Store/Capital.Store";

export async function load() {
  const capitals = await capitalStore.getAll();
  return {
    capitals,
  };
}
