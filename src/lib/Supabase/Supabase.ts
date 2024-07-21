import { createClient } from "@supabase/supabase-js";
import type { Database } from "./Types/database.types";
import {
  VITE_SUPABASE_ANON_KEY,
  VITE_SUPABASE_API_URL,
} from "$env/static/public";

export namespace Supabase {
  export const client = createClient<Database>(
    VITE_SUPABASE_API_URL,
    VITE_SUPABASE_ANON_KEY,
  );
}
