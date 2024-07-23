import { Supabase } from "$lib/Supabase/Supabase";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { IAuthRepository } from "../Interfaces/I.Auth.Repository";

export class AuthRepository implements IAuthRepository {
  async getUserAsync() : Promise<PostgrestSingleResponse<Database["public"]["Tables"]["Users"]["Row"]>> {
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
        console.log(error);
        throw error;
      }
  }
  async loginAsync(
    email: string,
    password: string
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
