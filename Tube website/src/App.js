// PUT THE FIRST CODE BLOCK (Main App Structure) HERE
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// ... rest of the App.js code
// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import VideoAnalyzer from './pages/VideoAnalyzer';
import KeywordResearch from './pages/KeywordResearch';
import CompetitorAnalysis from './pages/CompetitorAnalysis';
import SEOStudio from './pages/SEOStudio';
import ThumbnailGenerator from './pages/ThumbnailGenerator';
import TrendAlerts from './pages/TrendAlerts';
import ChannelManager from './pages/ChannelManager';

// Context
import { AnalyticsProvider } from './context/AnalyticsContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AnalyticsProvider>
      <Router>
        <div className="app">
          <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <div className="app-body">
            <Sidebar isOpen={sidebarOpen} />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/video-analyzer" element={<VideoAnalyzer />} />
                <Route path="/keyword-research" element={<KeywordResearch />} />
                <Route path="/competitor-analysis" element={<CompetitorAnalysis />} />
                <Route path="/seo-studio" element={<SEOStudio />} />
                <Route path="/thumbnail-generator" element={<ThumbnailGenerator />} />
                <Route path="/trend-alerts" element={<TrendAlerts />} />
                <Route path="/channel-manager" element={<ChannelManager />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AnalyticsProvider>
  );
}

export default App;