import { decode } from "https://esm.sh/html-entities@2.5.2";

export const clean = (str: string) => {
  const s = str
    .trim()
    .replace(/\s+/g, " ")
    .replace(/(\r\n|\n|\r)/gm, "")
    .replace("&amp;nbsp;", "");
  return decode(s);
};
