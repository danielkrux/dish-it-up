import React, { useEffect, useState } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { LayoutChangeEvent, View } from "react-native";

import IconButton from "../IconButton";
import Text from "../Text";
import TextInputBase from "../Inputs/TextInputBase";
import Button from "../Button";

export type ModalProps = {
  title?: string;
  description?: string;
  isVisble?: boolean;
  defaultValue?: string | null;
  withPrompt?: boolean;
  onConfirm?: (value?: string) => void;
  hide: () => void;
};

function Modal({
  title,
  description,
  isVisble,
  withPrompt,
  defaultValue,
  onConfirm,
  hide,
}: ModalProps) {
  const [height, setHeight] = useState(0);
  const [value, setValue] = useState(defaultValue ?? "");

  useEffect(() => {
    setValue(defaultValue ?? "");
  }, [defaultValue]);

  function handleLayout(event: LayoutChangeEvent) {
    setHeight(event.nativeEvent.layout.height);
  }

  function handleConfirm() {
    onConfirm?.(value || undefined);

    setValue("");
    hide();
  }

  if (!isVisble) return null;

  return (
    <>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut.duration(150)}
        className="absolute top-0 right-0 bottom-0 left-0 bg-black/70"
      />
      <Animated.View
        onLayout={handleLayout}
        entering={FadeIn}
        exiting={FadeOut}
        style={{ transform: [{ translateY: -height / 2 }] }}
        className="absolute top-1/2 left-0 right-0 rounded-2xl mx-4 p-4 bg-white dark:bg-gray-800 max-w-md mx-auto"
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
        <Text className="mb-2">{description}</Text>
        {withPrompt && <TextInputBase value={value} onChangeText={setValue} />}
        <View className="flex-row self-end mt-4">
          <Button variant="ghost" onPress={hide}>
            Cancel
          </Button>
          <Button variant="secondary" onPress={handleConfirm}>
            Confirm
          </Button>
        </View>
      </Animated.View>
    </>
  );
}

export default Modal;
