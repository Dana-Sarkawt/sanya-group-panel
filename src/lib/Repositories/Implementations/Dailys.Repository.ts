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
      const response = Supabase.client
        .from("Dailys")
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
  async readDailysWithoutFilterAsync(projectId: number) {
    try {
      const response = await Supabase.client
        .from("Dailys")
        .select("Id:id, Description:description, Price:price, Date:date")
        .eq("project_id", projectId)
        .is("deleted_at", null)
        .order("id", { ascending: false });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readDailysTotalPriceAsync(projectId: number): Promise<number> {
    try {
      const response = await Supabase.client
        .from("Dailys")
        .select("price", { count: "exact" })
        .is("deleted_at", null)
        .eq("project_id", projectId);

      if (response.error) {
        throw response.error;
      }

      const totalPrice = response.data.reduce(
        (acc, curr) => acc + curr.price,
        0
      );
      return totalPrice;
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
        .update({ deleted_at: new Date().toUTCString() })
        .eq("id", id)
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
