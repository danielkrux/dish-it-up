import { Header as HeaderElement } from "@react-navigation/elements";
import { StackHeaderProps } from "@react-navigation/stack";
import IconButton from "./IconButton";
import theme from "../theme";
import { View } from "react-native";

export default function Header({ options, navigation }: StackHeaderProps) {
  return (
    <View style={{ paddingBottom: theme.spacing.s }}>
      <HeaderElement
        title={options.title ?? ""}
        headerShadowVisible={false}
        headerLeft={() => (
          <IconButton
            style={{ marginLeft: theme.spacing.s }}
            icon="arrow-left"
            onPress={navigation.goBack}
            size="medium"
          />
        )}
        headerRight={options.headerRight}
      />
    </View>
  );
}
