import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export interface ICapitalsRepository {
  createCapitalAsync(
    request: Database["public"]["Tables"]["Capitals"]["Insert"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Capitals"]["Row"]>
  >;
  readCapitalAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Capitals"]["Row"]>
  >;
  readCapitalsAsync(): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Capitals"]["Row"]>
    >
  >;
  updateCapitalAsync(
    request: Database["public"]["Tables"]["Capitals"]["Update"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Capitals"]["Row"]>
  >;
  deleteCapitalAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Capitals"]["Row"]>
  >;
}
