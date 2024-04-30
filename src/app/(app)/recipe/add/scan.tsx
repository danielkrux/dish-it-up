import React, { useState } from "react";
import { View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  Canvas,
  Group,
  Mask,
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
import { SCREEN_WIDTH } from "~/theme";
import Text from "~/components/Text";
import Icon from "~/components/Icon";
import IconButton from "~/components/IconButton";
import { router } from "expo-router";

export type OCRResult = { id: string } & OCR.OCRResult;

function Scan() {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>();
  const [ocrResult, setOcrResult] = useState<OCRResult[]>([]);
  const [selectedBlocks, setSelectedBlocks] = useState<OCRResult[]>([]);

  const data = Skia.Data.fromBase64(image?.base64 || "");
  const skImage = Skia.Image.MakeImageFromEncoded(data);
  const imageWidth = skImage?.width() ?? 0;
  const imageHeight = skImage?.height() ?? 0;

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
      const textBlocks = await OCR.getTextFromImage(manipResult.base64);
      console.log(JSON.stringify(textBlocks, null, 2));
      setOcrResult([]);
      setOcrResult(textBlocks.map((b) => ({ id: nanoid(), ...b })));
    }
  }

  const scaleRatio = SCREEN_WIDTH / imageWidth;
  const scaledImageHeight = (imageHeight * SCREEN_WIDTH) / imageWidth;

  const scaledBlocks = ocrResult.map((block) => ({
    ...block,
    boundingBox: {
      x: block.boundingBox.x * scaleRatio,
      y: block.boundingBox.y * scaleRatio,
      width: block.boundingBox.width * scaleRatio,
      height: block.boundingBox.height * scaleRatio,
    },
  }));

  const gesture = Gesture.Tap().onEnd((event) => {
    if (!imageWidth || !imageHeight) return;
    const x = event.x;
    const y = event.y;
    const selected = scaledBlocks.find((block) => {
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
    if (selected) {
      const selectedBloxExists = selectedBlocks.find(
        (b) => b.id === selected.id
      );
      if (selectedBloxExists) {
        const newSelectedBlocks = selectedBlocks.filter(
          (b) => b.id !== selected.id
        );
        runOnJS(setSelectedBlocks)(newSelectedBlocks);
      } else {
        runOnJS(setSelectedBlocks)([...selectedBlocks, selected]);
      }
    }
  });

  return (
    <View className="flex-1 bg-black justify-center">
      <View className="absolute top-0 right-0 left-0 flex-row justify-between px-4 py-4">
        <Button onPress={() => router.back()} variant="secondary">
          Cancel
        </Button>
        <Button>Continue</Button>
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
                  {scaledBlocks.map((block) => (
                    <RoundedRect
                      key={block.id}
                      x={block.boundingBox.x}
                      y={block.boundingBox.y}
                      width={block.boundingBox.width}
                      height={block.boundingBox.height}
                      color={
                        selectedBlocks?.find((b) => b.id === block.id)
                          ? "black"
                          : "#00000000"
                      }
                      r={2}
                    />
                  ))}
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
          </Canvas>
          <GestureDetector gesture={gesture}>
            <Animated.View
              className="absolute bg-red-500/10"
              style={{ width: SCREEN_WIDTH, height: scaledImageHeight }}
            />
          </GestureDetector>
        </>
      )}
      {!image && (
        <Button className="mx-auto" variant="ghost" onPress={openImagePicker}>
          Choose Image
        </Button>
      )}
      {image && (
        <View className="absolute bottom-0 right-0 left-0 items-center pb-10">
          <View className="flex-row items-center gap-2">
            <View className="flex-row items-center gap-1">
              <Icon color="#a7aeac" size={20} name="ChevronsUpDown" />
              <Text className="text-gray-300 font-body-bold">CHOOSE...</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default Scan;
