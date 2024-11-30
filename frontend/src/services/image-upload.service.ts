import axiosIntance from "./interceptors";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosIntance.post(`/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Upload bem-sucedido!", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro no upload:", error);
    throw error;
  }
};
