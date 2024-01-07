import { BottomSheetModal as _BottomSheetModal } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { View } from "react-native";

import BottomSheetModal from "~/components/BottomSheetModal";
import Button from "~/components/Button";
import Text from "~/components/Text";
import { colors } from "~/theme";
import useFetchRecipe from "../hooks/useFetchRecipe";
import useUpdateRecipe from "../hooks/useUpdateRecipe";

type Props = {
	recipeId: number;
};

const TODAY = new Date();

const LogRecipe = forwardRef<_BottomSheetModal, Props>(({ recipeId }, ref) => {
	const innerRef = useRef<_BottomSheetModal>(null);
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	useImperativeHandle(ref, () => innerRef.current!);

	const { data } = useFetchRecipe(recipeId);
	const initialDate = data?.last_cooked ? new Date(data.last_cooked) : TODAY;
	const [date, setDate] = React.useState(initialDate);

	const { mutate, isLoading } = useUpdateRecipe({
		onSuccess: () => {
			innerRef.current?.dismiss();
		},
	});

	return (
		<BottomSheetModal ref={innerRef}>
			<View className="flex-1 bg-white dark:bg-gray-900 px-4 py-1 rounded-b-xl">
				<Text className="font-display text-2xl">Log Recipe</Text>
				<Text className="text-sm text-gray-700 dark:text-gray-200">
					{data?.name}
				</Text>
				<View className="flex-row items-center mt-5">
					<Text className="text-base">Last made on</Text>
					<DateTimePicker
						value={date}
						mode="date"
						accentColor={colors.primary[500]}
						maximumDate={TODAY}
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
