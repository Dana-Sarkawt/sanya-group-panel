// src/routes/+layout.ts
import {
  VITE_SUPABASE_ANON_KEY,
  VITE_SUPABASE_API_URL,
} from "$env/static/public";
import {
  createBrowserClient,
  createServerClient,
  isBrowser,
} from "@supabase/ssr";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends("supabase:auth");

  const supabase = isBrowser()
    ? createBrowserClient(VITE_SUPABASE_API_URL, VITE_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
      })
    : createServerClient(VITE_SUPABASE_API_URL, VITE_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
        cookies: {
          getAll() {
            return data.cookies;
          },
        },
      });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { supabase, session };
};
