import ApiError from "../../middleware/apiError.midllware.js";

class ReviewSchema {
  async postComment({ projectId, userId, comment, rating }) {
    // Implementation for posting a comment
    if (!projectId || !userId || !rating) {
      throw new ApiError("Missing required fields", 400);
    }

    const postedComment = await Review.create({
      productId: projectId,
      userId,
      comment,
      rating,
    });
    return postedComment;
  }
}

export default new ReviewSchema();
