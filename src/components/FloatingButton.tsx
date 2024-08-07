import clsx from "clsx";
import React from "react";
import { ActivityIndicator, Pressable } from "react-native";

import { cn } from "~/utils/tailwind";
import useSafeAreaInsets from "../hooks/useSafeAreaInsets";
import theme, { colors } from "../theme";
import Icon, { type IconName } from "./Icon";
import Text from "./Text";

type FloatingButtonProps = {
  children: string;
  loading?: boolean;
  icon?: IconName;
  useSafeArea?: boolean;
  className?: string;
  onPress?: () => void;
};

export default function FloatingButton({
  children,
  loading,
  icon,
  useSafeArea,
  className,
  onPress,
}: FloatingButtonProps) {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "absolute self-center flex-row items-center gap-3 bg-primary rounded-full px-10 py-2",
        className
      )}
      style={{
        bottom: useSafeArea ? insets.bottom : 20,
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
          <Text className="text-white font-body-bold text-lg">{children}</Text>
        </>
      )}
    </Pressable>
  );
}
