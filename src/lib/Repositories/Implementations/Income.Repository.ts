import type { GenericListOptions } from '$lib/Models/Common/ListOptions.Common.Model';
import { Supabase } from '$lib/Supabase/Supabase';
import type { Database } from '$lib/Supabase/Types/database.types';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { IIncomeRepository } from '../Interfaces/I.Income.Repository';

export class IncomeRepository implements IIncomeRepository {
	readIncomesWithoutFilterAsync(): Promise<
		PostgrestSingleResponse<Array<Database['public']['Tables']['Income']['Row']>>
	> {
		throw new Error('Method not implemented.');
	}
	async createIncomeAsync(
		request: Database['public']['Tables']['Income']['Insert']
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Income']['Row']>> {
		try {
			const response = await Supabase.client.from('Income').insert(request).select('*').single();
			return response;
		} catch (error) {
			throw error;
		}
	}
	async readIncomeAsync(
		id: number
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Income']['Row']>> {
		try {
			const response = await Supabase.client.from('Income').select('*').eq('id', id).single();
			return response;
		} catch (error) {
			throw error;
		}
	}
	async readIncomesAsync(
		options?: GenericListOptions
	): Promise<PostgrestSingleResponse<Array<Database['public']['Tables']['Income']['Row']>>> {
		try {
			const response = Supabase.client
				.from('Income')
				.select('*', { count: 'exact' })
				.is('deleted_at', null);

			if (options?.field && options?.equal) {
				response.eq(options.field, options.equal);
			}

			return await response
				.order('date', { ascending: false })
				.range(options?.page! * options?.limit!, options?.limit! * (options?.page! + 1));
		} catch (error) {
			throw error;
		}
	}
	async readIncomesTotalAsync(): Promise<PostgrestSingleResponse<{ total: number }>> {
		// You have to enable the aggregate functions in the supabase console
		const response = await Supabase.client
			.from('Income')
			.select('total:overall_price.sum()')
			.is('deleted_at', null)
			.returns<{ total: number }>()
			.single();

		if (response.error) {
			throw response.error;
		}

		return response;
	}
	async updateIncomeAsync(
		data: Database['public']['Tables']['Income']['Update']
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Income']['Row']>> {
		try {
			const response = await Supabase.client
				.from('Income')
				.update(data)
				.eq('id', data.id!)
				.select('*')
				.single();
			return response;
		} catch (error) {
			throw error;
		}
	}

	async createOverallIncomeAsync(projectId: number) {
		try {
			const response = await Supabase.client.rpc('calculate_income', {
				project_id_input: projectId
			});
			console.log('Hello there', response);
		} catch (error) {
			throw error;
		}
	}
	async deleteIncomeAsync(id: number): Promise<void> {
		try {
			await Supabase.client.from('Income').delete().eq('id', id);
		} catch (error) {
			throw error;
		}
	}
}
