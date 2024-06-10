import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

import Button from "~/components/Button";
import ControlledInput from "~/components/Inputs/ControlledInputs";
import {
  resetPassword,
  resetPasswordSchema,
} from "~/features/auth/auth.service";

function Reset() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<{
    password: string;
    confirmPassword: string;
  }>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {},
  });

  const { mutate, isLoading } = useMutation(resetPassword, {
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Password reset successfully",
      });
      router.replace("/");
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
        name="password"
        label="Password"
        keyboardType="visible-password"
        autoComplete="new-password"
        autoCapitalize="none"
        secureTextEntry
        spellCheck={false}
        clearTextOnFocus={false}
        control={control}
        containerClassName="mb-4"
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
      <Button
        loading={isLoading}
        className="self-stretch mb-2"
        size="large"
        onPress={handleSubmit((values) => mutate(values))}
      >
        Reset Password
      </Button>
    </>
  );
}

export default Reset;
