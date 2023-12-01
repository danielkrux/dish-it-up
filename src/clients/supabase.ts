import { PostgrestError, createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";

import { Platform } from "react-native";
import { Database } from "../../supabase/database.types";

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

const supabaseUrl = "https://qfsraezjniacsdtipuzs.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmc3JhZXpqbmlhY3NkdGlwdXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2OTUxMzYsImV4cCI6MjAwNzI3MTEzNn0.8UiRac7tOtI48l36PNBmC2G7WfT9R-5h4y4qI5P3jSc";

const ExpoSecureStoreAdapter = {
	getItem: (key: string) => {
		return SecureStore.getItemAsync(key);
	},
	setItem: (key: string, value: string) => {
		SecureStore.setItemAsync(key, value);
	},
	removeItem: (key: string) => {
		SecureStore.deleteItemAsync(key);
	},
};

export const initSupabase = () => {
	return createClient<Database>(supabaseUrl, supabaseKey, {
		auth: {
			storage: Platform.OS === "web" ? localStorage : ExpoSecureStoreAdapter,
		},
	});
};
