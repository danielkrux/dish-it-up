import { SCREEN_HEIGHT } from "../../theme";

const ITEM_HEIGHT = 50;
const MENU_WIDTH = 200;

export type TransformOriginAnchorPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export const calculateTransformValue = (
  safeAreaInsets: { bottom: number; top: number; right: number; left: number },
  transformOrigin: TransformOriginAnchorPosition,
  itemRectY: number,
  itemRectHeight: number,
  menuHeight: number
) => {
  "worklet";

  const height = SCREEN_HEIGHT;

  const isAnchorPointTop = transformOrigin.includes("top");

  let tY = 0;
  if (isAnchorPointTop) {
    const topTransform =
      itemRectY +
      itemRectHeight +
      menuHeight +
      10 +
      (safeAreaInsets?.bottom || 0);

    tY = topTransform > height ? height - topTransform : 0;
  } else {
    const bottomTransform = itemRectY - menuHeight - (safeAreaInsets?.top || 0);
    tY = bottomTransform < 0 ? -bottomTransform + 10 * 2 : 0;
  }

  return tY;
};

export const getTransformOrigin = (
  posX: number,
  itemWidth: number,
  windowWidth: number,
  bottom?: boolean
): TransformOriginAnchorPosition => {
  "worklet";
  const distanceToLeft = Math.round(posX + itemWidth / 2);
  const distanceToRight = Math.round(windowWidth - distanceToLeft);

  let position: TransformOriginAnchorPosition = bottom
    ? "bottom-right"
    : "top-right";

  const majority = Math.abs(distanceToLeft - distanceToRight);

  if (majority < 10) {
    position = bottom ? "bottom-center" : "top-center";
  } else if (distanceToLeft < distanceToRight) {
    position = bottom ? "bottom-left" : "top-left";
  }

  return position;
};

export const calculateLeftPosition = (
  anchorPosition: TransformOriginAnchorPosition,
  itemWidth: number
) => {
  "worklet";

  const anchorPositionHorizontal = anchorPosition.split("-")[1];

  if (anchorPositionHorizontal === "right") {
    return -MENU_WIDTH + itemWidth;
  } else if (anchorPositionHorizontal === "left") {
    return 0;
  } else {
    return -itemWidth - MENU_WIDTH / 2 + itemWidth / 2;
  }
};
