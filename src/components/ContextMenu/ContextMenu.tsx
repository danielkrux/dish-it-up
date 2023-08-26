import { useState } from "react";
import { Dimensions, Pressable, StyleSheet } from "react-native";
import Animated, {
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { FullWindowOverlay } from "react-native-screens";
import { Portal } from "@gorhom/portal";

import { pallettes } from "../../theme";
import useSafeAreaInsets from "../../hooks/useSafeAreaInsets";
import IconButton from "../IconButton";
import {
  MENU_WIDTH,
  SPRING_CONFIGURATION,
  calculateLeftPosition as calcLeftOffset,
  calculateTranslateX as calcTranslateX,
  getTransformOrigin,
} from "./utils";
import Text from "../Text";

const WINDOW_WIDTH = Dimensions.get("window").width;

type Action = {
  label: string;
  onPress?: () => void;
  icon?: string;
};

type ContextMenuProps = {
  actions: Action[];
  onClose?: () => void;
};

function ContextMenu({
  actions = [{ label: "Test" }, { label: "Test2" }],
  onClose,
}: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useAnimatedRef<Animated.View>();
  const insets = useSafeAreaInsets();

  const animatedStyles = useAnimatedStyle(() => {
    const triggerRect = measure(triggerRef);
    if (!triggerRect) return {};

    const anchorPosition = getTransformOrigin(
      triggerRect.pageX,
      triggerRect.width,
      WINDOW_WIDTH
    );
    const leftOffset = calcLeftOffset(anchorPosition, triggerRect.width);
    const translateX = calcTranslateX(anchorPosition);

    return {
      top: triggerRect.pageY + triggerRect.height + 5,
      left: triggerRect.pageX + leftOffset,
      transform: [
        { translateX: translateX },
        { translateY: -250 },
        {
          scale: isOpen ? withSpring(1, SPRING_CONFIGURATION) : withTiming(0),
        },
        { translateX: -translateX },
        { translateY: 250 },
      ],
    };
  }, [isOpen]);

  function toggleOpen() {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
      <Animated.View ref={triggerRef}>
        <IconButton icon="more-vertical" onPress={toggleOpen} />
      </Animated.View>

      <Portal>
        <FullWindowOverlay>
          <>
            <Pressable
              style={[StyleSheet.absoluteFill]}
              onPress={() => setIsOpen(false)}
              pointerEvents={isOpen ? "auto" : "none"}
            />

            <Animated.View style={[styles.container, animatedStyles]}>
              <Pressable onPress={() => console.log("test")}>
                <Text>Test</Text>
              </Pressable>
            </Animated.View>
          </>
        </FullWindowOverlay>
      </Portal>
    </>
  );
}

export default ContextMenu;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    position: "absolute",
    height: 500,
    width: MENU_WIDTH,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: pallettes.black[200],
    shadowColor: pallettes.black[400],
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});
