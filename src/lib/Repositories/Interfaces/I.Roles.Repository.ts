import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { GenericListOptions } from "../../Models/Common/ListOptions.Common.Model";

export interface IRolesRepository {
  createRoleAsync(
    request: Database["public"]["Tables"]["Roles"]["Insert"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Roles"]["Row"]>
  >;
  readRoleAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Roles"]["Row"]>
  >;
  readRolesAsync(
    options?: GenericListOptions,
  ): Promise<
    PostgrestSingleResponse<Array<Database["public"]["Tables"]["Roles"]["Row"]>>
  >;
  updateRoleAsync(
    request: Database["public"]["Tables"]["Roles"]["Update"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Roles"]["Row"]>
  >;
  deleteRoleAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Roles"]["Row"]>
  >;
}
