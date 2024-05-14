import { Slot } from "expo-router";
import React from "react";
import { View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import Icon from "~/components/Icon";
import Text from "~/components/Text";

function AuthLayout() {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={1}
      className="flex-1 justify-center items-center px-4 dark:bg-gray-950 md:mx-auto md:min-w-[400px]"
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
      <Slot />
    </KeyboardAvoidingView>
  );
}

export default AuthLayout;
