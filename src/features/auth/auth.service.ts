import { Alert } from "react-native";
import { supabase } from "~/app/_layout";

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    throw new Error(error?.message);
  }

  return data.session;
}

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

  if (error) Alert.alert(error.message);
}

export async function signUpWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
