import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export interface IUsersRepository {
  createUserAsync(
    request: Database["public"]["Tables"]["Users"]["Insert"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Users"]["Row"]>
  >;
  readUserAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Users"]["Row"]>
  >;
  readUsersAsync(): Promise<
    PostgrestSingleResponse<Array<Database["public"]["Tables"]["Users"]["Row"]>>
  >;
  updateUserAsync(
    request: Database["public"]["Tables"]["Users"]["Update"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Users"]["Row"]>
  >;
  deleteUserAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Users"]["Row"]>
  >;
}
