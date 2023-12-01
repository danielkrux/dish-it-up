import { useSafeAreaInsets as useDefaultSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../theme";

type Options = {
	bottomSpacing: number;
};

const defaultOptions: Options = {
	bottomSpacing: theme.spacing.s,
};

const useSafeAreaInsets = (options: Options = defaultOptions) => {
	const insets = useDefaultSafeAreaInsets();
	let bottomInset = insets.bottom;

	if (bottomInset < theme.spacing.s) {
		bottomInset = options.bottomSpacing;
	}

	return { ...insets, bottom: bottomInset };
};

export default useSafeAreaInsets;
