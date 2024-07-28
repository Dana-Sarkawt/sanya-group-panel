import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { IDepositsRepository } from "../Interfaces/I.Deposits.Repository";
import { Supabase } from "$lib/Supabase/Supabase";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";

export class DepositsRepository implements IDepositsRepository {
  async createDepositAsync(
    request: Database["public"]["Tables"]["Deposits"]["Insert"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Deposits"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Deposits")
        .insert(request)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readDepositAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Deposits"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Deposits")
        .select("*")
        .eq("id", id)
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readDepositsAsync(
    options?: GenericListOptions
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Deposits"]["Row"]>
    >
  > {
    try {
      const response = Supabase.client
        .from("Deposits")
        .select("*", { count: "exact" });

      if (options?.field && options?.equal) {
        response.eq(options.field, options.equal);
      }
      return await response.order("id", { ascending: false });
    } catch (error) {
      throw error;
    }
  }
  async updateDepositAsync(
    request: Database["public"]["Tables"]["Deposits"]["Update"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Deposits"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Deposits")
        .update(request)
        .eq("id", request.id!)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async deleteDepositAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Deposits"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Deposits")
        .update({ deleted_at: new Date().toUTCString() })
        .eq("id", id)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
