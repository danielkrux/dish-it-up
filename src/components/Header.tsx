import { Header as HeaderElement } from "@react-navigation/elements";
import { StackHeaderProps } from "@react-navigation/stack";
import IconButton from "./IconButton";
import theme from "../theme";
import { View } from "react-native";
import { usePathname, useRouter } from "expo-router";

export default function Header({ options }: StackHeaderProps) {
	const router = useRouter();
	const pathName = usePathname();

	return (
		<View style={{ paddingBottom: theme.spacing.s }}>
			<HeaderElement
				title={options.title ?? ""}
				headerShadowVisible={false}
				headerLeft={() => {
					if (pathName === "/") return null;

					return (
						<IconButton
							style={{ marginLeft: theme.spacing.s }}
							icon="arrow-left"
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
