import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { IRolesRepository } from "../Interfaces/I.Roles.Repository";
import { Supabase } from "$lib/Supabase/Supabase";

export class RolesRepository implements IRolesRepository {
  async createRoleAsync(
    request: Database["public"]["Tables"]["Roles"]["Insert"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Roles"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Roles")
        .insert(request)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readRoleAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Roles"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Roles")
        .select("*")
        .eq("id", id)
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readRolesAsync(): Promise<
    PostgrestSingleResponse<Array<Database["public"]["Tables"]["Roles"]["Row"]>>
  > {
    try {
      const response = await Supabase.client
        .from("Roles")
        .select("*", { count: "exact" })
        .order("id", { ascending: true });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async updateRoleAsync(
    request: Database["public"]["Tables"]["Roles"]["Update"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Roles"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Roles")
        .update(request)
        .eq("id", request.id!)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async deleteRoleAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Roles"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Roles")
        .delete()
        .eq("id", id)
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
}