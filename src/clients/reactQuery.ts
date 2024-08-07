import { QueryClient, focusManager } from "@tanstack/react-query";
import { AppStateStatus, Platform } from "react-native";

export function setQueryClientFocus(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export const queryClient = new QueryClient();
