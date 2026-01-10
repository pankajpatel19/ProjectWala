import Project from "../models/project.model.js";

export const checkUserBeforePost = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { projectId } = req.params;

    const isEligible = await Project.findOne({ _id: projectId, user_id: id });
    if (!isEligible) {
      return res.status(403).json({
        status: "fail",
        message: "You are not authorized to post a review for this project.",
      });
    }
    next();
  } catch (error) {
    next(error.message);
  }
};
