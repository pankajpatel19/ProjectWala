import app from "./axios";

export const signup = async (formData) => {
  try {
    const { data } = await app.post("/users/signup", formData);
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);

    return error.response.data.message;
  }
};

export const login = async (formData) => {
  try {
    const { data } = await app.post("/users/login", formData);

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const current = async () => {
  try {
    const { data } = await app.get("/users/current-user", {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch Current");
  }
};

export const logout = async () => {
  try {
    console.log("call");
    const { data } = await app.get("/users/logout", {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to logout");
  }
};
