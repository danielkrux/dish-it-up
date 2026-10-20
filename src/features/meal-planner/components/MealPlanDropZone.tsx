import { ReactNode, useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Droppable } from "react-native-reanimated-dnd";
import { cn } from "~/utils/tailwind";

function MealPlanDropZone({
  id,
  isDragging,
  children,
  onDrop,
}: {
  id: string;
  isDragging: boolean;
  children: ReactNode;
  onDrop: (item: any) => void;
}) {
  const [isActive, setIsActive] = useState(false);

  const scale = useSharedValue(1);
  const minHeight = useSharedValue(48);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    minHeight: minHeight.value,
  }));

  useEffect(() => {
    if (isActive) {
      minHeight.value = withTiming(80);
    } else {
      minHeight.value = withTiming(48);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <Droppable droppableId={id} onDrop={onDrop} onActiveChange={setIsActive}>
      <Animated.View
        style={[animatedStyle]}
        className={cn("border border-2 border-transparent gap-4", {
          "border-black": isDragging,
          "border border-2 border-dashed border-black": isActive,
        })}
      >
        {children}
      </Animated.View>
    </Droppable>
  );
}

export default MealPlanDropZone;
