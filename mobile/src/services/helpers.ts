import axiosInstance from "./interceptors";

export const makeRequest = async (method: string, url: string, data?: any) => {
  try {
    if (method === "get") {
      return (await axiosInstance.get(url)).data;
    }
    if (method === "post") {
      return (await axiosInstance.post(url, data)).data;
    }
    if (method === "put") {
      return (await axiosInstance.put(url, data)).data;
    }
    if (method === "delete") {
      return (await axiosInstance.delete(url)).data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
