import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export interface IAuthRepository {
  getUserAsync(): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Users"]["Row"]>
  >;
  loginAsync(
    email: string,
    password: string
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Users"]["Row"]>
  >;
  logoutAsync(): Promise<void>;
}
