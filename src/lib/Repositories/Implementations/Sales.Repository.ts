import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { ISalesRepository } from "../Interfaces/I.Sales.Repository";
import { Supabase } from "$lib/Supabase/Supabase";
import { GenericListOptions } from "../../Models/Common/ListOptions.Common.Model";

export class SalesRepository implements ISalesRepository {
  async createSaleAsync(
    request: Database["public"]["Tables"]["Sales"]["Insert"]
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
    id: number
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
  async readSalesAsync(
    options?: GenericListOptions
  ): Promise<
    PostgrestSingleResponse<Array<Database["public"]["Tables"]["Sales"]["Row"]>>
  > {
    try {
      const response = Supabase.client
        .from("Sales")
        .select("*", { count: "exact" })
        .is("deleted_at", null);

      if (options?.field && options?.equal) {
        response.eq(options.field, options.equal);
      }

      return await response
        .order("id", { ascending: false })
        .range(
          options?.page! * options?.limit!,
          options?.limit! * (options?.page! + 1)
        );
    } catch (error) {
      throw error;
    }
  }
  async readSalesWithoutFilterAsync(
    projectId: number
  ): Promise<
    PostgrestSingleResponse<Array<{ Id: number; Description: string | null }>>
  > {
    try {
      const response = await Supabase.client
        .from("Sales")
        .select("Id: id, Description: description")
        .eq("project_id", projectId)
        .is("deleted_at", null)
        .order("id", { ascending: true });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readDepositsBySaleIdsAsync(
    ids: number[]
  ): Promise<
    PostgrestSingleResponse<Array<{ sale_id: number; deposit_count: number }>>
  > {
    try {
      const response = await Supabase.client.rpc("count_deposits_by_sales", {
        sale_ids: ids,
      });
      if (response.error) {
        throw new Error(response.error.message);
      }
      console.log("response", response);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readFinancialBySaleIdsAsync(ids: number[]): Promise<
    PostgrestSingleResponse<
      Array<{
        sale_id: number;
        financial_count: number;
        total_price: number;
        overall_total_price: number;
        overall_count: number;
      }>
    >
  > {
    try {
      const response = await Supabase.client.rpc("count_financials_by_sales", {
        sale_ids: ids,
      });
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
  async updateSaleAsync(
    request: Database["public"]["Tables"]["Sales"]["Update"]
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
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Sales"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Sales")
        .update({ deleted_at: new Date().toUTCString() })
        .eq("id", id)
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
