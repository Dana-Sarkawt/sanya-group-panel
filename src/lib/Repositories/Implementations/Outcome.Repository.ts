import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import { Supabase } from "$lib/Supabase/Supabase";
import type { Database } from "$lib/Supabase/Types/database.types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { IOutcomeRepository } from "../Interfaces/I.Outcome.Repository";

export class OutcomeRepository implements IOutcomeRepository {
    createOutcomeAsync(request: Database["public"]["Tables"]["Outcome"]["Insert"]): Promise<PostgrestSingleResponse<Database["public"]["Tables"]["Outcome"]["Row"]>> {
        throw new Error("Method not implemented.");
    }
    createOverallOutcomeAsync(p0: number, response: void, request: Database["public"]["Tables"]["Outcome"]["Insert"]): Promise<PostgrestSingleResponse<Database["public"]["Tables"]["Outcome"]["Row"]>> {
        throw new Error("Method not implemented.");
    }
    readOutcomesByWorkerIdAsync(workerId: number): Promise<PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>> {
        throw new Error("Method not implemented.");
    }
    readOutcomesByWorkerIdsAsync(workerIds: number[]): Promise<PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>> {
        throw new Error("Method not implemented.");
    }
    readOutcomesByProjectIdAndWorkerIdAsync(projectId: number, workerId: number): Promise<PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>> {
        throw new Error("Method not implemented.");
    }
    readOutcomesByProjectIdsAndWorkerIdsAsync(projectIds: number[], workerIds: number[]): Promise<PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>> {
        throw new Error("Method not implemented.");
    }
    readOutcomesByProjectIdAndWorkerIdsAsync(projectId: number, workerIds: number[]): Promise<PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>> {
        throw new Error("Method not implemented.");
    }
    readOutcomesByWorkerIdAndProjectIdsAsync(workerId: number, projectIds: number[]): Promise<PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>> {
        throw new Error("Method not implemented.");
    }
    async readOutcomeAsync(
        id: number
    ): Promise<
        PostgrestSingleResponse<Database["public"]["Tables"]["Outcome"]["Row"]>
    > {
        try {
            const response = await Supabase.client
                .from("Outcome")
                .select("*")
                .eq("id", id)
                .single();
            return response;
        } catch (error) {
            throw error;
        }
    }
    async readOutcomesAsync(
        options?: GenericListOptions
    ): Promise<
        PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>
    > {
        try {
            const response = Supabase.client
                .from("Outcome")
                .select("*", { count: "exact" })
                // .is("deleted_at", null);

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
    async readOutcomesWithoutFilterAsync(): Promise<
        PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>
    > {
        try {
            const response = Supabase.client
                .from("Outcome")
                .select("*", { count: "exact" })
                // .is("deleted_at", null);

            return await response
                .order("id", { ascending: false });
        } catch (error) {
            throw error;
        }
    }
    async readOutcomesByProjectIdAsync(projectId: number): Promise<
        PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>
    > {
        try {
            const response = Supabase.client
                .from("Outcome")
                .select("*")
                .eq("project_id", projectId);

            return await response
                .order("id", { ascending: false });
        } catch (error) {
            throw error;
        }
    }

    async readOutcomesByProjectIdsAsync(projectIds: number[]): Promise<
        PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>
    > {
        try {
            const response = Supabase.client
                .from("Outcome")
                .select("*")
                .in("project_id", projectIds);

            return await response
                .order("id", { ascending: false });
        } catch (error) {
            throw error;
        }
    }

    async readOverallOutcomeAsync(projectId: number): Promise<PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>> {
        try {
            const response = Supabase.client
                .rpc("calculate_outcome", { project_id_input: projectId });
            return await response as PostgrestSingleResponse<Array<Database["public"]["Tables"]["Outcome"]["Row"]>>;
        } catch (error) {
            throw error;
        }
    }

}