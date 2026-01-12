import app from "./axios";

export const fetchProject = async () => {
  try {
    const data = await app.get("/projects");
    return data;
  } catch (error) {
    console.error(error);
  }
};
