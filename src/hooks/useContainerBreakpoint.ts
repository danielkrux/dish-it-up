import { useState } from "react";
import { LayoutChangeEvent } from "react-native";

export default function useContainerBreakpoint() {
  const [containerSize, setContainerSize] = useState<"sm" | "md">("sm");

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerSize(width >= 768 ? "md" : "sm");
  };

  return { containerSize, onLayout };
}
