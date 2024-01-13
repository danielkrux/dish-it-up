import { BottomSheetModal as _BottomSheetModal } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { View } from "react-native";

import BottomSheetModal from "~/components/BottomSheetModal";
import Button from "~/components/Button";
import StarRating from "~/components/StarRating";
import Text from "~/components/Text";
import { colors } from "~/theme";
import useFetchRecipe from "../hooks/useFetchRecipe";
import useUpdateRecipe from "../hooks/useUpdateRecipe";

type Props = {
	recipeId: number | undefined;
	onSave?: () => void;
};

const TODAY = new Date();

const LogRecipe = forwardRef<_BottomSheetModal, Props>(
	({ recipeId, onSave }, ref) => {
		const innerRef = useRef<_BottomSheetModal>(null);
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		useImperativeHandle(ref, () => innerRef.current!);

		const { data } = useFetchRecipe(recipeId);
		const initialDate = data?.last_cooked ? new Date(data.last_cooked) : TODAY;
		const [date, setDate] = React.useState(initialDate);
		const [stars, setStars] = React.useState(data?.rating ?? -1);

		const { mutate, isLoading } = useUpdateRecipe({
			onSuccess: () => {
				innerRef.current?.dismiss();
				onSave?.();
			},
		});

		return (
			<BottomSheetModal ref={innerRef}>
				<Text className="font-display text-2xl mb-1">Log Recipe</Text>
				<Text className="text-base text-gray-700 dark:text-gray-200">
					{data?.name}
				</Text>
				<View className="flex-row items-center mt-6 mb-4">
					<Text className="text-base dark:text-gray-300">Last made on</Text>
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
				<View className="flex-row g-2">
					<Text className="text-base mb-2 dark:text-gray-300">Rating</Text>
					<StarRating initialValue={stars - 1} onChange={setStars} />
				</View>
				<Button
					onPress={() =>
						mutate({
							id: recipeId,
							rating: stars,
							last_cooked: date.toISOString(),
						})
					}
					loading={isLoading}
					className="mt-auto mb-3"
					size="large"
				>
					Save
				</Button>
			</BottomSheetModal>
		);
	},
);

export default LogRecipe;
