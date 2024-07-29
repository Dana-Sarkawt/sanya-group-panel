import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { IWorkersRepository } from "../Interfaces/I.Workers.Repository";
import { Supabase } from "$lib/Supabase/Supabase";

export class WorkersRepository implements IWorkersRepository {
  async createWorkerAsync(
    request: Database["public"]["Tables"]["Workers"]["Insert"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Workers"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Workers")
        .insert(request)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readWorkerAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Workers"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Workers")
        .select("*")
        .eq("id", id)
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readWorkersAsync(
    options?: GenericListOptions
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Workers"]["Row"]>
    >
  > {
    try {
      const response = Supabase.client
        .from("Workers")
        .select("*", { count: "exact" });

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
  readDepositsByWorkerIdsAsync(ids: number[]): Promise<
    PostgrestSingleResponse<
      Array<{
        worker_id: number;
        deposit_count: number;
      }>
    >
  > {
    throw new Error("Method not implemented.");
  }
  readFinancialByWorkerIdsAsync(ids: number[]) {
    throw new Error("Method not implemented.");
  }
  async updateWorkerAsync(
    request: Database["public"]["Tables"]["Workers"]["Update"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Workers"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Workers")
        .update(request)
        .eq("id", request.id!)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async deleteWorkerAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Workers"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Workers")
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
