import React from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

import Button from "~/components/Button";
import Icon from "~/components/Icon";
import ControlledInput from "~/components/Inputs/ControlledInputs";
import Text from "~/components/Text";

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const [loading, setLoading] = React.useState(false);
  const { control, getValues } = useForm<SignUpFormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function signUp() {}

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 justify-center items-center px-4 dark:bg-gray-950"
    >
      <Icon name="logo" size={128} className="mb-4 dark:text-white" />
      <Text type="header" className="text-5xl mb-8">
        Dish It Up
      </Text>
      <ControlledInput
        name="email"
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        control={control}
        className="mb-2"
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
        className="mb-2"
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
        className="mb-6"
      />
      <Button
        loading={loading}
        className="self-stretch mb-2"
        size="large"
        onPress={signUp}
      >
        Sign Up
      </Button>
    </KeyboardAvoidingView>
  );
}
