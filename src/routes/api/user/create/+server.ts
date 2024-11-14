import { SECRET_SUPABASE_SERVICE_ROLE } from '$env/static/private';
import { VITE_SUPABASE_API_URL } from '$env/static/public';
import type { User } from '$lib/Models/Request/User.Request.Model';
import type { Database } from '$lib/Supabase/Types/database.types';
import { createClient } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';

const server = createClient<Database>(VITE_SUPABASE_API_URL, SECRET_SUPABASE_SERVICE_ROLE, {
	auth: {
		autoRefreshToken: false,
		persistSession: false
	}
});

export const POST: RequestHandler = async ({ locals, params, request }) => {
	const userRequest: User.Create = await request.json();
	try {
		const authUser = await server.auth.admin.createUser({
			email: userRequest.email,
			password: userRequest.password,
			email_confirm: true
		});
		if (!authUser || authUser.error) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Failed to create user',
					data: { error: authUser.error }
				})
			);
		}
		const user = await server
			.from('Users')
			.insert({
				phone: userRequest.phone,
				name: userRequest.name,
				role: userRequest.role,
				email: authUser.data.user.email,
				user_uid: authUser.data.user.id
			})
			.select('*')
			.single();
		if (!user || user.error) {
			await server.auth.admin.deleteUser(authUser.data.user.id);
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Failed to create user',
					data: { error: user.error }
				})
			);
		}
		return new Response(
			JSON.stringify({
				success: true,
				message: 'User created successfully',
				data: user
			})
		);
	} catch (error) {
		console.log('Failed to operate on user', { error });
		return new Response(
			JSON.stringify({
				success: false,
				message: 'Failed to operate on user',
				data: { error }
			})
		);
	}
};
