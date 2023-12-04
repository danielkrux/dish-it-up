import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme, { pallettes } from "~/theme";
import { hexToRGBA } from "~/utils/color";
import Icon, { IconName } from "../Icon";
import Text from "../Text";

export type MenuItemProps = {
	label: string;
	icon?: IconName;
	onPress?: () => void;
	destructive?: boolean;
};

function MenuItem({ label, icon, onPress, destructive }: MenuItemProps) {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.8}
			style={[styles.container, destructive && styles.desctructive]}
		>
			<Text style={destructive && styles.destructiveText} type="body" size="l">
				{label}
			</Text>
			{icon && (
				<Icon
					name={icon}
					color={destructive ? pallettes.red[500] : undefined}
					size={16}
				/>
			)}
		</TouchableOpacity>
	);
}

export default MenuItem;

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: theme.spacing.l,
		paddingVertical: theme.spacing.s,
		borderBottomWidth: 1,
		borderBottomColor: pallettes.black[100],
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	desctructive: {
		backgroundColor: hexToRGBA(pallettes.red[100], 0.1),
		borderBottomColor: hexToRGBA(pallettes.red[100], 0.1),
	},
	destructiveText: {
		color: pallettes.red[500],
	},
});
