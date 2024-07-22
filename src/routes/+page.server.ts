import { Supabase } from "$lib/Supabase/Supabase";

export async function load() {
  const users = await Supabase.client
    .from("Users")
    .select("*,Roles(id,name)")
    .order("id", { ascending: true });
  return {
    users,
  };
}
