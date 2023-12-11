import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

import useSafeAreaInsets from "../hooks/useSafeAreaInsets";
import theme from "../theme";
import Icon, { IconName } from "./Icon";
import Text from "./Text";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type FloatingButtonProps = {
	children: string;
	icon?: IconName;
	onPress?: () => void;
	useSafeArea?: boolean;
};

export default function FloatingButton({
	children,
	onPress,
	icon,
	useSafeArea,
}: FloatingButtonProps) {
	const insets = useSafeAreaInsets();

	return (
		<AnimatedPressable
			layout={LinearTransition}
			onPress={onPress}
			style={[
				{
					bottom: useSafeArea ? insets.bottom : theme.spacing.l,
				},
				styles.button,
			]}
		>
			{icon && <Icon name={icon} color={theme.colors.text} size={20} />}
			<Text type="header" size="l">
				{children}
			</Text>
		</AnimatedPressable>
	);
}

const styles = StyleSheet.create({
	button: {
		position: "absolute",
		alignSelf: "center",
		flexDirection: "row",
		alignItems: "baseline",
		gap: theme.spacing.xs,
		backgroundColor: theme.colors.primary,
		paddingHorizontal: theme.spacing.m,
		paddingVertical: theme.spacing.s,
		borderRadius: 40,
	},
});
