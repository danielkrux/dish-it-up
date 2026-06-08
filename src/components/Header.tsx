import { usePathname, useRouter } from "expo-router";
import { Header as HeaderElement } from "expo-router/react-navigation";
import type { ReactNode } from "react";
import { View } from "react-native";
import theme from "../theme";
import IconButton from "./IconButton";

export default function Header({
  options,
}: {
  options: { title: string; headerRight: () => ReactNode };
}) {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <View style={{ paddingBottom: theme.spacing.s }}>
      <HeaderElement
        title={options.title ?? ""}
        headerShadowVisible={false}
        headerLeft={({ canGoBack }) => {
          if (pathName === "/" || !canGoBack) return null;

          return (
            <IconButton
              style={{ marginLeft: theme.spacing.s }}
              icon="ArrowLeft"
              onPress={router.back}
              size="medium"
            />
          );
        }}
        headerRight={options.headerRight}
      />
    </View>
  );
}
