import axiosIntance from "./interceptors";

export const uploadImage = async (uri: string) => {
  const formData = new FormData();

  const uriParts = uri.split(".");
  const fileExtension = uriParts[uriParts.length - 1];

  const file = {
    uri: uri,
    type: `image/${fileExtension}`,
    name: `photo.${fileExtension}`,
  };

  const fileToUpload = {
    uri: file.uri,
    type: file.type,
    name: file.name,
  };

  formData.append("file", fileToUpload as any);

  try {
    const response = await axiosIntance.postForm(`/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Upload bem-sucedido!", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro no upload:", error);
  }
};
