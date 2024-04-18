import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import Text from "~/components/Text";

export default function SignUpSuccess() {
  const { email } = useLocalSearchParams();

  return (
    <View className="flex-1 justify-center items-center px-4">
      <Text className="mb-4" type="header" size="xl">
        Check your email!
      </Text>
      <Text className="mb-1 text-center max-w-xs">
        To confirm your email address, check the mail we sent to
      </Text>
      <Text type="bodyBold">{email}</Text>
    </View>
  );
}
