import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { IDailysRepository } from "../Interfaces/I.Dailys.Repository";
import { Supabase } from "$lib/Supabase/Supabase";

export class DailysRepository implements IDailysRepository {
  async createDailyAsync(
    request: Database["public"]["Tables"]["Dailys"]["Insert"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Dailys"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Dailys")
        .insert(request)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readDailyAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Dailys"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Dailys")
        .select("*")
        .eq("id", id)
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readDailysAsync(
    options?: GenericListOptions
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Dailys"]["Row"]>
    >
  > {
    try {
      const response = await Supabase.client
        .from("Dailys")
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
  async updateDailyAsync(
    request: Database["public"]["Tables"]["Dailys"]["Update"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Dailys"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Dailys")
        .update(request)
        .eq("id", request.id!)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async deleteDailyAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Dailys"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Dailys")
        .delete()
        .eq("id", id)
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
