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
    return error.response.data.message;
  }
};

export const current = async () => {
  console.log("call");

  try {
    const { data } = await app.get("/users/current-user", {
      withCredentials: true,
    });
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};
