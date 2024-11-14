import type { GenericListOptions } from '$lib/Models/Common/ListOptions.Common.Model';
import type { Database } from '$lib/Supabase/Types/database.types';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { IPreparationsRepository } from '../Interfaces/I.Preparations.Repository';
import { Supabase } from '$lib/Supabase/Supabase';

export class PreparationsRepository implements IPreparationsRepository {
	async createPreparationAsync(
		request: Database['public']['Tables']['Preparations']['Insert']
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Preparations']['Row']>> {
		try {
			const response = await Supabase.client
				.from('Preparations')
				.insert(request)
				.select('*')
				.single();
			return response;
		} catch (error) {
			throw error;
		}
	}
	async readPreparationAsync(
		id: number
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Preparations']['Row']>> {
		try {
			const response = await Supabase.client.from('Preparations').select('*').eq('id', id).single();
			return response;
		} catch (error) {
			throw error;
		}
	}
	async readPreparationsAsync(
		options?: GenericListOptions
	): Promise<PostgrestSingleResponse<Array<Database['public']['Tables']['Preparations']['Row']>>> {
		try {
			const response = Supabase.client
				.from('Preparations')
				.select('*', { count: 'exact' })
				.is('deleted_at', null);

			if (options?.field && options?.equal) {
				response.eq(options.field, options.equal);
			}

			return await response
				.order('id', { ascending: false })
				.range(options?.page! * options?.limit!, options?.limit! * (options?.page! + 1));
		} catch (error) {
			throw error;
		}
	}
	async readPreparationWithoutFilterAsync(projectId: number) {
		try {
			const response = await Supabase.client
				.from('Preparations')
				.select('Id: id, Description: description')
				.eq('project_id', projectId)
				.is('deleted_at', null)
				.order('id', { ascending: false });
			return response;
		} catch (error) {
			throw error;
		}
	}
	async readOverhaulDepositsByProjectIdAsync(projectId: number): Promise<
		PostgrestSingleResponse<{
			overall_total_price: number;
			overall_count: number;
		}>
	> {
		try {
			const response = await Supabase.client
				.rpc('overall_deposits_by_project_for_preparations', {
					p_project_id: projectId
				})
				.select('*')
				.single();
			if (response.error) {
				throw new Error(response.error.message);
			}
			return response;
		} catch (error) {
			throw error;
		}
	}
	async readOverhaulFinancialsByProjectIdAsync(projectId: number): Promise<
		PostgrestSingleResponse<{
			overall_total_price: number;
			overall_count: number;
		}>
	> {
		try {
			const response = await Supabase.client
				.rpc('overall_financials_by_project_for_preparations', {
					p_project_id: projectId
				})
				.select('*')
				.single();
			if (response.error) {
				throw new Error(response.error.message);
			}
			return response;
		} catch (error) {
			throw error;
		}
	}
	async readDepositsByPreparationIdsAsync(ids: number[]): Promise<
		PostgrestSingleResponse<
			Array<{
				preparation_id: number;
				deposit_count: number;
				total_price: number;
			}>
		>
	> {
		try {
			const response = await Supabase.client.rpc('count_deposits_by_preparations', {
				preparation_ids: ids
			});
			if (response.error) {
				throw new Error(response.error.message);
			}
			return response;
		} catch (error) {
			throw error;
		}
	}
	async readFinancialByPreparationIdsAsync(ids: number[]): Promise<
		PostgrestSingleResponse<
			Array<{
				preparation_id: number;
				financial_count: number;
				total_price: number;
			}>
		>
	> {
		try {
			const response = await Supabase.client.rpc('count_financials_by_preparations', {
				preparation_ids: ids
			});
			if (response.error) {
				throw new Error(response.error.message);
			}
			return response;
		} catch (error) {
			throw error;
		}
	}
	async updatePreparationAsync(
		request: Database['public']['Tables']['Preparations']['Update']
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Preparations']['Row']>> {
		try {
			const response = await Supabase.client
				.from('Preparations')
				.update(request)
				.eq('id', request.id!)
				.select('*')
				.single();
			return response;
		} catch (error) {
			throw error;
		}
	}
	async deletePreparationAsync(
		id: number
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Preparations']['Row']>> {
		try {
			const response = await Supabase.client
				.from('Preparations')
				.update({ deleted_at: new Date().toUTCString() })
				.eq('id', id)
				.select('*')
				.single();
			return response;
		} catch (error) {
			throw error;
		}
	}
}
