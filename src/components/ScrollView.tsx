import { remapProps } from "nativewind";
import { ScrollView as RNScrollView } from "react-native";

const ScrollView = remapProps(RNScrollView, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});

export default ScrollView;
