/** @format */

import express from "express";
import cors from "cors"; // Import the cors package
import { databaseSetup } from "./setup";
import { backendSetup } from "./setup/backend.setup";
import { Logger, MESSAGES } from "./utils";
import { feedbackRouter } from "./routers/feedback.router"; // Import the feedback router

const app = express();

// Add CORS middleware
app.use(cors()); 

// Middleware to parse JSON bodies
app.use(express.json());

// Use the feedbackRouter for handling feedback routes
app.use("/feedback", feedbackRouter);

const setupServer = async () => {
  try {
    // Set up the database connection
    await databaseSetup();
    Logger.info(MESSAGES.CONNECTED_DATABASE);
  } catch (err) {
    Logger.error(err);
    Logger.info(MESSAGES.FAILED_TO_CONNECT_DATABASE);
    return;
  }

  try {
    // Set up the backend (Express server)
    await backendSetup();
    Logger.info(MESSAGES.SERVER_RUNNING);
    app.listen(3000, () => {
      Logger.info("Server running on http://localhost:3000");
    });
  } catch (err) {
    Logger.error(err);
    Logger.info(MESSAGES.SERVER_RUNNING_FAILED);
  }
};

setupServer();
