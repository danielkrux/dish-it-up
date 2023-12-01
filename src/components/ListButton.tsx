import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";
import Icon, { IconName } from "./Icon";
import Text from "./Text";
import theme, { pallettes } from "../theme";
import Check from "./Check";

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
		<Pressable onPress={onPress} style={[styles.listButton, style]}>
			{selectable && <Check selected={selected} />}
			{icon && <Icon name={icon} size={24} />}
			<Text style={styles.text}>{label}</Text>
		</Pressable>
	);
}

export default ListButton;

const styles = StyleSheet.create({
	listButton: {
		paddingVertical: theme.spacing.m,
		flexDirection: "row",
		alignItems: "center",
		borderTopColor: pallettes.black[100],
		borderBottomColor: pallettes.black[100],
		borderBottomWidth: 1,
		gap: theme.spacing.m,
	},
	text: {
		flex: 1,
	},
});
