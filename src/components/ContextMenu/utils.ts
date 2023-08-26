import { SCREEN_HEIGHT } from "../../theme";

const ITEM_HEIGHT = 47;
export const MENU_WIDTH = 220;

export const SPRING_CONFIGURATION = {
  damping: 33,
  mass: 1.03,
  stiffness: 500,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
};

export type TransformOriginAnchorPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export function getTransformOrigin(
  posX: number,
  triggerWidth: number,
  windowWidth: number,
  bottom?: boolean
): TransformOriginAnchorPosition {
  "worklet";
  const distanceToLeft = Math.round(posX + triggerWidth / 2);
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
}

export function calcMenuHeight(actionLength: number) {
  "worklet";
  return actionLength * ITEM_HEIGHT;
}

export function calculateTranslateX(
  anchorPosition: TransformOriginAnchorPosition,
  triggerWidth: number
) {
  "worklet";

  const anchorPositionHorizontal = anchorPosition.split("-")[1];

  if (anchorPositionHorizontal === "right") {
    return MENU_WIDTH / 2 - triggerWidth / 2;
  } else if (anchorPositionHorizontal === "center") {
    return 0;
  } else {
    return MENU_WIDTH;
  }
}

// export function calculateTranslateY(anchorPosition: TransformOriginAnchorPosition, actionLength: number) {
//   "worklet";

//   const anchorPositionVertical = anchorPosition.split("-")[0];

//   if (anchorPositionVertical === "top") {
//     return ;
//   } else {
//     return -SCREEN_HEIGHT + ITEM_HEIGHT;
//   }
// }

export function calculateLeftPosition(
  anchorPosition: TransformOriginAnchorPosition,
  triggerWidth: number
) {
  "worklet";

  const anchorPositionHorizontal = anchorPosition.split("-")[1];

  if (anchorPositionHorizontal === "right") {
    return -MENU_WIDTH + triggerWidth / 1.3;
  } else if (anchorPositionHorizontal === "left") {
    return 0;
  } else {
    return -triggerWidth - MENU_WIDTH / 2 + triggerWidth / 2;
  }
}
