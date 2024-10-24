import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export interface IInboxRepository {
  createInboxAsync(
    request: Database["public"]["Tables"]["Inbox"]["Insert"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Inbox"]["Row"]>
  >;

  readInboxAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Inbox"]["Row"]>
  >;

  readInboxesAsync(
    options?: GenericListOptions
  ): Promise<
    PostgrestSingleResponse<Array<Database["public"]["Tables"]["Inbox"]["Row"]>>
  >;

  updateInboxAsync(
    request: Database["public"]["Tables"]["Inbox"]["Update"]
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Inbox"]["Row"]>
  >;

  deleteInboxAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Inbox"]["Row"]>
  >;
}
