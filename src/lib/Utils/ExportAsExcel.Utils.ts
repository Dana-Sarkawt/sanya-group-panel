import { utils, writeFileXLSX } from "xlsx";

export async function exportAsExcelFile(store: any, name?: string) {
  const data = await store.getAllWithoutFilter();
  const ws = utils.json_to_sheet(data.data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  writeFileXLSX(wb, `${name ?? "Data"}.xlsx`);
}
