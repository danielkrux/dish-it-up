import { router } from "expo-router";

export function goBack(fallbackUrl: string) {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace(fallbackUrl);
  }
}
