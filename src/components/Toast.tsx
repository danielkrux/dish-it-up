import { TouchableOpacity } from "react-native";
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
			className="bg-gray-800 rounded-full px-4 py-2 w-[275] flex-row g-3 items-center shadow-lg"
		>
			{renderLeadingIcon?.()}
			<Text numberOfLines={1} className="text-base font-body">
				{text1}
			</Text>
		</TouchableOpacity>
	);
}

export default Toast;
