import { Request, Response } from "express";
import { FeedbackService } from "../services/feedback.service";

export class FeedbackController {
  private feedbackService = new FeedbackService();

  // Submit feedback
  async submitFeedback(req: Request, res: Response): Promise<void> {
    try {
      const { text } = req.body;
      if (!text || text.length > 1000) {
        res.status(400).json({ error: "Invalid feedback text." });
        return;
      }
      const feedback = await this.feedbackService.submitFeedback(text);
      res.status(201).json(feedback); // Respond with the created feedback
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: "Failed to submit feedback." });
    }
  }

  // Get all feedback
  async getAllFeedback(req: Request, res: Response): Promise<void> {
    try {
      const feedbacks = await this.feedbackService.getAllFeedback();
      res.status(200).json(feedbacks); // Respond with the list of feedback
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: "Failed to retrieve feedback." });
    }
  }
}
