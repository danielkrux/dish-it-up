import { useState } from "react";
import { LayoutChangeEvent } from "react-native";

export default function useContainerBreakpoint() {
  const [isLoading, setIsLoading] = useState(true);
  const [containerSize, setContainerSize] = useState<"sm" | "md">("sm");

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerSize(width >= 768 ? "md" : "sm");
    setIsLoading(false);
  };

  return { containerSize, isLoading, onLayout };
}
