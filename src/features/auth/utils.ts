import { Platform } from "react-native";

export function getForgotPasswordRedirectUrl() {
  const prodUrl = `${process.env.EXPO_PUBLIC_WEB_URL}/auth/forgot-password/reset`;
  const localUrl = "http://localhost:8081/auth/forgot-password/reset";

  if (Platform.OS === "web") {
    if (process.env.NODE_ENV !== "production") {
      return localUrl;
    }
  } else {
    return `${prodUrl}?app=true`;
  }
}
