import type { GenericListOptions } from '$lib/Models/Common/ListOptions.Common.Model';
import { Supabase } from '$lib/Supabase/Supabase';
import type { Database } from '$lib/Supabase/Types/database.types';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { IOutcomeRepository } from '../Interfaces/I.Outcome.Repository';

export class OutcomeRepository implements IOutcomeRepository {
	async createOutcomeAsync(
		request: Database['public']['Tables']['Outcome']['Insert']
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Outcome']['Row']>> {
		try {
			const response = await Supabase.client.from('Outcome').insert(request).select('*').single();

			if (response.error) {
				throw new Error(response.error.message);
			}

			return response;
		} catch (error) {
			throw error;
		}
	}
	async readOutcomeAsync(
		id: number
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Outcome']['Row']>> {
		try {
			const response = await Supabase.client.from('Outcome').select('*').eq('id', id).single();
			return response;
		} catch (error) {
			throw error;
		}
	}
	async readOutcomesAsync(
		options?: GenericListOptions
	): Promise<PostgrestSingleResponse<Array<Database['public']['Tables']['Outcome']['Row']>>> {
		try {
			const response = Supabase.client.from('Outcome').select('*', { count: 'exact' });
			// .is("deleted_at", null);

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
	async readOutcomesWithoutFilterAsync(): Promise<
		PostgrestSingleResponse<Array<Database['public']['Tables']['Outcome']['Row']>>
	> {
		try {
			const response = Supabase.client.from('Outcome').select('*', { count: 'exact' });
			// .is("deleted_at", null);

			return await response.order('id', { ascending: false });
		} catch (error) {
			throw error;
		}
	}
	async readOutcomesTotalAsync(): Promise<PostgrestSingleResponse<{ total: number }>> {
		// You have to enable the aggregate functions in the supabase console
		const response = await Supabase.client
			.from('Outcome')
			.select('total:overall_price.sum()')
			.is('deleted_at', null)
			.returns<{ total: number }>()
			.single();

		if (response.error) {
			throw response.error;
		}

		return response;
	}
	async updateOutcomeAsync(
		data: Database['public']['Tables']['Outcome']['Update']
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Outcome']['Row']>> {
		try {
			const response = await Supabase.client
				.from('Outcome')
				.update(data)
				.eq('id', data.id!)
				.select('*')
				.single();
			return response;
		} catch (error) {
			throw error;
		}
	}

	async readOverallOutcomeAsync(
		projectId: number
	): Promise<PostgrestSingleResponse<Array<Database['public']['Tables']['Outcome']['Row']>>> {
		try {
			const response = Supabase.client.rpc('calculate_outcome', {
				project_id_input: projectId
			});
			return (await response) as PostgrestSingleResponse<
				Array<Database['public']['Tables']['Outcome']['Row']>
			>;
		} catch (error) {
			throw error;
		}
	}
	async deleteOutcomeAsync(id: number): Promise<void> {
		try {
			await Supabase.client.from('Outcome').delete().eq('id', id);
		} catch (error) {
			throw error;
		}
	}
}
