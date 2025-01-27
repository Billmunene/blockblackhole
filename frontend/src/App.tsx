import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FeedbackForm } from "./components/FeedbackForm";
import { LoginPage } from "./components/auth/LoginPage";
import { FeedbackTable } from "./components/admin/FeedbackTable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<FeedbackTable />} /> {/* Route for FeedbackTable */}
      </Routes>
    </Router>
  );
}

export default App;
