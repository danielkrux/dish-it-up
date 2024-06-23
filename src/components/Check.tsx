import { Pressable } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { cn } from "~/utils/tailwind";
import Icon from "./Icon";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Check({
  selected,
  className,
  onPress,
}: {
  selected: boolean;
  className?: string;
  onPress?: () => void;
}) {
  const style = useAnimatedStyle(() => ({
    opacity: withTiming(selected ? 1 : 0),
    transform: [{ scale: withTiming(selected ? 1 : 0) }],
    // backgroundColor: selected ? "",
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      className={cn(
        "w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 items-center justify-center",
        className
      )}
    >
      {selected && (
        <Animated.View
          className="bg-primary w-full h-full rounded-full items-center justify-center"
          entering={FadeIn.duration(100)}
          exiting={FadeOut.duration(100)}
        >
          <Icon size={10} name="Check" className="text-white" strokeWidth={5} />
        </Animated.View>
      )}
    </AnimatedPressable>
  );
}

export default Check;
