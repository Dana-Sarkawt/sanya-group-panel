import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export interface IPreparationsRepository {
  createPreparationAsync(
    request: Database["public"]["Tables"]["Preparations"]["Insert"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Preparations"]["Row"]>
  >;
  readPreparationAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Preparations"]["Row"]>
  >;
  readPreparationsAsync(
    options?: GenericListOptions,
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Preparations"]["Row"]>
    >
  >;
  updatePreparationAsync(
    request: Database["public"]["Tables"]["Preparations"]["Update"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Preparations"]["Row"]>
  >;
  deletePreparationAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Preparations"]["Row"]>
  >;
}
