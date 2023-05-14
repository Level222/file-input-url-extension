export const blobToDataUrl = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      resolve(reader.result);
    });
    reader.addEventListener("error", () => {
      reject(reader.error);
    });

    reader.readAsDataURL(blob);
  });
};
