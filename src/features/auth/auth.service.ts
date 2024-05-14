import { z } from "zod";

import { supabase } from "~/app/_layout";
import { queryClient } from "~/clients/reactQuery";
import { getForgotPasswordRedirectUrl } from "./utils";

const content = {
  passwordShort: "Password is too short",
  passwordLong: "Password is too long",
  passwordMismatch: "Passwords do not match",
};

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
      .min(8, { message: content.passwordShort })
      .max(20, { message: content.passwordLong }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: content.passwordMismatch,
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

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: content.passwordShort })
      .max(20, { message: content.passwordLong }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: content.passwordMismatch,
    path: ["confirmPassword"],
  });

export async function forgotPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: getForgotPasswordRedirectUrl(),
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function resetPassword({
  password,
}: {
  password: string;
  confirmPassword: string;
}) {
  const { error } = await supabase.auth.updateUser({ password });

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
