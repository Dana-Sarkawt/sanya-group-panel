import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export interface IIncomeRepository {
  createOverallIncomeAsync(projectId: number): Promise<void>;
  createIncomeAsync(
    request: Database["public"]["Tables"]["Income"]["Insert"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Income"]["Row"]>
  >;
  readIncomeAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Income"]["Row"]>
  >;
  readIncomesAsync(
    options?: GenericListOptions,
    inbox_id?: number
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Income"]["Row"]>
    >
  >;
  readIncomesWithoutFilterAsync(): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Income"]["Row"]>
    >
  >;
  updateIncomeAsync(
    data: Database["public"]["Tables"]["Income"]["Update"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Income"]["Row"]>
  >;
  deleteIncomeAsync(id: number): Promise<void>;
}
