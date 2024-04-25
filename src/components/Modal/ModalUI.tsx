import React, { useState } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { LayoutChangeEvent, View } from "react-native";

import IconButton from "../IconButton";
import Text from "../Text";

export type ModalProps = {
  title?: string;
  children?: React.ReactNode;
  isVisble?: boolean;
  hide: () => void;
};

function Modal({ title, isVisble, hide, children }: ModalProps) {
  const [height, setHeight] = useState(0);

  function handleLayout(event: LayoutChangeEvent) {
    setHeight(event.nativeEvent.layout.height);
  }

  if (!isVisble) return null;

  return (
    <>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        className="absolute top-0 right-0 bottom-0 left-0 bg-black/70"
      />
      <Animated.View
        onLayout={handleLayout}
        entering={FadeIn}
        exiting={FadeOut}
        style={{ transform: [{ translateY: -height / 2 }] }}
        className="absolute top-1/2 left-0 right-0 rounded-2xl mx-4 p-4 bg-white dark:bg-gray-800"
      >
        <View className="justify-between flex-row items-center">
          <Text size="l" type="header">
            {title}
          </Text>
          <IconButton
            size="medium"
            className="self-end mb-4"
            icon="X"
            onPress={hide}
          />
        </View>
        {children}
      </Animated.View>
    </>
  );
}

export default Modal;
