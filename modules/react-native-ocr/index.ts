import ReactNativeOcrModule from "./src/ReactNativeOcrModule";

export async function getTextFromImage(
  imageBase64: string
): Promise<OCRResult[]> {
  return ReactNativeOcrModule.getTextFromImage(imageBase64);
}
