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
    // Analyze the sentiment of the input text
    const result = sentiment.analyze(text);

    // Determine the sentiment classification based on the score
    if (result.score > 0) return "Good";
    if (result.score < 0) return "Bad";
    return "Neutral";
  } catch (error) {
    // Narrow down the error type and access its message
    if (error instanceof Error) {
      throw new Error("Failed to analyze sentiment: " + error.message);
    }
    throw new Error("Failed to analyze sentiment due to an unknown error.");
  }
};
