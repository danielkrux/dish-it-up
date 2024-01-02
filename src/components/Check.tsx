import clsx from "clsx";
import { View } from "react-native";
import Icon from "./Icon";

function Check({ selected }: { selected: boolean }) {
	return (
		<View
			className={clsx(
				"w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-900 items-center justify-center",
				{
					"bg-primary": selected,
				},
			)}
		>
			{selected && (
				<Icon
					size={16}
					name="check"
					className="text-white dark:text-gray-800"
				/>
			)}
		</View>
	);
}

export default Check;
