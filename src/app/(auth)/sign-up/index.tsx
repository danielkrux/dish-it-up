import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "~/components/Button";
import Icon from "~/components/Icon";
import ControlledInput from "~/components/Inputs/ControlledInputs";
import Text from "~/components/Text";
import { signUpSchema, signUpWithEmail } from "~/features/auth/auth.service";
import { View } from "react-native";

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
      email: "danielkrux@icloud.com",
      password: "testpass",
      confirmPassword: "testpass",
    },
  });

  async function signUp(values: SignUpFormData) {
    try {
      setLoading(true);
      const { email, password } = values;
      await signUpWithEmail({ email, password });
      // @ts-ignore
      router.replace(`/sign-up/success?email=${email}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      className="flex-1 items-center justify-center px-4 dark:bg-gray-950"
    >
      <Icon name="logo" size={128} className="mb-4 dark:text-white" />
      <Text type="header" className="text-5xl mb-8">
        Dish It Up
      </Text>
      <View className="w-full">
        <ControlledInput
          name="email"
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          control={control}
          error={errors.email?.message}
          containerStyle="mb-2"
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
          control={control}
          error={errors.password?.message}
          containerStyle="mb-2"
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
          control={control}
          error={errors.confirmPassword?.message}
          containerStyle="mb-6"
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
    </KeyboardAvoidingView>
  );
}
