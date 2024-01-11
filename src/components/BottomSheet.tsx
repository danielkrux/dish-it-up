import GHBottomSheet, { BottomSheetProps } from "@gorhom/bottom-sheet";
import { styled } from "nativewind";
import React from "react";
import { View, ViewProps } from "react-native";

export type Props = Omit<
	BottomSheetProps,
	"backgroundStyle" | "handleStyle" | "handleIndicatorStyle"
> & {
	backgroundStyle?: ViewProps["style"];
	handleStyle?: ViewProps["style"];
	handleIndicatorStyle?: ViewProps["style"];
};

function BottomSheet({
	backgroundStyle,
	handleStyle,
	handleIndicatorStyle,
	...props
}: Props) {
	return (
		<GHBottomSheet
			backgroundComponent={() => <View style={backgroundStyle} />}
			handleComponent={() => (
				<Handle
					style={handleStyle}
					handleIndicatorStyle={handleIndicatorStyle}
				/>
			)}
			{...props}
		/>
	);
}

export default styled(BottomSheet, {
	props: {
		backgroundStyle: true,
		handleStyle: true,
		handleIndicatorStyle: true,
	},
});

function Background({ style }: { style: ViewProps["style"] }) {
	return <View style={style} />;
}

function Handle({
	style,
	handleIndicatorStyle,
}: { style: ViewProps["style"]; handleIndicatorStyle: ViewProps["style"] }) {
	return (
		<View className="justify-center items-center pt-3 pb-1" style={style}>
			<View
				className="w-11 py-1 rounded-full bg-gray-100 dark:bg-gray-900"
				style={handleIndicatorStyle}
			/>
		</View>
	);
}
