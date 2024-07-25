import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { IPreparationsRepository } from "../Interfaces/I.Preparations.Repository";
import { Supabase } from "$lib/Supabase/Supabase";

export class PreparationsRepository implements IPreparationsRepository {
  async createPreparationAsync(
    request: Database["public"]["Tables"]["Preparations"]["Insert"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Preparations"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Preparations")
        .insert(request)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readPreparationAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Preparations"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Preparations")
        .select("*")
        .eq("id", id)
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readPreparationsAsync(
    options?: GenericListOptions,
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Preparations"]["Row"]>
    >
  > {
    try {
      const response = Supabase.client
        .from("Preparations")
        .select("*", { count: "exact" });

      if (options?.field && options?.equal) {
        response.eq(options.field, options.equal);
      }

      return await response
        .order("id", { ascending: true })
        .range(
          options?.page! * options?.limit!,
          options?.limit! * (options?.page! + 1),
        );
    } catch (error) {
      throw error;
    }
  }
  async updatePreparationAsync(
    request: Database["public"]["Tables"]["Preparations"]["Update"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Preparations"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Preparations")
        .update(request)
        .eq("id", request.id!)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async deletePreparationAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Preparations"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Preparations")
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
