import React, { useState, useEffect } from "react";

type FeedbackEntry = {
  id: string;
  text: string;
  sentiment: "Good" | "Neutral" | "Bad";
  createdAt: string;
};

export const FeedbackTable = () => {
  const [feedbackList, setFeedbackList] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch feedback from the API
    const fetchFeedback = async () => {
      try {
        const response = await fetch("http://localhost:3000/feedback"); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch feedback");
        }
        const data = await response.json();
        setFeedbackList(data); // Assuming the API returns an array of feedback
      } catch (err) {
        setError("Failed to load feedback");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // Log the raw date and parsed date for debugging
    console.log("Raw date string:", dateString);
    console.log("Parsed date:", date);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date"; // Return fallback text for invalid date
    }

    // Return only the date part, formatted as MM/DD/YYYY
    return date.toLocaleDateString(); 
  };

  if (loading) {
    return <div>Loading feedback...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">Recent Feedback</h2>
        <p className="text-gray-600 mt-1">View and manage customer feedback</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-y">
            <tr>
              <th className="text-left text-sm font-medium text-gray-500 px-6 py-3">
                Date
              </th>
              <th className="text-left text-sm font-medium text-gray-500 px-6 py-3">
                Feedback
              </th>
              <th className="text-left text-sm font-medium text-gray-500 px-6 py-3">
                Sentiment
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {feedbackList.map(feedback => (
              <tr key={feedback.id}>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {formatDate(feedback.createdAt)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">{feedback.text}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      feedback.sentiment === "Good"
                        ? "bg-green-100 text-green-800"
                        : feedback.sentiment === "Bad"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {feedback.sentiment}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
