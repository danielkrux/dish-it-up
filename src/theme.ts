export const pallettes = {
  black: {
    900: "#000000",
    800: "#1C1C1C",
    700: "#383838",
    600: "#555555",
    500: "#717171",
    400: "#8D8D8D",
    300: "#AAAAAA",
    200: "#C6C6C6",
    100: "#E2E2E2",
  },
};

export default {
  colors: {
    primary: "#98D9C2",
    secondary: "#ABEDC6",
    grey: "#F4F4F4",
    black: pallettes.black[900],
    white: "#FFFFFF",
  } as const,
  spacing: {
    xs: 8,
    s: 16,
    m: 24,
    l: 32,
  } as const,
  fontSize: {
    s: 12,
    m: 14,
    l: 16,
    xl: 20,
  } as const,
};
