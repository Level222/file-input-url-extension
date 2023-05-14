import { blobToDataUrl } from "./blob-to-data-url";

export const fetchDataUrl = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const blob = await response.blob();
  return await blobToDataUrl(blob);
};
