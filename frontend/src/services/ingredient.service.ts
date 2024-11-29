import axiosIntance from "./interceptors";

export const getIngredients = async (name?: string) => {
  try {
    const queryParams = new URLSearchParams();

    if (name) queryParams.append("name", name);

    const response = await axiosIntance.get(
      `/ingredients?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createIngredient = async (name: string) => {
  try {
    const response = await axiosIntance.post(`/ingredients`, {
      name,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
