import React, { useState } from "react";
import { Send } from "lucide-react";
import { Link } from "react-router-dom";

type SentimentType = "Good" | "Neutral" | "Bad" | null;

export const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sentiment, setSentiment] = useState<SentimentType>(null);
  const [analyzedFeedback, setAnalyzedFeedback] = useState(""); // State to store the analyzed feedback
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const maxChars = 1000;

  const analyzeSentiment = async (text: string) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/feedback/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }), // Send feedback in the body
      });

      if (!response.ok) {
        throw new Error("Failed to analyze feedback. Please try again.");
      }

      const data = await response.json();
      setSentiment(data.sentiment as SentimentType);
      setAnalyzedFeedback(data.text); // Store the original feedback from the response
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim()) {
      analyzeSentiment(feedback);
    }
  };

  return (
    <main
      className={`w-full min-h-screen flex items-center justify-center p-4 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`w-full max-w-lg rounded-lg shadow-sm p-6 space-y-6 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        {/* Dark Mode Toggle */}
        <div className="flex justify-end">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className={`px-4 py-2 rounded-lg ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Admin Button */}
        <div className="flex justify-end">
          <Link
            to="/login"
            className={`${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"
            } px-4 py-2 rounded-lg hover:${
              darkMode ? "bg-gray-600" : "bg-gray-300"
            }`}
          >
            Admin Login
          </Link>
        </div>

        {/* Feedback Form */}
        <div>
          <h1 className="text-2xl font-semibold">
            Share Your Feedback
          </h1>
          <p className="mt-2">
            Help us improve by sharing your thoughts
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              maxLength={maxChars}
              placeholder="Enter your feedback here..."
              className={`w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
              disabled={isLoading}
            />
            <div className="flex justify-end mt-2">
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {feedback.length}/{maxChars} characters
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={!feedback.trim() || isLoading}
            className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
              darkMode
                ? "bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send size={18} />
                Submit Feedback
              </>
            )}
          </button>
        </form>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {sentiment && !isLoading && (
          <div className="border-t pt-4 space-y-2">
            <h2 className="text-lg font-medium">Feedback Analysis</h2>
            <div>
              <p className="text-gray-700">
                <strong>Your Feedback:</strong> {analyzedFeedback}
              </p>
              <div
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  sentiment === "Good"
                    ? "bg-green-100 text-green-800"
                    : sentiment === "Bad"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                Sentiment: {sentiment}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
