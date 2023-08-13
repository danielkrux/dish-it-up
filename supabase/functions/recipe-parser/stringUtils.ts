export const clean = (str: string) => {
  return str
    .trim()
    .replace(/\s+/g, " ")
    .replace(/(\r\n|\n|\r)/gm, "")
    .replace("&amp;nbsp;", "");
};
