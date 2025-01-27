import { AppDataSource } from "../setup/datasource";
import { Feedback } from "../entities/feedback.entity";
import { analyzeSentiment } from "../utils/sentimentAnalyzer";

export class FeedbackService {
  private feedbackRepository = AppDataSource.getRepository(Feedback);

  // Submit feedback with sentiment analysis
  async submitFeedback(text: string): Promise<Feedback> {
    const sentiment = await analyzeSentiment(text); // Analyze sentiment of feedback
    const feedback = this.feedbackRepository.create({ text, sentiment }); // Create feedback entity
    return this.feedbackRepository.save(feedback); // Save feedback to database
  }

  // Get all feedback from the database, ordered by creation date
  async getAllFeedback(): Promise<Feedback[]> {
    return this.feedbackRepository.find({
      order: { created_at: "DESC" }, // Order by 'created_at' in descending order
    });
  }
}
