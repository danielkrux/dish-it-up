import { PostgrestError, createClient } from "@supabase/supabase-js";

import { Database } from "../../supabase/database.types";
import { LargeSecureStore } from "~/utils/largeSecureStore";
import { Platform } from "react-native";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type TableCreate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type TableUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }>
  ? Exclude<U, null>
  : never;
export type DbResultErr = PostgrestError;

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

export const initSupabase = () => {
  const client = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      storage: Platform.OS === "web" ? localStorage : new LargeSecureStore(),
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: Platform.OS === "web" ? true : false,
    },
  });

  return client;
};
