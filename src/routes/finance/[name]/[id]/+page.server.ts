import { financialDueStore } from "$lib/Store/FinancialDue.Store.js";

export async function load({ params, url }) {
  const field = `${params.name}_id`;
  console.log(params);
  
  const financialDues = await financialDueStore.getAll({
    field: field,
    equal: params.id,
  });
  return {
    financialDues,
  };
}
