/** @format */

import express from "express";
import cors from "cors"; // Import the cors package to enable cross-origin resource sharing
import { databaseSetup } from "./setup"; // Import the function for setting up the database connection
import { backendSetup } from "./setup/backend.setup"; // Import the function for setting up the backend (Express server)
import { Logger, MESSAGES } from "./utils"; // Import the Logger and MESSAGES utilities for logging
import { feedbackRouter } from "./routers/feedback.router"; // Import the feedback router for handling feedback-related routes

// Initialize the Express application
const app = express();

// Add CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware to automatically parse incoming JSON requests
app.use(express.json());

// Use the feedbackRouter for all routes under /feedback
app.use("/feedback", feedbackRouter);

// Function to set up the server, including database and backend configurations
const setupServer = async () => {
  try {
    // Set up the database connection and log success
    await databaseSetup();
    Logger.info(MESSAGES.CONNECTED_DATABASE);
  } catch (err) {
    // Log error if database connection fails
    Logger.error(err);
    Logger.info(MESSAGES.FAILED_TO_CONNECT_DATABASE);
    return;
  }

  try {
    // Set up the Express backend and start listening on port 3000
    await backendSetup();
    Logger.info(MESSAGES.SERVER_RUNNING);
    app.listen(3000, () => {
      Logger.info("Server running on http://localhost:3000");
    });
  } catch (err) {
    // Log error if backend setup or server start fails
    Logger.error(err);
    Logger.info(MESSAGES.SERVER_RUNNING_FAILED);
  }
};

// Call the setupServer function to initialize the application
setupServer();
