import { styled } from "nativewind";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import Check from "./Check";
import Icon, { IconName } from "./Icon";
import Text from "./Text";

type ListButtonProps = {
	onPress: () => void;
	label: string;
	icon?: IconName;
	selectable?: boolean;
	selected?: boolean;
	style?: StyleProp<ViewStyle>;
};

function ListButton({
	label,
	icon,
	selectable,
	selected = false,
	style,
	onPress,
}: ListButtonProps) {
	return (
		<Pressable
			className="py-3 flex-row items-center border-b border-b-gray-100 bg-white g-4 dark:bg-gray-900 dark:border-b-gray-800"
			onPress={onPress}
			style={style}
		>
			{selectable && <Check onPress={onPress} selected={selected} />}
			{icon && (
				<Icon name={icon} size={24} className="text-black dark:text-white" />
			)}
			<Text className="flex-1">{label}</Text>
		</Pressable>
	);
}

export default styled(ListButton);
