import type { Database } from '$lib/Supabase/Types/database.types';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { IUsersRepository } from '../Interfaces/I.Users.Repository';
import { Supabase } from '$lib/Supabase/Supabase';
import type { GenericListOptions } from '$lib/Models/Common/ListOptions.Common.Model';

export class UsersRepository implements IUsersRepository {
	async createUserAsync(
		request: Database['public']['Tables']['Users']['Insert']
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Users']['Row']>> {
		try {
			const response = await Supabase.client.from('Users').insert(request).select('*').single();
			return response;
		} catch (error) {
			throw error;
		}
	}
	async readUserAsync(
		id: number
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Users']['Row']>> {
		try {
			const response = await Supabase.client
				.from('Users')
				.select('*')
				.eq('id', id)
				.is('deleted_at', null)
				.single();
			return response;
		} catch (error) {
			throw error;
		}
	}
	async readUsersAsync(
		options?: GenericListOptions
	): Promise<PostgrestSingleResponse<Array<Database['public']['Tables']['Users']['Row']>>> {
		try {
			const response = await Supabase.client
				.from('Users')
				.select('*', { count: 'exact' })
				.is('deleted_at', null)
				.order('id', { ascending: false })
				.range(options?.page! * options?.limit!, options?.limit! * (options?.page! + 1));
			return response;
		} catch (error) {
			throw error;
		}
	}
	async readUsersWithoutFilterAsync() {
		try {
			const response = await Supabase.client
				.from('Users')
				.select('Id: id,Name: name,Email: email', { count: 'exact' })
				.is('deleted_at', null)
				.order('id', { ascending: false });
			return response;
		} catch (error) {
			throw error;
		}
	}
	async readUserByEmailAsync(
		email: string
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Users']['Row']>> {
		try {
			const response = await Supabase.client
				.from('Users')
				.select('*')
				.eq('email', email)
				.is('deleted_at', null)
				.single();
			return response;
		} catch (error) {
			throw error;
		}
	}
	async readUserByPhoneAsync(phone: string) {
		try {
			const response = await Supabase.client
				.from('Users')
				.select('*')
				.eq('phone', phone)
				.is('deleted_at', null)
				.single();
			return response;
		} catch (error) {
			throw error;
		}
	}
	async updateUserAsync(
		request: Database['public']['Tables']['Users']['Update']
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Users']['Row']>> {
		try {
			const response = await Supabase.client
				.from('Users')
				.update(request)
				.eq('id', request.id!)
				.select('*')
				.single();
			return response;
		} catch (error) {
			throw error;
		}
	}
	async deleteUserAsync(
		id: number
	): Promise<PostgrestSingleResponse<Database['public']['Tables']['Users']['Row']>> {
		try {
			const response = await Supabase.client
				.from('Users')
				.update({ deleted_at: new Date().toUTCString() })
				.eq('id', id)
				.select('*')
				.single();
			const authUserResponse = await fetch(`/api/user/delete`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: response.data?.user_uid })
			});
			if (!authUserResponse.ok) {
				throw new Error('Failed to delete user');
			}
			console.log(authUserResponse);
			return response;
		} catch (error) {
			throw error;
		}
	}
}
