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
      style={[style, { top: insets.top }]}
      className="bg-white dark:bg-gray-800 rounded-full px-4 py-2 w-[275] flex-row g-3 items-center justify-center shadow-md"
    >
      {renderLeadingIcon?.()}
      <View>
        <Text
          numberOfLines={1}
          className="text-base font-body-bold text-center"
        >
          {text1}
        </Text>
        {text2 ? (
          <Text numberOfLines={2} className="text-xs font-body text-center">
            {text2}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

export default Toast;
