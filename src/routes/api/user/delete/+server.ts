import { SECRET_SUPABASE_SERVICE_ROLE } from "$env/static/private";
import { VITE_SUPABASE_API_URL } from "$env/static/public";
import type { Database } from "$lib/Supabase/Types/database.types";
import { createClient } from "@supabase/supabase-js";
import type { RequestHandler } from "@sveltejs/kit";

const server = createClient<Database>(
  VITE_SUPABASE_API_URL,
  SECRET_SUPABASE_SERVICE_ROLE,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export const DELETE: RequestHandler = async ({ locals, params, request }) => {
  const { id } = await request.json();
  try {
    const user = await server.auth.admin.deleteUser(id);
    if (!user || user.error) {
      return new Response("Failed to delete user", { status: 500 });
    }
    return new Response(`User deleted successfully`, { status: 200 });
  } catch (error) {
    return new Response(`Failed to delete user: ${error}`, { status: 500 });
  }
};
