import { saleStore } from "$lib/Store/Sale.Repository";

export async function load() {
  const sales = await saleStore.getAll();
  return {
    sales,
  };
}
