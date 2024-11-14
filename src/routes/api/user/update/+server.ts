import { SECRET_SUPABASE_SERVICE_ROLE } from '$env/static/private';
import { VITE_SUPABASE_API_URL } from '$env/static/public';
import type { Database } from '$lib/Supabase/Types/database.types';
import { createClient } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';

const server = createClient<Database>(VITE_SUPABASE_API_URL, SECRET_SUPABASE_SERVICE_ROLE, {
	auth: {
		autoRefreshToken: false,
		persistSession: false
	}
});

export const PUT: RequestHandler = async ({ locals, params, request }) => {
	try {
		return new Response('User updated successfully', { status: 200 });
	} catch (error) {
		return new Response('Failed to update user', { status: 500 });
	}
};
