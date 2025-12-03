import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import React from "react";
import { ActivityIndicator, Pressable } from "react-native";

import { cn } from "~/utils/tailwind";
import useSafeAreaInsets from "../hooks/useSafeAreaInsets";
import { colors } from "../theme";
import Icon, { type IconName } from "./Icon";
import Text from "./Text";

type FloatingButtonProps = {
  children: string;
  loading?: boolean;
  icon?: IconName;
  useSafeArea?: boolean;
  useBottomTabsSafeArea?: boolean;
  className?: string;
  onPress?: () => void;
};

export default function FloatingButton({
  children,
  loading,
  icon,
  useSafeArea,
  useBottomTabsSafeArea,
  className,
  onPress,
}: FloatingButtonProps) {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      onPress={onPress}
      className={cn("absolute self-center items-center", className)}
      style={{
        bottom: useSafeArea ? insets.bottom : useBottomTabsSafeArea ? 100 : 20,
      }}
    >
      <GlassView
        isInteractive
        glassEffectStyle="clear"
        tintColor={colors.primary[400]}
        style={{
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 9999,
          backgroundColor: isLiquidGlassAvailable()
            ? "transparent"
            : colors.primary[400],
        }}
      >
        {loading ? (
          <ActivityIndicator color={colors.gray[500]} />
        ) : (
          <>
            {icon && (
              <Icon
                name={icon}
                className="text-white"
                strokeWidth={3}
                size={16}
              />
            )}
            <Text className="text-white font-body-bold text-lg">
              {children}
            </Text>
          </>
        )}
      </GlassView>
    </Pressable>
  );
}
