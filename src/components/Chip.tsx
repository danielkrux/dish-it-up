import clsx from "clsx";
import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";

import { styled } from "nativewind";
import Icon, { IconName } from "./Icon";
import Text from "./Text";

export type ChipData = {
	label: string | undefined;
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
				"flex-row items-baseline bg-gray-100 dark:bg-gray-900 rounded-lg g-1 px-2 py-1.5",
				{ "bg-primary": isSelected },
			)}
			style={[style]}
		>
			{icon && <Icon size={16} name={icon} className="text-whit" />}
			{isSelected && <Icon size={16} name="check" className="text-white" />}
			<Text
				className={clsx("text-gray-900 dark:text-white font-body-bold", {
					"text-white": isSelected,
				})}
			>
				{label}
			</Text>
		</Pressable>
	);
}

export default styled(Chip);
