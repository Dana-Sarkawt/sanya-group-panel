import type { GenericListOptions } from '$lib/Models/Common/ListOptions.Common.Model';
import type { Database } from '$lib/Supabase/Types/database.types';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';

export interface IFinancialDuesRepository {
	createFinancialDueAsync(
		request: Database['public']['Tables']['Financial Dues']['Insert']
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Financial Dues']['Row']>>;
	readFinancialDueAsync(
		id: number
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Financial Dues']['Row']>>;
	readFinancialDuesAsync(
		options?: GenericListOptions
	): Promise<PostgrestSingleResponse<Array<Database['public']['Tables']['Financial Dues']['Row']>>>;
	updateFinancialDueAsync(
		request: Database['public']['Tables']['Financial Dues']['Update']
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Financial Dues']['Row']>>;
	deleteFinancialDueAsync(
		id: number
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Financial Dues']['Row']>>;
}
