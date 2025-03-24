import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from './context/themecontext';
import DataEntryPage from "./pages/dataentry";
import PortfolioPage from "./pages/portfolio";
import Navbar from "./components/navbar";
import "./global.css";

const App = () => {
  const [portfolioData, setPortfolioData] = useState(null);

  const handleSubmit = (data) => {
    const processedData = {
      ...data,
      studentInfo: {
        ...data.studentInfo,
        skills: typeof data.studentInfo.skills === 'string' 
          ? data.studentInfo.skills.split(',').map(skill => skill.trim())
          : data.studentInfo.skills || []
      }
    };
    setPortfolioData(processedData);
  };

  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={<DataEntryPage onSubmit={handleSubmit} />} 
          />
          <Route 
            path="/portfolio" 
            element={
              portfolioData ? 
                <PortfolioPage data={portfolioData} /> : 
                <Navigate to="/" />
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;


