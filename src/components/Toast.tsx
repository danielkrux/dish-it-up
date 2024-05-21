import { TouchableOpacity, View } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

import useSafeAreaInsets from "~/hooks/useSafeAreaInsets";
import Text from "./Text";

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
      className="bg-white dark:bg-gray-800 rounded-full pr-6 py-2 min-w-[275px] flex-row gap-3 items-center mt-4 gap-6"
    >
      <View className="absolute left-6">{renderLeadingIcon?.()}</View>
      <View className="mx-auto pl-6">
        <Text
          numberOfLines={1}
          className="text-base font-body-bold text-center"
        >
          {text1}
        </Text>
        {text2 ? (
          <Text
            numberOfLines={2}
            className="text-xs font-body text-center max-w-[275px] text-gray-700"
          >
            {text2}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

export default Toast;
