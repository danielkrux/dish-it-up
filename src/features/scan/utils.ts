import { capitalize } from "lodash";
import { TextBlock } from "./types";

export function prepareTextBlocksForForm(textBlocks: TextBlock[]) {
  const selectedBlocks = textBlocks.filter((block) => block.type);

  const title = selectedBlocks.find((block) => block.type === "title")?.text;
  const description = selectedBlocks.find(
    (block) => block.type === "description"
  )?.text;

  const ingredients = selectedBlocks
    .filter((block) => block.type === "ingredient")
    .flatMap((block) => block.lines);

  const instructions = selectedBlocks
    .filter((block) => block.type === "instruction")
    .map((block) => block.text);

  return {
    name: capitalize(title),
    description,
    instructions: JSON.stringify(instructions),
    ingredients: JSON.stringify(ingredients),
  };
}