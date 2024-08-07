import React, { useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  Canvas,
  Group,
  Mask,
  Paint,
  Rect,
  RoundedRect,
  Image as SkImage,
  Skia,
} from "@shopify/react-native-skia";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as OCR from "modules/react-native-ocr";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import Animated, { runOnJS } from "react-native-reanimated";
import { nanoid } from "nanoid";

import Button from "~/components/Button";
import { SCREEN_WIDTH, colors } from "~/theme";
import { router } from "expo-router";
import TypeMenu from "~/features/scan/components/TypeMenu";
import { RecipeFieldType, TextBlock } from "~/features/scan/types";
import Icon from "~/components/Icon";
import { prepareTextBlocksForForm } from "~/features/scan/utils";
import Text from "~/components/Text";

function Scan() {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>();
  const [textBlocks, setTextBlocks] = useState<TextBlock[]>([]);
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState<number>();

  const data = Skia.Data.fromBase64(image?.base64 || "");
  const skImage = Skia.Image.MakeImageFromEncoded(data);
  const imageWidth = skImage?.width() ?? 0;
  const imageHeight = skImage?.height() ?? 0;

  const scaledImageHeight = (imageHeight * SCREEN_WIDTH) / imageWidth;

  async function openImagePicker() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const pickedImage = result.assets[0];
      const manipResult = await manipulateAsync(pickedImage.uri, [], {
        format: SaveFormat.JPEG,
        base64: true,
      });
      if (!manipResult.base64) return;
      setImage(manipResult);
      const scaleRatio = SCREEN_WIDTH / manipResult.width;
      const textBlocks = await OCR.getTextFromImage(manipResult.base64);
      const scaledBlocks = textBlocks.map((block) => ({
        ...block,
        id: nanoid(),
        boundingBox: {
          x: block.boundingBox.x * scaleRatio,
          y: block.boundingBox.y * scaleRatio,
          width: block.boundingBox.width * scaleRatio,
          height: block.boundingBox.height * scaleRatio,
        },
      }));
      setTextBlocks([]);
      setTextBlocks(scaledBlocks);
    }
  }

  const gesture = Gesture.Tap().onEnd((event) => {
    if (!imageWidth || !imageHeight) return;
    const x = event.x;
    const y = event.y;
    const selectedIndex = textBlocks.findIndex((block) => {
      const blockX = block.boundingBox.x;
      const blockY = block.boundingBox.y;
      const blockWidth = block.boundingBox.width;
      const blockHeight = block.boundingBox.height;
      if (
        x >= blockX &&
        x <= blockX + blockWidth &&
        y >= blockY &&
        y <= blockY + blockHeight
      ) {
        return true;
      }
    });
    if (selectedIndex === -1) return;

    runOnJS(setCurrentSelectedIndex)(selectedIndex);
  });

  function handleTypeChange(type: RecipeFieldType) {
    if (typeof currentSelectedIndex === "undefined") return;
    const currentBlock = textBlocks[currentSelectedIndex];
    const updatedBlock = { ...currentBlock, type };
    const updatedBlocks = [...textBlocks];
    updatedBlocks[currentSelectedIndex] = updatedBlock;
    setTextBlocks(updatedBlocks);
  }

  function handleRemoveType() {
    if (!currentSelectedIndex) return;
    const currentBlock = textBlocks[currentSelectedIndex];
    const updatedBlock = { ...currentBlock, type: undefined };
    const updatedBlocks = [...textBlocks];
    updatedBlocks[currentSelectedIndex] = updatedBlock;
    setTextBlocks(updatedBlocks);
  }

  function handleContinue() {
    const params = prepareTextBlocksForForm(textBlocks);

    router.navigate({
      pathname: "recipe/add/custom/",
      params: params,
    });
  }

  const currentSelectedBlock =
    typeof currentSelectedIndex !== "undefined"
      ? textBlocks[currentSelectedIndex]
      : undefined;

  return (
    <View className="flex-1 bg-black justify-center">
      <View className="absolute top-0 right-0 left-0 flex-row justify-between px-4 py-4">
        <Button onPress={() => router.back()} variant="secondary">
          Cancel
        </Button>
        <Button disabled={!textBlocks.length} onPress={handleContinue}>
          Continue
        </Button>
      </View>
      {image && (
        <>
          <Canvas
            className="absolute"
            style={{ width: SCREEN_WIDTH, height: scaledImageHeight }}
          >
            <SkImage
              fit="contain"
              image={skImage}
              x={0}
              y={0}
              width={SCREEN_WIDTH}
              height={scaledImageHeight}
            />
            <Mask
              mode="luminance"
              mask={
                <Group>
                  <Rect
                    color="white"
                    x={0}
                    y={0}
                    width={SCREEN_WIDTH}
                    height={scaledImageHeight}
                  />
                  {textBlocks.map((block, index) => {
                    const isSelected =
                      index === currentSelectedIndex || textBlocks[index].type;

                    return (
                      <RoundedRect
                        key={block.id}
                        x={block.boundingBox.x}
                        y={block.boundingBox.y}
                        width={block.boundingBox.width}
                        height={block.boundingBox.height}
                        color={isSelected ? "black" : "#00000000"}
                        r={2}
                      />
                    );
                  })}
                </Group>
              }
            >
              <Rect
                color="#00000080"
                x={0}
                y={0}
                width={SCREEN_WIDTH}
                height={scaledImageHeight}
              />
            </Mask>
            {currentSelectedBlock ? (
              <RoundedRect
                x={currentSelectedBlock.boundingBox.x}
                y={currentSelectedBlock.boundingBox.y}
                width={currentSelectedBlock.boundingBox.width}
                height={currentSelectedBlock.boundingBox.height}
                r={2}
                color="#00000000"
              >
                <Paint
                  color={colors.primary[400]}
                  style="stroke"
                  strokeWidth={1}
                />
              </RoundedRect>
            ) : null}
          </Canvas>
          <GestureDetector gesture={gesture}>
            <Animated.View
              className="absolute"
              style={{ width: SCREEN_WIDTH, height: scaledImageHeight }}
            />
          </GestureDetector>
        </>
      )}
      {!image && (
        <View className="px-20 gap-y-4">
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex-row gap-2 items-center"
            onPress={openImagePicker}
          >
            <Icon name="Images" color={colors.primary[400]} size={24} />
            <Text className="text-primary">Image Library</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            activeOpacity={0.8}
            className="flex-row gap-2 items-center"
          >
            <Icon name="Camera" color={colors.primary[400]} size={24} />
            <Text className="text-primary">Camera</Text>
          </TouchableOpacity> */}
        </View>
      )}
      {image && (
        <View className="absolute bottom-0 right-0 left-0 items-center pb-10 flex-row justify-center">
          <TypeMenu
            currentType={
              typeof currentSelectedIndex !== "undefined"
                ? textBlocks[currentSelectedIndex].type
                : undefined
            }
            onTypeChange={handleTypeChange}
          />
          {currentSelectedBlock?.type ? (
            <Pressable onPress={handleRemoveType} className="ml-3">
              <Icon color={colors.gray[300]} size={18} name="CircleX" />
            </Pressable>
          ) : null}
        </View>
      )}
    </View>
  );
}

export default Scan;
