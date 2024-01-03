import clsx from "clsx";
import React from "react";
import { ActivityIndicator, Pressable } from "react-native";
import Animated, { Layout } from "react-native-reanimated";

import useSafeAreaInsets from "../hooks/useSafeAreaInsets";
import theme, { colors } from "../theme";
import Icon, { IconName } from "./Icon";
import Text from "./Text";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type FloatingButtonProps = {
	children: string;
	loading?: boolean;
	icon?: IconName;
	useSafeArea?: boolean;
	onPress?: () => void;
};

export default function FloatingButton({
	children,
	loading,
	icon,
	useSafeArea,
	onPress,
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
			{loading ? (
				<ActivityIndicator color={colors.white} />
			) : (
				<>
					{icon && <Icon name={icon} color={theme.colors.text} size={20} />}
					<Text className="text-gray-900 font-display text-base">
						{children}
					</Text>
				</>
			)}
		</AnimatedPressable>
	);
}
