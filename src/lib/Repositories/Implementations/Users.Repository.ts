import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { IUsersRepository } from "../Interfaces/I.Users.Repository";
import { Supabase } from "$lib/Supabase/Supabase";

export class UsersRepository implements IUsersRepository {
  async createUserAsync(
    request: Database["public"]["Tables"]["Users"]["Insert"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Users"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Users")
        .insert(request)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readUserAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Users"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Users")
        .select("*")
        .eq("id", id)
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readUsersAsync(): Promise<
    PostgrestSingleResponse<Array<Database["public"]["Tables"]["Users"]["Row"]>>
  > {
    try {
      const response = await Supabase.client
        .from("Users")
        .select("*", { count: "exact" })
        .order("id", { ascending: true });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async updateUserAsync(
    request: Database["public"]["Tables"]["Users"]["Update"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Users"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Users")
        .update(request)
        .select("*")
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async deleteUserAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Users"]["Row"]>
  > {
    try {
      const response = await Supabase.client
        .from("Users")
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
