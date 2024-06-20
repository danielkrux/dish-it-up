import { Pressable } from "react-native";
import { cn } from "~/utils/tailwind";
import Icon from "./Icon";

function Check({
  selected,
  className,
  onPress,
}: {
  selected: boolean;
  className?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 items-center justify-center",
        {
          "bg-primary dark:bg-primary": selected,
        },
        className
      )}
    >
      {selected && (
        <Icon size={14} name="Check" className="text-white" strokeWidth={3} />
      )}
    </Pressable>
  );
}

export default Check;
