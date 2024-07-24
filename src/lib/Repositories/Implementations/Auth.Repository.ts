import { Supabase } from "$lib/Supabase/Supabase";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { IAuthRepository } from "../Interfaces/I.Auth.Repository";
import type { User } from "$lib/Models/Request/User.Request.Model";

export class AuthRepository implements IAuthRepository {
  async createAsync(
    request: User.Create,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Users"]["Row"]>
  > {
    try {
      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      const user = (await response.json()) as PostgrestSingleResponse<
        Database["public"]["Tables"]["Users"]["Row"]
      >;
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getUserAsync(): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Users"]["Row"]>
  > {
    try {
      const response = await Supabase.client.auth.getUser();
      if (response.error) {
        throw new Error(response.error.message);
      }
      const user = await Supabase.client
        .from("Users")
        .select("*")
        .eq("user_uid", response.data.user.id)
        .single();
      return user;
    } catch (error) {
      throw error;
    }
  }
  async loginAsync(
    email: string,
    password: string,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Users"]["Row"]>
  > {
    try {
      const response = await Supabase.client.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (response.error) {
        throw new Error(response.error.message);
      }
      const user = await Supabase.client
        .from("Users")
        .select("*")
        .eq("user_uid", response.data.user.id)
        .single();
      return user;
    } catch (error) {
      throw error;
    }
  }
  async logoutAsync(): Promise<void> {
    try {
      await Supabase.client.auth.signOut();
    } catch (error) {
      throw error;
    }
  }
}
