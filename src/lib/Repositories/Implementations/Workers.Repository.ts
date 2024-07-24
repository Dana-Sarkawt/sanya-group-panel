import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { IWorkersRepository } from "../Interfaces/I.Workers.Repository";
import { Supabase } from "$lib/Supabase/Supabase";

export class WorkersRepository implements IWorkersRepository {
  async createWorkerAsync(
    request: Database["public"]["Tables"]["Workers"]["Insert"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Workers"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Workers")
        .insert(request)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readWorkerAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Workers"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Workers")
        .select("*")
        .eq("id", id)
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readWorkersAsync(
    options?: GenericListOptions
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Workers"]["Row"]>
    >
  > {
    try {
      const response = await Supabase.client
        .from("Workers")
        .select("*", { count: "exact" })
        .order("id", { ascending: true })
        .range(
          options?.page! * options?.limit!,
          options?.limit! * (options?.page! + 1)
        );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async updateWorkerAsync(
    request: Database["public"]["Tables"]["Workers"]["Update"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Workers"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Workers")
        .update(request)
        .eq("id", request.id!)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async deleteWorkerAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Workers"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Workers")
        .delete()
        .eq("id", id)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
