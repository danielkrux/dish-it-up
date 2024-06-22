import { ScrollView, type ScrollViewProps } from "react-native";
import { cn } from "~/utils/tailwind";
import Chip, { type ChipProps } from "./Chip";

function ChipList({
  data,
  selectedValues = [],
  className,
  contentContainerClassName,
  onPress,
  onLongPress,
  ...props
}: {
  data?: ChipProps[];
  selectedValues?: string[];
  contentContainerClassName?: string;
  className?: string;
  onPress?: (value: string) => void;
  onLongPress?: (value: string) => void;
} & ScrollViewProps) {
  if (!data?.length) return null;

  return (
    <ScrollView
      contentContainerClassName={cn(contentContainerClassName, "gap-2")}
      showsHorizontalScrollIndicator={false}
      horizontal
      className={className}
      {...props}
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
