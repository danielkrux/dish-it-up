import React, { useState } from "react";
import { View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  Canvas,
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

type OCRResult = { id: string } & OCR.OCRResult;

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
      exif: true,
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
    <View>
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
            {scaledBlocks.map((block, index) => (
              <RoundedRect
                key={block.id}
                x={block.boundingBox.x}
                y={block.boundingBox.y}
                width={block.boundingBox.width}
                height={block.boundingBox.height}
                color={
                  selectedBlocks?.find((b) => b.id === block.id)
                    ? "#46867150"
                    : "#00000040"
                }
                r={2}
              />
            ))}
          </Canvas>
          <GestureDetector gesture={gesture}>
            <Animated.View
              className="absolute bg-red-500/10"
              style={{ width: SCREEN_WIDTH, height: scaledImageHeight }}
            />
          </GestureDetector>
        </>
      )}
      <Button className="mt-20" onPress={openImagePicker}>
        Choose Image
      </Button>
    </View>
  );
}

export default Scan;
