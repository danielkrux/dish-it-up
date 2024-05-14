import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

import Button from "~/components/Button";
import ControlledInput from "~/components/Inputs/ControlledInputs";
import { forgotPassword } from "~/features/auth/auth.service";
import { goBack } from "~/utils/router";

function ForgotPassword() {
  const params = useLocalSearchParams<{ email: string }>();
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const { control, getValues } = useForm<{ email: string }>({
    defaultValues: {
      email: params.email || "",
    },
  });

  const { mutate, isLoading } = useMutation(forgotPassword, {
    onSuccess: () => {
      setHasSubmitted(true);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Check your email for a link to reset your password",
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred while resetting your password",
      });
    },
  });

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

      <Button
        loading={isLoading}
        className="self-stretch mb-2"
        size="large"
        onPress={() => mutate(getValues().email)}
      >
        Reset Password
      </Button>
      <Button
        className="self-stretch mb-2"
        variant="ghost"
        size="large"
        onPress={() => goBack("/auth/sign-in/")}
      >
        Back to Sign In
      </Button>
    </>
  );
}

export default ForgotPassword;
