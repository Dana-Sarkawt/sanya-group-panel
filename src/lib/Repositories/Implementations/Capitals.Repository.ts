import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { ICapitalsRepository } from "../Interfaces/I.Capitals.Repository";
import { Supabase } from "$lib/Supabase/Supabase";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";

export class CapitalsRepository implements ICapitalsRepository {
  async createCapitalAsync(
    request: Database["public"]["Tables"]["Capitals"]["Insert"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Capitals"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Capitals")
        .insert(request)
        .select("*")
        .single();

      return response;
    } catch (error) {
      throw error;
    }
  }
  async readCapitalAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Capitals"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Capitals")
        .select("*")
        .eq("id", id)
        .single();

      return response;
    } catch (error) {
      throw error;
    }
  }
  async readCapitalsAsync(
    options?: GenericListOptions
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Capitals"]["Row"]>
    >
  > {
    try {
      const response = Supabase.client
        .from("Capitals")
        .select("*", { count: "exact" });

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
  async readCapitalsTotalPriceAsync(projectId: number): Promise<number> {
    try {
      const response = await Supabase.client
        .from("Capitals")
        .select("price")
        .eq("project_id", projectId);
      if (response.error) {
        throw response.error;
      }

      return response.data.reduce(
        (acc: number, capital: any) => acc + capital.price,
        0
      );
    } catch (error) {
      throw error;
    }
  }
  async updateCapitalAsync(
    request: Database["public"]["Tables"]["Capitals"]["Update"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Capitals"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Capitals")
        .update(request)
        .eq("id", request.id!)
        .select("*")
        .single();

      return response;
    } catch (error) {
      throw error;
    }
  }
  async deleteCapitalAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Capitals"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Capitals")
        .delete()
        .eq("id", id)
        .single();

      return response;
    } catch (error) {
      throw error;
    }
  }
}
