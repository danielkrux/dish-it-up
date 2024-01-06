import { styled } from "nativewind";
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from "react-native";
import theme from "../theme";
import Chip, { ChipProps } from "./Chip";

function ChipList({
	data,
	style,
	contentContainerStyle,
	selectedValues = [],
	className,
	onPress,
	onLongPress,
}: {
	data?: ChipProps[];
	selectedValues?: string[];
	style?: StyleProp<ViewStyle>;
	contentContainerStyle?: StyleProp<ViewStyle>;
	className?: string;
	onPress?: (value: string) => void;
	onLongPress?: (value: string) => void;
}) {
	if (!data?.length) return null;

	return (
		<ScrollView
			style={style}
			contentContainerStyle={[contentContainerStyle, styles.container]}
			showsHorizontalScrollIndicator={false}
			horizontal
			className={className}
		>
			{data?.map((item, index) => (
				<Chip
					key={`${item}-${index}`}
					{...item}
					isSelected={selectedValues.includes(item.value)}
					onPress={onPress}
					onLongPress={onLongPress}
				/>
			))}
		</ScrollView>
	);
}

export default styled(ChipList);

const styles = StyleSheet.create({
	container: {
		gap: theme.spacing.xs,
	},
});
