import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";

export interface IProjectsRepository {
  createProjectAsync(
    request: Database["public"]["Tables"]["Projects"]["Insert"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Projects"]["Row"]>
  >;
  readProjectAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Projects"]["Row"]>
  >;
  readProjectsAsync(
    options?: GenericListOptions,
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Projects"]["Row"]>
    >
  >;
  updateProjectAsync(
    request: Database["public"]["Tables"]["Projects"]["Update"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Projects"]["Row"]>
  >;
  deleteProjectAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Projects"]["Row"]>
  >;
}
