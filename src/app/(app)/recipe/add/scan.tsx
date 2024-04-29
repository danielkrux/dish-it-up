import React from "react";
import { View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "~/components/Button";
import { getTextFromImage } from "modules/react-native-ocr";

function Scan() {
  async function openImagePicker() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      selectionLimit: 5,
      base64: true,
    });

    if (!result.canceled) {
      const pickedImage = result.assets[0];
      if (!pickedImage.base64) return;
      const textBlocks = await getTextFromImage(pickedImage.base64);
      console.log(textBlocks);
    }
  }
  return (
    <View className="items-center justify-center">
      <Button onPress={openImagePicker}>Choose Image</Button>
    </View>
  );
}

export default Scan;
