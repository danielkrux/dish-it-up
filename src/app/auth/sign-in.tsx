import { Link, router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "~/components/Button";
import ControlledInput from "~/components/Inputs/ControlledInputs";
import Modal from "~/components/Modal";
import Text from "~/components/Text";
import { signInWithEmail } from "~/features/auth/auth.service";

type SignInFormData = {
  email: string;
  password: string;
};

function SignIn() {
  const [loading, setLoading] = useState(false);
  const { control, getValues, watch } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function signIn() {
    try {
      setLoading(true);
      const { email, password } = getValues();
      await signInWithEmail({ email, password });

      router.replace("/");

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      Modal.show({
        title: "Something went wrong",
        description: "Please try again.",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function navigateToSignUp() {
    router.push("/auth/sign-up/");
  }

  const email = watch("email");

  return (
    <>
      <ControlledInput
        name="email"
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        control={control}
        spellCheck={false}
        autoCorrect={false}
        containerClassName="mb-6"
      />
      <Link
        href={
          email
            ? `/auth/forgot-password/?email=${encodeURIComponent(email)}`
            : "/auth/forgot-password/"
        }
        className="self-end -mb-6 z-10"
      >
        <Text className="text-xs text-gray-400 underline">
          Forgot Password?
        </Text>
      </Link>
      <ControlledInput
        name="password"
        label="Password"
        keyboardType="visible-password"
        autoComplete="current-password"
        autoCapitalize="none"
        secureTextEntry
        spellCheck={false}
        clearTextOnFocus={false}
        control={control}
        containerClassName="mb-4"
        onSubmitEditing={signIn}
      />
      <Button
        loading={loading}
        className="self-stretch mb-2"
        size="large"
        onPress={signIn}
      >
        Sign In
      </Button>
      <Text className="text-center mt-10 mb-2">Don't have an account yet?</Text>
      <Button
        className="self-stretch"
        size="large"
        variant="secondary"
        onPress={navigateToSignUp}
      >
        Sign Up
      </Button>
    </>
  );
}

export default SignIn;
