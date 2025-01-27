// Import necessary modules and entities
import { AppDataSource } from "../setup/datasource"; // DataSource for database connection
import { Feedback } from "../entities/feedback.entity"; // Feedback entity representing feedback in the database
import { analyzeSentiment } from "../utils/sentimentAnalyzer"; // Function to analyze sentiment of feedback text

// FeedbackService class handles the business logic for feedback operations
export class FeedbackService {
  // Initialize feedbackRepository to interact with the Feedback entity in the database
  private feedbackRepository = AppDataSource.getRepository(Feedback);

  // Method to submit feedback and analyze sentiment
  // Takes feedback text, performs sentiment analysis, and saves it to the database
  async submitFeedback(text: string): Promise<Feedback> {
    // Analyze sentiment of the feedback text using the sentiment analysis utility
    const sentiment = await analyzeSentiment(text);
    // Create a new feedback entity with the text and sentiment
    const feedback = this.feedbackRepository.create({ text, sentiment });
    // Save the feedback entity to the database and return the saved feedback
    return this.feedbackRepository.save(feedback);
  }

  // Method to get all feedback from the database, ordered by creation date
  async getAllFeedback(): Promise<Feedback[]> {
    // Retrieve feedback entries, ordered by 'created_at' in descending order
    return this.feedbackRepository.find({
      order: { created_at: "DESC" },
    });
  }
}
