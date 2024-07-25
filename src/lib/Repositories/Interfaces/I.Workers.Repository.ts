import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export interface IWorkersRepository {
  createWorkerAsync(
    request: Database["public"]["Tables"]["Workers"]["Insert"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Workers"]["Row"]>
  >;
  readWorkerAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Workers"]["Row"]>
  >;
  readWorkersAsync(
    options?: GenericListOptions,
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Workers"]["Row"]>
    >
  >;
  updateWorkerAsync(
    request: Database["public"]["Tables"]["Workers"]["Update"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Workers"]["Row"]>
  >;
  deleteWorkerAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Workers"]["Row"]>
  >;
}
