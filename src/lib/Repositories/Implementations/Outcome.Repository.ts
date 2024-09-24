import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { IOutcomeRepository } from "../Interfaces/I.Outcome.Repository";
import { Supabase } from "$lib/Supabase/Supabase";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";

export class OutcomeRepository implements IOutcomeRepository {
  readOutcomesByProjectIdAsync(projectId: number): Promise<PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>> {
      throw new Error("Method not implemented.");
  }
  readOutcomesByProjectIdsAsync(projectIds: number[]): Promise<PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>> {
      throw new Error("Method not implemented.");
  }
  readOutcomesByWorkerIdAsync(workerId: number): Promise<PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>> {
      throw new Error("Method not implemented.");
  }
  readOutcomesByWorkerIdsAsync(workerIds: number[]): Promise<PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>> {
      throw new Error("Method not implemented.");
  }
  readOutcomesByProjectIdAndWorkerIdAsync(projectId: number, workerId: number): Promise<PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>> {
      throw new Error("Method not implemented.");
  }
  readOutcomesByProjectIdsAndWorkerIdsAsync(projectIds: number[], workerIds: number[]): Promise<PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>> {
      throw new Error("Method not implemented.");
  }
  readOutcomesByProjectIdAndWorkerIdsAsync(projectId: number, workerIds: number[]): Promise<PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>> {
      throw new Error("Method not implemented.");
  }
  readOutcomesByWorkerIdAndProjectIdsAsync(workerId: number, projectIds: number[]): Promise<PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>> {
      throw new Error("Method not implemented.");
  }
  async createOutcomeAsync(
    request: Database["public"]["Tables"]["Outcome"]["Insert"]
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
    id: number
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
    options?: GenericListOptions
  ): Promise<
    PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>
  > {
    try {
      const response = Supabase.client
        .from("Outcome")
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
  async readOutcomesWithoutFilterAsync(): Promise<
    PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>
  > {
    try {
      const response = await Supabase.client
        .from("Outcome")
        .select("*")
        .is("deleted_at", null);
      return response;
    } catch (error) {
      throw error;
    }
  }
}