import Chip, { ChipProps } from "./Chip";
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from "react-native";

function ChipList({
  data,
  contentContainerStyle,
}: {
  data: ChipProps[];
  contentContainerStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <ScrollView
      contentContainerStyle={contentContainerStyle}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      {data.map((item, index) => (
        <Chip key={`${item}-${index}`} {...item} />
      ))}
    </ScrollView>
  );
}

export default ChipList;

const styles = StyleSheet.create({
  container: {},
});
