import { SCREEN_WIDTH, isTablet } from "~/theme";

const MAX_WIDTH = isTablet ? SCREEN_WIDTH / 1.64 : SCREEN_WIDTH;

export const ITEM_SIZE = MAX_WIDTH;
export const ITEM_SPACING = (MAX_WIDTH - ITEM_SIZE) / 2;
