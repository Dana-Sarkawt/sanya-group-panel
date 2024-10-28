import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { InboxEntity } from "$lib/Models/Entity/Inbox.Entity.Model";
import type { IInboxRepository } from "$lib/Repositories/Interfaces/I.Inbox.Repository";
import { Supabase } from "$lib/Supabase/Supabase";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export class InboxRepository implements IInboxRepository {
  async createInboxAsync(
    request: Database["public"]["Tables"]["Inbox"]["Insert"]
  ): Promise<PostgrestSingleResponse<InboxEntity>> {
    try {
      const response = await Supabase.client
        .from("Inbox")
        .insert(request)
        .select("*")
        .returns<InboxEntity>()
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async readInboxAsync(
    id: number
  ): Promise<PostgrestSingleResponse<InboxEntity>> {
    try {
      const response = await Supabase.client
        .from("Inbox")
        .select("*")
        .eq("id", id)
        .returns<InboxEntity>()
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async readInboxesAsync(
    options?: GenericListOptions
  ): Promise<PostgrestSingleResponse<InboxEntity[]>> {
    try {
      const response = Supabase.client
        .from("Inbox")
        .select(
          "*,income:Income(overall_price),outcome:Outcome(overall_price)",
          {
            count: "exact",
          }
        )
        .is("deleted_at", null);

      if (options?.field && options?.equal) {
        response.eq(options.field, options.equal);
      }

      return await response
        .order("id", { ascending: false })
        .returns<InboxEntity[]>()
        .range(
          options?.page! * options?.limit!,
          options?.limit! * (options?.page! + 1)
        );
    } catch (error) {
      throw error;
    }
  }

  async updateInboxAsync(
    request: Database["public"]["Tables"]["Inbox"]["Update"]
  ): Promise<PostgrestSingleResponse<InboxEntity>> {
    try {
      const response = await Supabase.client
        .from("Inbox")
        .update(request)
        .eq("id", request.id!)
        .select("*")
        .returns<InboxEntity>()
        .single();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteInboxAsync(id: number): Promise<void> {
    try {
      await Supabase.client
        .from("Inbox")
        .update({ deleted_at: new Date().toUTCString() })
        .eq("id", id)
        .select("*")
        .single();
    } catch (error) {
      throw error;
    }
  }
}
