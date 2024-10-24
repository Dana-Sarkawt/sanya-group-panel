import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { IWorkersRepository } from "../Interfaces/I.Workers.Repository";
import { Supabase } from "$lib/Supabase/Supabase";

export class WorkersRepository implements IWorkersRepository {
  async createWorkerAsync(
    request: Database["public"]["Tables"]["Workers"]["Insert"],
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
    id: number,
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
    options?: GenericListOptions,
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Workers"]["Row"]>
    >
  > {
    try {
      const response = Supabase.client
        .from("Workers")
        .select("*", { count: "exact" })
        .is("deleted_at", null);

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
  async readWorkersWithoutFilterAsync(projectId: number): Promise<
    PostgrestSingleResponse<
      Array<{
        Id: number;
        Name: string;
      }>
    >
  > {
    try {
      const response = await Supabase.client
        .from("Workers")
        .select("Id:id, Name:name")
        .eq("ProjectId", projectId)
        .is("deleted_at", null)
        .order("id", { ascending: true });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readOverhaulDepositsByProjectIdAsync(projectId: number): Promise<
    PostgrestSingleResponse<{
      overall_total_price: number;
      overall_count: number;
    }>
  > {
    try {
      const response = await Supabase.client
        .rpc("overall_deposits_by_project_for_workers", {
          p_project_id: projectId,
        })
        .select("*")
        .single();
      if (response.error) throw new Error(response.error.message);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readOverhaulFinancialsByProjectIdAsync(projectId: number): Promise<
    PostgrestSingleResponse<{
      overall_total_price: number;
      overall_count: number;
    }>
  > {
    try {
      const response = await Supabase.client
        .rpc("overall_financials_by_project_for_workers", {
          p_project_id: projectId,
        })
        .select("*")
        .single();
      if (response.error) throw new Error(response.error.message);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readDepositsByWorkerIdsAsync(ids: number[]): Promise<
    PostgrestSingleResponse<
      Array<{
        worker_id: number;
        deposit_count: number;
        total_price: number;
      }>
    >
  > {
    try {
      const response = await Supabase.client.rpc("count_deposits_by_workers", {
        worker_ids: ids,
      });
      if (response.error) throw new Error(response.error.message);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readFinancialByWorkerIdsAsync(ids: number[]): Promise<
    PostgrestSingleResponse<
      Array<{
        worker_id: number;
        financial_count: number;
        total_price: number;
      }>
    >
  > {
    try {
      const response = await Supabase.client.rpc(
        "count_financials_by_workers",
        {
          worker_ids: ids,
        },
      );
      if (response.error) throw new Error(response.error.message);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateWorkerAsync(
    request: Database["public"]["Tables"]["Workers"]["Update"],
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
    id: number,
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
