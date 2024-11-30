import axiosIntance from "./interceptors";

export const getMealTypes = async (name: string) => {
  try {
    const response = await axiosIntance.get(`/meal-types?name=${name}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createMealType = async (name: string) => {
  try {
    const response = await axiosIntance.post(`/meal-types`, { name });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
