import { TouchableOpacity, View } from "react-native";
import type { BaseToastProps } from "react-native-toast-message";

import useSafeAreaInsets from "~/hooks/useSafeAreaInsets";
import Text from "./Text";
import { cn } from "~/utils/tailwind";

function Toast({
  text1,
  text2,
  renderLeadingIcon,
  style,
  ...props
}: BaseToastProps) {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      activeOpacity={1}
      {...props}
      style={[style, { top: insets.top ?? 20 }]}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-full min-w-[275px] flex-row gap-3 items-center mt-4 shadow gap-4 py-3 px-6 border border-gray-200 dark:border-gray-600"
      )}
    >
      <View className="absolute left-6">{renderLeadingIcon?.()}</View>
      <View className="flex-1 ml-10">
        <Text
          numberOfLines={1}
          className={cn("text-base font-body-bold", {
            "text-center": !text2,
          })}
        >
          {text1}
        </Text>
        {text2 ? (
          <Text
            numberOfLines={2}
            className="text-xs font-body max-w-[200px] text-gray-700"
          >
            {text2}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

export default Toast;
