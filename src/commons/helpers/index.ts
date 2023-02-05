export const urlAsset = (path: string): string => {
  return `https://austeread.com/assets/${path}`;
};

let lastGenerateId = 0;
export const lastId = (prefix = "id") => {
  lastGenerateId++;
  return `${prefix}${lastGenerateId}`;
};
