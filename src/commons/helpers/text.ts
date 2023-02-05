export const textHtmlBersih = (text: string): string => {
  return text.replace(/\r?\n|\r/g, "").trim();
};
