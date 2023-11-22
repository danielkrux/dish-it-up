import { Tabs } from "expo-router";
import Icon from "../../components/Icon";
import theme from "../../theme";

function Home() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="grocery-list"
        options={{
          title: "Grocery List",
          tabBarIcon: ({ color }) => (
            <Icon name="shopping-cart" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default Home;
