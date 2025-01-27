import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

type FeedbackEntry = {
  id: string;
  text: string;
  sentiment: "Good" | "Neutral" | "Bad";
  createdAt: string;
};

export const FeedbackTable = () => {
  const [feedbackList, setFeedbackList] = useState<FeedbackEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}/feedback`, // Adjust URL based on your API endpoint
          {
            headers: {
              'Authorization': `Bearer ${process.env.JWT_SECRET}` // Assuming JWT-based authentication
            }
          }
        );
        setFeedbackList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-756">Recent Feedback</h2>
        <p className="text-gray-600 mt-1">View and manage customer feedback</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
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
          <tbody>
            {feedbackList.map(feedback => (
              <tr key={feedback.id}>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {feedback.text}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                    ${feedback.sentiment === "Good" ? "bg-green-100 text-green-800" : feedback.sentiment === "Bad" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
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