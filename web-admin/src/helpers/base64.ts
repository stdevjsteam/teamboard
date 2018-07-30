export const convertToBase64 = (image: File) => {
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(image);
  });
};
