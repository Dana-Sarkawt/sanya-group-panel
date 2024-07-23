import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { ICapitalsRepository } from "../Interfaces/I.Capitals.Repository";
import { Supabase } from "$lib/Supabase/Supabase";

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
  async readCapitalsAsync(): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Capitals"]["Row"]>
    >
  > {
    try {
      const response = await Supabase.client
        .from("Capitals")
        .select("*", { count: "exact" })
        .order("id", { ascending: true });

      return response;
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