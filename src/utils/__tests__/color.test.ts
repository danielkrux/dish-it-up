import { hexToRGBA } from "../color";

test("hexToRGBA", () => {
  // Test case 1: Hex color with alpha value
  expect(hexToRGBA("#FF0000", 0.5)).toBe("rgba(255, 0, 0, 0.5)");

  // Test case 2: Hex color without alpha value
  expect(hexToRGBA("#00FF00")).toBe("rgb(0, 255, 0)");

  // Test case 3: Hex color with alpha value as 0
  expect(hexToRGBA("#0000FF", 0)).toBe("rgba(0, 0, 255, 0)");

  // Test case 4: Hex color with alpha value greater than 1 (should be clamped to 1)
  expect(hexToRGBA("#FFFFFF", 2)).toBe("rgba(255, 255, 255, 1)");
});
