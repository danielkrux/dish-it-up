import Chip, { ChipProps } from "./Chip";
import ScrollView from "./ScrollView";
import clsx from "clsx";

function ChipList({
  data,
  selectedValues = [],
  className,
  contentContainerClassName,
  onPress,
  onLongPress,
}: {
  data?: ChipProps[];
  selectedValues?: string[];
  contentContainerClassName?: string;
  className?: string;
  onPress?: (value: string) => void;
  onLongPress?: (value: string) => void;
}) {
  if (!data?.length) return null;

  return (
    <ScrollView
      contentContainerClassName={clsx(contentContainerClassName, "gap-2")}
      showsHorizontalScrollIndicator={false}
      horizontal
      className={className}
    >
      {data?.map((item, index) => (
        <Chip
          key={`${item}-${index}`}
          {...item}
          isSelected={selectedValues.includes(item.value)}
          onPress={onPress}
          onLongPress={onLongPress}
        />
      ))}
    </ScrollView>
  );
}

export default ChipList;
