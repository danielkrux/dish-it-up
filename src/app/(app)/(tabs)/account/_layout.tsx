import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import Icon from "~/components/Icon";
import theme from "~/theme";

function AccountLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          headerTransparent: true,
          headerTitle: "Account",
          title: "Account",
          headerTitleStyle: {
            fontFamily: "Heading",
            fontSize: theme.fontSize.xxl,
            fontWeight: "bold",
          },
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/settings")}
              className="ml-1.5"
            >
              <Icon name="Settings" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}

export default AccountLayout;
