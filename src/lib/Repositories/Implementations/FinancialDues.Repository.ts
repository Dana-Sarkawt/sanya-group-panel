import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { IFinancialDuesRepository } from "../Interfaces/I.FinancialDues.Repository";
import { Supabase } from "$lib/Supabase/Supabase";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";

export class FinancialDuesRepository implements IFinancialDuesRepository {
  async createFinancialDueAsync(
    request: Database["public"]["Tables"]["Financial Dues"]["Insert"]
  ): Promise<
    PostgrestSingleResponse<
      Database["public"]["Tables"]["Financial Dues"]["Row"]
    >
  > {
    try {
      const response = await Supabase.client
        .from("Financial Dues")
        .insert(request)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readFinancialDueAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<
      Database["public"]["Tables"]["Financial Dues"]["Row"]
    >
  > {
    try {
      const response = await Supabase.client
        .from("Financial Dues")
        .select("*")
        .eq("id", id)
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readFinancialDuesAsync(
    options?: GenericListOptions
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Financial Dues"]["Row"]>
    >
  > {
    try {
      const response = Supabase.client
        .from("Financial Dues")
        .select("*", { count: "exact" });

      if (options?.field && options?.equal) {
        response.eq(options.field, options.equal);
      }

      return await response.order("id", { ascending: true });
    } catch (error) {
      throw error;
    }
  }
  async updateFinancialDueAsync(
    request: Database["public"]["Tables"]["Financial Dues"]["Update"]
  ): Promise<
    PostgrestSingleResponse<
      Database["public"]["Tables"]["Financial Dues"]["Row"]
    >
  > {
    try {
      const response = await Supabase.client
        .from("Financial Dues")
        .update(request)
        .eq("id", request.id!)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async deleteFinancialDueAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<
      Database["public"]["Tables"]["Financial Dues"]["Row"]
    >
  > {
    try {
      const response = await Supabase.client
        .from("Financial Dues")
        .delete()
        .eq("id", id)
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
