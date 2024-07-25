import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export interface ISalesRepository {
  createSaleAsync(
    request: Database["public"]["Tables"]["Sales"]["Insert"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Sales"]["Row"]>
  >;
  readSaleAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Sales"]["Row"]>
  >;
  readSalesAsync(
    options?: GenericListOptions,
  ): Promise<
    PostgrestSingleResponse<Array<Database["public"]["Tables"]["Sales"]["Row"]>>
  >;
  updateSaleAsync(
    request: Database["public"]["Tables"]["Sales"]["Update"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Sales"]["Row"]>
  >;
  deleteSaleAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Sales"]["Row"]>
  >;
}
