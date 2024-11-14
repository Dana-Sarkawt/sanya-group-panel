import type { GenericListOptions } from '$lib/Models/Common/ListOptions.Common.Model';
import type { Database } from '$lib/Supabase/Types/database.types';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';

export interface IDepositsRepository {
	createDepositAsync(
		request: Database['public']['Tables']['Deposits']['Insert']
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Deposits']['Row']>>;
	readDepositAsync(
		id: number
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Deposits']['Row']>>;
	readDepositsAsync(
		options?: GenericListOptions
	): Promise<PostgrestSingleResponse<Array<Database['public']['Tables']['Deposits']['Row']>>>;
	updateDepositAsync(
		request: Database['public']['Tables']['Deposits']['Update']
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Deposits']['Row']>>;
	deleteDepositAsync(
		id: number
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Deposits']['Row']>>;
}
