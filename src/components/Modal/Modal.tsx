import { Portal } from "@gorhom/portal";
import React, { useState } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import IconButton from "../IconButton";
import { LayoutChangeEvent, View } from "react-native";
import Text from "../Text";

export type ModalProps = {
  title: string;
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

function Modal({ title, isVisible, onClose, children }: ModalProps) {
  const [height, setHeight] = useState(0);

  function handleLayout(event: LayoutChangeEvent) {
    setHeight(event.nativeEvent.layout.height);
  }

  return (
    <Portal>
      {isVisible ? (
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
                onPress={onClose}
              />
            </View>
            {children}
          </Animated.View>
        </>
      ) : null}
    </Portal>
  );
}

export default Modal;
