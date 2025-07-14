// src/routes.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Top‐level pages
// import HomePage from "./pages/HomePage";
import TeamMembers from "./pages/TeamMembers";
import OurWorks from "./pages/OurWorks";
import LandingPage from "./pages/LandingPage";
import Outreach from "./pages/Outreach";
import ContactForm from "./pages/ContactForm";


// MPC subpages
// import MPCDecision from "./pages/MPC/MPCDecision";
// import MPCMeetingAnalysis from "./pages/MPC/MPCMeetingAnalysis";
import MPCMembers from "./pages/MPC/MPCMembers";
import MPCPage from "./pages/MPC/MPCPage";
import MPCFormation from "./pages/MPC/MPCFormation";
import MpcDecisions from "./pages/MPC/MpcDecisions";
import MpcVoting from "./pages/MPC/MpcVoting";
import WordCloudAnalysis from "./pages/MPC/WordCloudAnalysis";
import MPCDiscussions from "./pages/MPC/MPCDiscussions";

// import MPCCorrelation from "./pages/MPC/MPCCorrelation";
// import MPCVotingPattern from "./pages/MPC/MPCVotingPattern";

// // Explorer subpages
// import ExplorerOverview from "./pages/Explorer/ExplorerOverview";
// import SentimentOvertime from "./pages/Explorer/SentimentOvertime";
// import DecentOvertime from "./pages/Explorer/DecentOvertime";
// import TopicTrends from "./pages/Explorer/TopicTrends";
// import Chatbot from "./pages/Explorer/Chatbot";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Home */}
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<LandingPage />} />

        {/* Team Members */}
        <Route path="/team" element={<TeamMembers />} />

        {/* MPC Section */}
        <Route path="/mpc" element={<MPCPage />}>
          {/* <Route path="evaluation" element={<MPCEvaluation />} /> */}
          {/* <Route path="meeting-analysis" element={<MPCMeetingAnalysis />} /> */}
          {/* <Route path="correlation-graph" element={<MPCCorrelation />} />
          <Route path="voting-pattern" element={<MPCVotingPattern />} /> */}
          <Route path="" element={<Navigate to="evaluation" replace />} />
        </Route>
          <Route path="/member" element={<MPCMembers />} />
          <Route path="formation" element={<MPCFormation />} />
          <Route path="/mpc-decisions" element={<MpcDecisions />} />
          <Route path="/mpc-voting" element={<MpcVoting />} />
          <Route path="/word-cloud" element={<WordCloudAnalysis />} />
          <Route path="/economic-discussions" element={<MPCDiscussions />} />
        {/* Explorer Section */}
        {/* <Route path="/explorer" element={<ExplorerOverview />}>
          <Route path="sentiment-overtime" element={<SentimentOvertime />} />
          <Route path="decent-overtime" element={<DecentOvertime />} />
          <Route path="topic-trends" element={<TopicTrends />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="" element={<Navigate to="sentiment-overtime" replace />} />
        </Route> */}

        {/* Other single‐page routes */}
        <Route path="/ourworks" element={<OurWorks />} />
        <Route path="/outreach" element={<Outreach />} />
        <Route path="/contact" element={<ContactForm />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;