import {
	BottomSheetModal as _BottomSheetModal,
	BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import { styled } from "nativewind";
import React, { forwardRef, useMemo } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SBottomSheetModal = styled(_BottomSheetModal, {
	props: {
		handleStyle: true,
		handleIndicatorStyle: true,
	},
});

type Props = Omit<BottomSheetModalProps, "snapPoints">;

const BottomSheetModal = forwardRef<_BottomSheetModal, Props>(
	({ children, ...props }, ref) => {
		const insets = useSafeAreaInsets();

		const snapPoints = useMemo(() => ["25%"], []);

		return (
			<SBottomSheetModal
				ref={ref}
				detached
				snapPoints={snapPoints}
				bottomInset={insets.bottom}
				style={styles.bottomSheet}
				handleStyle="bg-white dark:bg-gray-900 rounded-t-xl"
				handleIndicatorStyle="bg-gray-200 dark:bg-gray-700"
				{...props}
			>
				{children}
			</SBottomSheetModal>
		);
	},
);

export default BottomSheetModal;

const styles = StyleSheet.create({
	bottomSheet: {
		marginHorizontal: 16,
		backgroundColor: "white",
		borderRadius: 16,
		shadowColor: "rgba(0,0,0,1)",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 16.0,

		elevation: 24,
	},
});
