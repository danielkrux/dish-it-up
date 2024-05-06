import { Navigator } from "expo-router";
import Text from "~/components/Text";

function Header() {
  const { state, descriptors } = Navigator.useContext();

  const currentDescriptor = descriptors[state.routes[state.index].key];

  return (
    <div className="flex justify-between px-16 h-10">
      <Text type="header" size="2xl">
        Dish It Up
      </Text>
      {/* @ts-ignore */}
      {currentDescriptor.options?.headerRight?.()}
    </div>
  );
}

export default Header;
