import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export interface IPreparationsRepository {
  createPreparationAsync(
    request: Database["public"]["Tables"]["Preparations"]["Insert"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Preparations"]["Row"]>
  >;
  readPreparationAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Preparations"]["Row"]>
  >;
  readPreparationsAsync(
    options?: GenericListOptions
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Preparations"]["Row"]>
    >
  >;
  readOverhaulDepositsByProjectIdAsync(projectId: number): Promise<
    PostgrestSingleResponse<
      {
        overall_total_price: number;
        overall_count: number;
      }
    >
  >;
  readOverhaulFinancialsByProjectIdAsync(projectId: number): Promise<
    PostgrestSingleResponse<
      {
        overall_total_price: number;
        overall_count: number;
      }
    >
  >;
  readDepositsByPreparationIdsAsync(
    ids: number[]
  ): Promise<
    PostgrestSingleResponse<
      Array<{
        preparation_id: number;
        deposit_count: number;
        total_price: number;
      }>
    >
  >;
  readFinancialByPreparationIdsAsync(
    ids: number[]
  ): Promise<
    PostgrestSingleResponse<
      Array<{
        preparation_id: number;
        financial_count: number;
        total_price: number;
      }>
    >
  >;
  updatePreparationAsync(
    request: Database["public"]["Tables"]["Preparations"]["Update"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Preparations"]["Row"]>
  >;
  deletePreparationAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Preparations"]["Row"]>
  >;
}
