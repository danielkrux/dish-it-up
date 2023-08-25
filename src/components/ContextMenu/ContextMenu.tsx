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
  calculateLeftPosition as calcLeftOffset,
  getTransformOrigin,
} from "./utils";

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
    const rect = measure(triggerRef);
    if (!rect) return {};

    const anchorPosition = getTransformOrigin(
      rect.pageX,
      rect.width,
      WINDOW_WIDTH
    );

    const leftPosition = calcLeftOffset(anchorPosition, rect.width);

    return {
      top: rect.pageY + rect.height + 5,
      left: rect.pageX + leftPosition,
      transform: [
        { translateX: 100 },
        { translateY: -100 },
        {
          scale: isOpen ? withSpring(1) : withTiming(0),
        },
        { translateX: -100 },
        { translateY: 100 },
      ],
    };
  }, [isOpen]);

  function toggleOpen() {
    setIsOpen((prev) => !prev);
  }

  function entering() {
    "worklet";
    const rect = measure(triggerRef);
    const anchorPosition = getTransformOrigin(
      rect.pageX,
      rect.width,
      WINDOW_WIDTH
    );

    const leftPosition = calcLeftOffset(anchorPosition, rect.width);

    const animations = {
      top: rect.pageY + rect.height + 5,
      left: rect.pageX + leftPosition,
      transform: [
        { translateX: 100 },
        { translateY: -100 },
        {
          scale: withSpring(1),
        },
        { translateX: -100 },
        { translateY: 100 },
      ],
    };
    const initialValues = {
      top: rect.pageY + rect.height + 5,
      left: rect.pageX + leftPosition,
      transform: [
        { translateX: 100 },
        { translateY: -100 },
        {
          scale: 0,
        },
        { translateX: -100 },
        { translateY: 100 },
      ],
    };
    return {
      initialValues,
      animations,
    };
  }

  return (
    <>
      <Animated.View ref={triggerRef}>
        <IconButton icon="more-vertical" onPress={toggleOpen} />
      </Animated.View>

      <Portal>
        <FullWindowOverlay>
          <>
            {/* <Pressable
              style={[StyleSheet.absoluteFill]}
              onPress={() => setIsOpen(false)}
            /> */}

            <Animated.View style={[styles.container, animatedStyles]} />
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
    height: 200,
    width: 200,
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
