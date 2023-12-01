import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { AvoidSoftInput } from "react-native-avoid-softinput";

function useScrollingFormAvoidKeyBoard() {
	const onFocusEffect = useCallback(() => {
		AvoidSoftInput.setShouldMimicIOSBehavior(true);
		AvoidSoftInput.setEnabled(true);
		return () => {
			AvoidSoftInput.setEnabled(false);
			AvoidSoftInput.setShouldMimicIOSBehavior(false);
		};
	}, []);

	useFocusEffect(onFocusEffect);
}

export default useScrollingFormAvoidKeyBoard;
