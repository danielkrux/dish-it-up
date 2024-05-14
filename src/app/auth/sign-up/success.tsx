import { useLocalSearchParams } from "expo-router";
import React from "react";

import Text from "~/components/Text";

export default function SignUpSuccess() {
  const { email } = useLocalSearchParams();

  return (
    <>
      <Text className="mb-4" type="header" size="xl">
        Check your email!
      </Text>
      <Text className="mb-1 text-center max-w-xs">
        To confirm your email address, check the mail we sent to
      </Text>
      <Text type="bodyBold">{email}</Text>
    </>
  );
}
