const crossOriginFetch = async (url) => {
  const { ok, dataUrl, error } = await chrome.runtime.sendMessage({
    type: "fetch",
    data: url
  });

  if (!ok) {
    throw new Error(error);
  }

  return await fetch(dataUrl);
};

const getFileName = (url) => {
  const urlObj = new URL(url);
  return urlObj.pathname.replace(/^.*\/(?=.+)/, "");
};

export const createFileByFetching = async (url) => {
  const response = await crossOriginFetch(url);
  const blob = await response.blob();
  const fileName = getFileName(url);
  return new File([blob], fileName, { type: blob.type });
};
