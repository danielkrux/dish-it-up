import GHBottomSheet, { BottomSheetProps } from "@gorhom/bottom-sheet";
import clsx from "clsx";
import React from "react";
import { View, ViewProps } from "react-native";

export type Props = Omit<
  BottomSheetProps,
  "backgroundStyle" | "handleStyle" | "handleIndicatorStyle"
> & {
  backgroundClassName?: string;
  handleClassName?: string;
  handleIndicatorClassName?: string;
  backgroundStyle?: ViewProps["style"];
  handleStyle?: ViewProps["style"];
  handleIndicatorStyle?: ViewProps["style"];
};

function BottomSheet({
  backgroundStyle,
  handleStyle,
  handleIndicatorStyle,
  backgroundClassName,
  handleClassName,
  handleIndicatorClassName,
  ...props
}: Props) {
  return (
    <GHBottomSheet
      backgroundComponent={() => <View className={backgroundClassName} />}
      handleComponent={() => (
        <Handle className={handleClassName} handleClassName={handleClassName} />
      )}
      {...props}
    />
  );
}

export default BottomSheet;

function Handle({
  className,
  handleClassName,
}: {
  className?: string;
  handleClassName?: string;
}) {
  return (
    <View className={clsx("justify-center items-center pt-3 pb-1", className)}>
      <View
        className={clsx(
          "w-11 py-1 rounded-full bg-gray-100 dark:bg-gray-900",
          handleClassName
        )}
      />
    </View>
  );
}
