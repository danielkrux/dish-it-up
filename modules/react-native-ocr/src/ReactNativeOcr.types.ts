export type OCRResult = {
  text: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  boundingBox: any;
};
