import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { View } from "react-native";

import Button from "~/components/Button";
import ControlledInput from "~/components/Inputs/ControlledInputs";
import Text from "~/components/Text";
import { signUpSchema, signUpWithEmail } from "~/features/auth/auth.service";

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const [loading, setLoading] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function signUp(values: SignUpFormData) {
    try {
      setLoading(true);
      const { email, password } = values;
      await signUpWithEmail({ email, password });
      router.replace(`/sign-up/success?email=${email}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function navigateToSignIn() {
    router.push("/auth/sign-in/");
  }

  return (
    <>
      <View className="self-stretch">
        <ControlledInput
          name="email"
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          control={control}
          spellCheck={false}
          autoCorrect={false}
          error={errors.email?.message}
          containerClassName="mb-2"
        />
        <ControlledInput
          name="password"
          label="Password"
          keyboardType="visible-password"
          autoComplete="new-password"
          autoCapitalize="none"
          secureTextEntry
          spellCheck={false}
          autoCorrect={false}
          clearTextOnFocus={false}
          control={control}
          error={errors.password?.message}
          containerClassName="mb-2"
        />
        <ControlledInput
          name="confirmPassword"
          label="Confirm Password"
          keyboardType="visible-password"
          autoComplete="new-password"
          autoCapitalize="none"
          secureTextEntry
          spellCheck={false}
          autoCorrect={false}
          clearTextOnFocus={false}
          control={control}
          error={errors.confirmPassword?.message}
          containerClassName="mb-6"
        />
      </View>
      <Button
        loading={loading}
        className="self-stretch mb-2"
        size="large"
        onPress={handleSubmit(signUp)}
      >
        Sign Up
      </Button>
      <Text className="text-center mt-10 mb-2">Already have an account?</Text>
      <Button
        className="self-stretch"
        size="large"
        variant="secondary"
        onPress={navigateToSignIn}
      >
        Sign In
      </Button>
    </>
  );
}
