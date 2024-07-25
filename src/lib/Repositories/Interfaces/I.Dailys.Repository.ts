import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export class IDailysRepository {
  async createDailyAsync(
    request: Database["public"]["Tables"]["Dailys"]["Insert"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Dailys"]["Row"]>
  > {
    throw new Error("Method not implemented.");
  }
  async readDailyAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Dailys"]["Row"]>
  > {
    throw new Error("Method not implemented.");
  }
  async readDailysAsync(
    options?: GenericListOptions,
  ): Promise<
    PostgrestSingleResponse<
      Array<Database["public"]["Tables"]["Dailys"]["Row"]>
    >
  > {
    throw new Error("Method not implemented.");
  }
  async updateDailyAsync(
    request: Database["public"]["Tables"]["Dailys"]["Update"],
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Dailys"]["Row"]>
  > {
    throw new Error("Method not implemented.");
  }
  async deleteDailyAsync(
    id: number,
  ): Promise<
    PostgrestSingleResponse<Database["public"]["Tables"]["Dailys"]["Row"]>
  > {
    throw new Error("Method not implemented.");
  }
}
