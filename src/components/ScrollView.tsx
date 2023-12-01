import { ScrollView as RNScrollView } from "react-native";
import { styled } from "nativewind";

const ScrollView = styled(RNScrollView, {
	props: {
		contentContainerStyle: true,
	},
});

export default ScrollView;
