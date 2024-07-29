import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export interface ISalesRepository {
  createSaleAsync(
    request: Database["public"]["Tables"]["Sales"]["Insert"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Sales"]["Row"]>
  >;
  readSaleAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Sales"]["Row"]>
  >;
  readSalesAsync(
    options?: GenericListOptions
  ): Promise<
    PostgrestSingleResponse<Array<Database["public"]["Tables"]["Sales"]["Row"]>>
  >;
  readOverhaulDepositsByProjectIdAsync(projectId: number): Promise<
    PostgrestSingleResponse<
      Array<{
        overall_total_price: number;
        overall_count: number;
      }>
    >
  >;
  readOverhaulFinancialsByProjectIdAsync(projectId: number): Promise<
    PostgrestSingleResponse<
      Array<{
        overall_total_price: number;
        overall_count: number;
      }>
    >
  >;
  readDepositsBySaleIdsAsync(
    ids: number[]
  ): Promise<
    PostgrestSingleResponse<
    Array<{ 
      sale_id: number; 
      deposit_count: number,
      total_price: number
    }>>
  >;
  readFinancialBySaleIdsAsync(ids: number[]): Promise<
    PostgrestSingleResponse<
      Array<{
        sale_id: number;
        financial_count: number;
        total_price: number;
      }>
    >
  >;
  updateSaleAsync(
    request: Database["public"]["Tables"]["Sales"]["Update"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Sales"]["Row"]>
  >;
  deleteSaleAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Sales"]["Row"]>
  >;
}
