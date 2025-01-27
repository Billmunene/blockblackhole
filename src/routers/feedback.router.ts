// Import the Router from Express to define routes
import { Router } from "express";
// Import the FeedbackController to handle requests related to feedback
import { FeedbackController } from "../controllers/feedback.controller";

// Initialize the feedbackRouter to define feedback-related routes
const feedbackRouter = Router();
// Create an instance of FeedbackController to handle the logic for the routes
const feedbackController = new FeedbackController();

// Define the POST route to submit feedback
// This route triggers the submitFeedback method in FeedbackController to handle the request
feedbackRouter.post("/submit", (req, res) => {
  feedbackController.submitFeedback(req, res); // Submit feedback
});

// Define the GET route to retrieve all feedback
// Admin access is implied for this route, where all feedback data will be fetched
feedbackRouter.get("/", (req, res) => {
  feedbackController.getAllFeedback(req, res); // Get all feedback
});

// Export the feedbackRouter to be used in other parts of the application
export { feedbackRouter };
