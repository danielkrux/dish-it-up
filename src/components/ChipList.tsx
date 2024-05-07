import Chip, { ChipProps } from "./Chip";
import { ScrollView } from "react-native";
import { cn } from "~/utils/tailwind";

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

  console.log(selectedValues);

  return (
    <ScrollView
      contentContainerClassName={cn(contentContainerClassName, "gap-2")}
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
