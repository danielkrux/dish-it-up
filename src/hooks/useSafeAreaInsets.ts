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
  let { bottom } = insets;

  if (bottom < theme.spacing.s) {
    bottom = options.bottomSpacing;
  }

  return { ...insets, bottom: bottom };
};

export default useSafeAreaInsets;
