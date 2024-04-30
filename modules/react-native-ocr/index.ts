import { OCRResult } from "./src/ReactNativeOcr.types";
import ReactNativeOcrModule from "./src/ReactNativeOcrModule";

export async function getTextFromImage(
  imageBase64: string
): Promise<OCRResult[]> {
  return ReactNativeOcrModule.getTextFromImage(imageBase64);
}

export { OCRResult };
