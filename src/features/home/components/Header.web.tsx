import { Navigator } from "expo-router";
import { cn } from "~/utils/tailwind";

type Options = {
  headerRight?: () => React.ReactNode;
};

function Header({ title, className }: { title?: string; className?: string }) {
  const { state, descriptors } = Navigator.useContext();

  const currentDescriptor = descriptors[state.routes[state.index].key];

  const options = currentDescriptor.options as Options;

  if (!options.headerRight?.() && !title) {
    return null;
  }

  return (
    <div className={className}>
      <div className={cn("flex pl-8 justify-between h-10")}>
        <h1 className="dark:text-white font-display text-2xl">{title}</h1>
        {options.headerRight?.()}
      </div>
    </div>
  );
}

export default Header;
