import { BottomSheetModal as _BottomSheetModal } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { View } from "react-native";

import BottomSheetModal from "~/components/BottomSheetModal";
import Button from "~/components/Button";
import Text from "~/components/Text";
import { colors } from "~/theme";
import useUpdateRecipe from "../hooks/useUpdateRecipe";

type Props = {
	recipeId: number;
};

const LogRecipe = forwardRef<_BottomSheetModal, Props>(({ recipeId }, ref) => {
	const innerRef = useRef<_BottomSheetModal>(null);
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	useImperativeHandle(ref, () => innerRef.current!);

	const [date, setDate] = React.useState(new Date());

	const { mutate, isLoading } = useUpdateRecipe({
		onSuccess: () => {
			innerRef.current?.dismiss();
		},
	});

	return (
		<BottomSheetModal ref={innerRef}>
			<View className="flex-1 bg-white dark:bg-gray-900 px-4 py-1 rounded-b-xl">
				<Text className="font-display text-xl">Log recipe</Text>
				<View className="flex-row items-center mt-5">
					<Text className="text-base">Last made on</Text>
					<DateTimePicker
						value={date}
						mode="date"
						accentColor={colors.primary[500]}
						maximumDate={new Date()}
						onChange={(event, selectedDate) => {
							const currentDate = selectedDate || date;
							setDate(currentDate);
						}}
					/>
				</View>
				<Button
					onPress={() =>
						mutate({ id: recipeId, last_cooked: date.toISOString() })
					}
					loading={isLoading}
					className="mt-auto mb-3"
					size="large"
				>
					Save
				</Button>
			</View>
		</BottomSheetModal>
	);
});

export default LogRecipe;
