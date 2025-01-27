import { Router } from "express";
import { FeedbackController } from "../controllers/feedback.controller";

const feedbackRouter = Router();
const feedbackController = new FeedbackController();

// Route to submit feedback
feedbackRouter.post("/submit", (req, res) => {
  feedbackController.submitFeedback(req, res);
});

// Route to get all feedback (admin access would be implied here)
feedbackRouter.get("/", (req, res) => {
  feedbackController.getAllFeedback(req, res);
});

export { feedbackRouter };
