import clsx from "clsx";
import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";

import Icon, { IconName } from "./Icon";
import Text from "./Text";

export type ChipData = {
	label: string | null;
	value: string;
	icon?: IconName;
};

export type ChipProps = ChipData & {
	isSelected?: boolean;
	onPress?: (value: string) => void;
	onLongPress?: (value: string) => void;
	style?: StyleProp<ViewStyle>;
};

function Chip({
	label,
	value,
	isSelected,
	icon,
	onPress,
	onLongPress,
	style,
}: ChipProps) {
	return (
		<Pressable
			onPress={() => onPress?.(value)}
			onLongPress={() => onLongPress?.(value)}
			className={clsx(
				"flex-row items-baseline bg-gray-100 rounded-lg g-1 px-3 py-2",
				{ "bg-primary": isSelected },
			)}
			style={[style]}
		>
			{icon && <Icon size={16} name={icon} className="text-white" />}
			{isSelected && <Icon size={16} name="check" className="text-white" />}
			<Text
				className={clsx("text-gray-900 font-bold", {
					"text-white": isSelected,
				})}
			>
				{label}
			</Text>
		</Pressable>
	);
}

export default Chip;
