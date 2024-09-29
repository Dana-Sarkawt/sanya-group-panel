import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import { Supabase } from "$lib/Supabase/Supabase";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { IOutcomeRepository } from "../Interfaces/I.Outcome.Repository";

export class OutcomeRepository implements IOutcomeRepository {
  createOutcomeAsync(
    request: Database["public"]["Tables"]["Outcome"]["Insert"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Outcome"]["Row"]>
  > {
    throw new Error("Method not implemented.");
  }
  readOutcomesWithoutFilterAsync(): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Outcome"]["Row"]>
    >
  > {
    throw new Error("Method not implemented.");
  }
  async createIncomeAsync(
    request: Database["public"]["Tables"]["Outcome"]["Insert"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Outcome"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Outcome")
        .insert(request)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readOutcomeAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Outcome"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Outcome")
        .select("*")
        .eq("id", id)
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readOutcomesAsync(
    options?: GenericListOptions,
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Outcome"]["Row"]>
    >
  > {
    try {
      const response = Supabase.client
        .from("Outcome")
        .select("*", { count: "exact" });
      // .is("deleted_at", null);

      if (options?.field && options?.equal) {
        response.eq(options.field, options.equal);
      }

      return await response
        .order("id", { ascending: false })
        .range(
          options?.page! * options?.limit!,
          options?.limit! * (options?.page! + 1),
        );
    } catch (error) {
      throw error;
    }
  }

  async createOverallOutcomeAsync(projectId: number) {
    try {
      const response = await Supabase.client.rpc("calculate_outcome", {
        project_id_input: projectId,
      });
      console.log("Hello there", response);
    } catch (error) {
      throw error;
    }
  }
}
