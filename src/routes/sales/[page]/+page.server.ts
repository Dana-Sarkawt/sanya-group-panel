import { saleStore } from "$lib/Store/Sale.Store";

export async function load() {
  const sales = await saleStore.getAll();
  return {
    sales,
  };
}
