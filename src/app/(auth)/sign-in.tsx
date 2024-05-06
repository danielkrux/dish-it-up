import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

import Button from "~/components/Button";
import Icon from "~/components/Icon";
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
  const { control, getValues } = useForm<SignInFormData>({
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
    router.push("/sign-up/");
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={1}
      className="flex-1 justify-center items-center px-4 dark:bg-gray-950 md:mx-auto md:min-w-[350]"
    >
      <View>
        <Icon
          name="logo"
          size={128}
          className="mb-4 mx-auto text-gray-950 dark:text-acapulco-100"
        />
        <Text type="header" className="text-5xl mb-8 dark:text-acapulco-100">
          Dish It Up
        </Text>
      </View>
      <ControlledInput
        name="email"
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        control={control}
        spellCheck={false}
        autoCorrect={false}
        containerClassName="mb-2"
      />
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
        containerClassName="mb-6"
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
      <Text className="text-center mb-2">or</Text>
      <Button
        className="self-stretch mb-2"
        size="large"
        variant="secondary"
        onPress={navigateToSignUp}
      >
        Sign Up
      </Button>
    </KeyboardAvoidingView>
  );
}

export default SignIn;
