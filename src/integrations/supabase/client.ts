import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

// Fallback no-op client so the site renders without Lovable Cloud configured.
// Replace by enabling Lovable Cloud and setting VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY.
export const supabase: SupabaseClient = supabaseConfigured
  ? createClient(SUPABASE_URL!, SUPABASE_KEY!, {
      auth: {
        storage: typeof window !== "undefined" ? window.localStorage : undefined,
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : (createStub() as unknown as SupabaseClient);

function createStub() {
  const queryStub = {
    select: () => queryStub,
    eq: () => queryStub,
    maybeSingle: async () => ({ data: null, error: null }),
    single: async () => ({ data: null, error: null }),
  };
  return {
    from: () => queryStub,
    channel: () => ({
      on: function () {
        return this;
      },
      subscribe: function () {
        return this;
      },
    }),
    removeChannel: () => {},
    functions: {
      invoke: async () => ({ data: null, error: { message: "Lovable Cloud is not enabled." } }),
    },
  };
}
