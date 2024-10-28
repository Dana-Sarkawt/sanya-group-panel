import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { InboxEntity } from "$lib/Models/Entity/Inbox.Entity.Model";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export interface IInboxRepository {
  createInboxAsync(
    request: Database["public"]["Tables"]["Inbox"]["Insert"]
  ): Promise<
    PostgrestSingleResponse<InboxEntity>
  >;

  readInboxAsync(
    id: number
  ): Promise<
    PostgrestSingleResponse<InboxEntity>
  >;

  readInboxesAsync(
    options?: GenericListOptions
  ): Promise<
    PostgrestSingleResponse<InboxEntity[]>
  >;

  updateInboxAsync(
    request: Database["public"]["Tables"]["Inbox"]["Update"]
  ): Promise<
    PostgrestSingleResponse<InboxEntity>
  >;

  deleteInboxAsync(
    id: number
  ): Promise<
    void
  >;
}
