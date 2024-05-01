import * as OCR from "modules/react-native-ocr";

export type RecipeFieldType =
  | "title"
  | "description"
  | "ingredient"
  | "instruction";

export type TextBlock = {
  id: string;
  type?: RecipeFieldType;
} & OCR.TextBlock;
