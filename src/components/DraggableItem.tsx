import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useSharedValue,
  runOnJS,
  withTiming,
  useAnimatedStyle,
  useAnimatedReaction,
} from "react-native-reanimated";
import { isWeb } from "~/theme";
import { cn } from "~/utils/tailwind";

export type SwappedIndexes = { from: number; to: number };
export type Positions = Record<string, number>;

function DraggableItem({
  children,
  className,
  positions,
  id,
  height,
  onDragEnd,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  onDragEnd?: (swappedIndexes: SwappedIndexes) => void;
  id: string;
  height: number;
  positions: SharedValue<Positions>;
} & ViewProps) {
  const isDragging = useSharedValue(false);
  const index = positions.value[id];
  const translateY = useSharedValue(index);
  const prevTranslationY = useSharedValue(0);
  const swappedIndexes = useSharedValue<SwappedIndexes | undefined>(undefined);

  const outOfBounds = (newPosition: number) => {
    "worklet";
    if (newPosition < 0) return "TOP";
    if (newPosition > Object.keys(positions.value).length - 1) return "BOTTOM";
    return undefined;
  };

  const gesture = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      swappedIndexes.value = {
        from: positions.value[id],
        to: positions.value[id],
      };
      isDragging.value = true;
      prevTranslationY.value = translateY.value;
    })
    .onUpdate((e) => {
      translateY.value = prevTranslationY.value + e.translationY;
      const newOrder = Math.round(translateY.value / height);
      const oldOlder = positions.value[id];

      if (newOrder !== oldOlder) {
        if (!outOfBounds(newOrder) && !isWeb) {
          runOnJS(impactAsync)(ImpactFeedbackStyle.Light);
        }
        const idToSwap = Object.keys(positions.value).find((key) => {
          return positions.value[key] === newOrder;
        });

        if (idToSwap) {
          positions.value = {
            ...positions.value,
            [id]: newOrder,
            [idToSwap]: oldOlder,
          };
        }
      }
    })
    .onEnd(() => {
      const newPosition = Math.round(translateY.value / height);
      swappedIndexes.value = {
        from: swappedIndexes.value?.from ?? 0,
        to: newPosition,
      };
      if (onDragEnd) {
        runOnJS(onDragEnd)(swappedIndexes.value);
      }
      const outOfBound = outOfBounds(newPosition);
      if (outOfBound === "TOP") {
        translateY.value = withTiming(0);
        return;
      }
      if (outOfBound === "BOTTOM") {
        translateY.value = withTiming(
          (Object.keys(positions.value).length - 1) * height
        );
        return;
      }

      translateY.value = withTiming(newPosition * height);
      isDragging.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      zIndex: isDragging.value ? 100 : 0,
      transform: [{ translateY: translateY.value }],
    };
  });

  useAnimatedReaction(
    () => positions.value[id],
    (newOrder) => {
      if (!isDragging.value && typeof newOrder === "number") {
        translateY.value = withTiming(newOrder * height);
      }
    }
  );

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={animatedStyle}
        className={cn("absolute", className)}
        {...props}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

export default DraggableItem;
