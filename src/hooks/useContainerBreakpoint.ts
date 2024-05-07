import { useState } from "react";
import { LayoutChangeEvent } from "react-native";

export default function useContainerBreakpoint() {
  const [isLoading, setIsLoading] = useState(true);
  const [containerSize, setContainerSize] = useState<"sm" | "md" | "lg">("sm");

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;

    if (width >= 1024) {
      setContainerSize("lg");
    } else if (width >= 768) {
      setContainerSize("md");
    } else {
      setContainerSize("sm");
    }

    setIsLoading(false);
  };

  return { containerSize, isLoading, onLayout };
}
