import { SCREEN_WIDTH } from "~/theme";

export const MARGIN = 16;
export const SIZE = 128;
export const TOTAL_SIZE = SIZE + MARGIN;

export function getOrder(tx: number) {
  "worklet";
  const x = Math.round((tx / TOTAL_SIZE) * TOTAL_SIZE);
  const index = Math.max(x, 0) / TOTAL_SIZE;
  return Math.floor(index);
}
