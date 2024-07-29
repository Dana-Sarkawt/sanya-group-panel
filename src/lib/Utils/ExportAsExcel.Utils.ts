import { utils, writeFileXLSX } from "xlsx";

export function exportAsExcelFile(data: any[], name?: string) {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  writeFileXLSX(wb, `${name ?? "Data"}.xlsx`);
}
