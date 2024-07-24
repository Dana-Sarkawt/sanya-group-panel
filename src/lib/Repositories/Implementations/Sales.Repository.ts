import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { ISalesRepository } from "../Interfaces/I.Sales.Repository";
import { Supabase } from "$lib/Supabase/Supabase";
import { GenericListOptions } from '../../Models/Common/ListOptions.Common.Model';

export class SalesRepository implements ISalesRepository {
  async createSaleAsync(
    request: Database["public"]["Tables"]["Sales"]["Insert"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Sales"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Sales")
        .insert(request)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readSaleAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Sales"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Sales")
        .select("*")
        .eq("id", id)
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readSalesAsync(options?:GenericListOptions): Promise<
    PostgrestSingleResponse<Array<Database["public"]["Tables"]["Sales"]["Row"]>>
  > {
    try {
      const response = Supabase.client
        .from("Sales")
        .select("*", { count: "exact" })

        if (options?.field && options?.equal) {
          response.eq(options.field, options.equal);
        }
  
        return await response
          .order("id", { ascending: true })
          .range(
            options?.page! * options?.limit!,
            options?.limit! * (options?.page! + 1)
          );
    } catch (error) {
      throw error;
    }
  }
  async updateSaleAsync(
    request: Database["public"]["Tables"]["Sales"]["Update"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Sales"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Sales")
        .update(request)
        .eq("id", request.id!)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async deleteSaleAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Sales"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Sales")
        .delete()
        .eq("id", id)
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
