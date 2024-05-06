import { Navigator } from "expo-router";

type Options = {
  headerRight?: () => React.ReactNode;
};

function Header() {
  const { state, descriptors } = Navigator.useContext();

  const currentDescriptor = descriptors[state.routes[state.index].key];

  const options = currentDescriptor.options as Options;

  if (!options.headerRight?.()) {
    return null;
  }

  return <div className="flex justify-end h-10">{options.headerRight?.()}</div>;
}

export default Header;
