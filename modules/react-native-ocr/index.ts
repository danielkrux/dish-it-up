import { TextBlock } from "./src/ReactNativeOcr.types";
import ReactNativeOcrModule from "./src/ReactNativeOcrModule";

export async function getTextFromImage(
  imageBase64: string
): Promise<TextBlock[]> {
  return ReactNativeOcrModule.getTextFromImage(imageBase64);
}

export { TextBlock };
