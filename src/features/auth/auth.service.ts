import { z } from "zod";

import { supabase } from "~/app/_layout";
import { queryClient } from "~/clients/reactQuery";

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    throw new Error(error?.message);
  }

  return data.session;
}

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function signInWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function signUpWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  queryClient.removeQueries();

  if (error) {
    throw new Error(error.message);
  }
}
