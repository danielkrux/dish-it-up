import clsx from "clsx";
import React from "react";
import { Pressable } from "react-native";
import Animated, { Layout } from "react-native-reanimated";

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
			layout={Layout}
			onPress={onPress}
			className={clsx(
				"absolute self-center flex-row items-baseline gap-1 bg-primary rounded-full px-8 py-2",
			)}
			style={{
				bottom: useSafeArea ? insets.bottom : 20,
			}}
		>
			{icon && <Icon name={icon} color={theme.colors.text} size={20} />}
			<Text size="l" className="text-white font-display">
				{children}
			</Text>
		</AnimatedPressable>
	);
}
