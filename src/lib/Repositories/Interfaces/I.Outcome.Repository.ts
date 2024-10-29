import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export interface IOutcomeRepository {
  createOutcomeAsync(
    request: Database["public"]["Tables"]["Outcome"]["Insert"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Outcome"]["Row"]>
  >;
  readOutcomeAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Outcome"]["Row"]>
  >;
  readOutcomesAsync(
    options?: GenericListOptions,
    inbox_id?: number
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Outcome"]["Row"]>
    >
  >;
  readOutcomesWithoutFilterAsync(): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Outcome"]["Row"]>
    >
  >;
  readOutcomesByProjectIdAsync(
    projectId: number
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Outcome"]["Row"]>
    >
  >;
  readOutcomesByProjectIdsAsync(
    projectIds: number[]
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Outcome"]["Row"]>
    >
  >;
  readOutcomesByWorkerIdAsync(
    workerId: number
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Outcome"]["Row"]>
    >
  >;
  readOutcomesByWorkerIdsAsync(
    workerIds: number[]
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Outcome"]["Row"]>
    >
  >;
  readOutcomesByProjectIdAndWorkerIdAsync(
    projectId: number,
    workerId: number
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Outcome"]["Row"]>
    >
  >;
  readOutcomesByProjectIdsAndWorkerIdsAsync(
    projectIds: number[],
    workerIds: number[]
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Outcome"]["Row"]>
    >
  >;
  readOutcomesByProjectIdAndWorkerIdsAsync(
    projectId: number,
    workerIds: number[]
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Outcome"]["Row"]>
    >
  >;
  readOutcomesByWorkerIdAndProjectIdsAsync(
    workerId: number,
    projectIds: number[]
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Outcome"]["Row"]>
    >
  >;
  updateOutcomeAsync(
    data: Database["public"]["Tables"]["Outcome"]["Update"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Outcome"]["Row"]>
  >;
  deleteOutcomeAsync(id: number): Promise<void>;
}
