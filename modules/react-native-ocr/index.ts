import ReactNativeOcrModule from "./src/ReactNativeOcrModule";

// export function getTextFromImage(
//   imagePath: string
// ): { text: string; boundingBox: any }[] {
//   return ReactNativeOcrModule.getTextFromImage(imagePath);
// }

export async function getTextFromImage(
  imageBase64: string
): Promise<{ text: string; boundingBox: any }[]> {
  return ReactNativeOcrModule.getTextFromImage(imageBase64);
}
