import { catchAsync } from "../middleware/catchAsync.middleware.js";
import ReviewService from "../services/review/review.service.js";

export const postCommentService = catchAsync(async (req, res) => {
  // Implementation for posting a comment
  const { projectId } = req.params;
  const { id } = req.user;
  const { comment, rating } = req.body;
  const newComment = await ReviewService.postComment({
    projectId,
    userId: id,
    comment,
    rating,
  });
  res.status(201).json({
    status: "success",
    data: { comment: newComment },
  });
});
