import theme from "../theme";
import Chip, { ChipProps } from "./Chip";
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from "react-native";

function ChipList({
  data,
  style,
  contentContainerStyle,
}: {
  data: ChipProps[];
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <ScrollView
      style={style}
      contentContainerStyle={[contentContainerStyle, styles.container]}
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
  container: {
    gap: theme.spacing.xs,
  },
});
