import app from "./axios";

export const fetchProject = async () => {
  try {
    const { data } = await app.get("/projects/projects");

    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const individualProject = async (id) => {
  try {
    const { data } = await app.get(`/projects/projects/${id}`);

    return data.data;
  } catch (error) {
    console.log(error);
  }
};
