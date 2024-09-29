import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export interface IOutcomeRepository {
  createOutcomeAsync(
    request: Database["public"]["Tables"]["Outcome"]["Insert"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Outcome"]["Row"]>
  >;
  readOutcomeAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Outcome"]["Row"]>
  >;
  readOutcomesAsync(
    options?: GenericListOptions,
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Outcome"]["Row"]>
    >
  >;
  readOutcomesWithoutFilterAsync(): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Outcome"]["Row"]>
    >
  >;
  createOverallOutcomeAsync(projectId: number): Promise<void>;
}
