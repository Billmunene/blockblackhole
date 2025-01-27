// Import the Sentiment library for sentiment analysis
import Sentiment from "sentiment";

/**
 * Initialize the sentiment analyzer instance.
 * The Sentiment library uses predefined algorithms and word lists to calculate sentiment scores.
 */
const sentiment = new Sentiment();

/**
 * Analyze the sentiment of a given text and return the classification.
 * @param text - The feedback text to analyze.
 * @returns {Promise<"Good" | "Bad" | "Neutral">} - Sentiment classification result.
 */
export const analyzeSentiment = async (text: string): Promise<"Good" | "Bad" | "Neutral"> => {
  try {
    // Analyze the sentiment of the input text using the Sentiment library
    const result = sentiment.analyze(text);

    // Determine the sentiment classification based on the score
    if (result.score > 0) return "Good"; // Positive sentiment
    if (result.score < 0) return "Bad"; // Negative sentiment
    return "Neutral"; // Neutral sentiment if score is 0
  } catch (error) {
    // If an error occurs during sentiment analysis, handle it by throwing a custom error message
    if (error instanceof Error) {
      throw new Error("Failed to analyze sentiment: " + error.message);
    }
    throw new Error("Failed to analyze sentiment due to an unknown error.");
  }
};
