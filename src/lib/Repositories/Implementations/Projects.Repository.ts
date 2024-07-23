import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { IProjectsRepository } from "../Interfaces/I.Projects.Repository";
import { Supabase } from "$lib/Supabase/Supabase";

export class ProjectsRepository implements IProjectsRepository {
  async createProjectAsync(
    request: Database["public"]["Tables"]["Projects"]["Insert"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Projects"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Projects")
        .insert(request)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readProjectAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Projects"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Projects")
        .select("*")
        .eq("id", id)
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readProjectsAsync(): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Projects"]["Row"]>
    >
  > {
    try {
      const response = await Supabase.client
        .from("Projects")
        .select("*", { count: "exact" })
        .order("id", { ascending: true });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async updateProjectAsync(
    request: Database["public"]["Tables"]["Projects"]["Update"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Projects"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Projects")
        .update(request)
        .eq("id", request.id!)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async deleteProjectAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Projects"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Projects")
        .delete()
        .eq("id", id)
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
