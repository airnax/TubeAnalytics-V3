// src/pages/VideoAnalyzer.js
import React, { useState, useRef } from 'react';
import VideoInsights from '../components/Analytics/VideoInsights';
import SEORecommendations from '../components/SEO/SEORecommendations';
import ThumbnailAnalyzer from '../components/Analytics/ThumbnailAnalyzer';
import CompetitorComparison from '../components/Analytics/CompetitorComparison';
import AITools from '../components/AI/AITools';

const VideoAnalyzer = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const videoRef = useRef();

  const analyzeVideo = async (url) => {
    // API call to analyze video
    try {
      const response = await fetch('/api/analyze-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: url })
      });
      const data = await response.json();
      setVideoData(data);
    } catch (error) {
      console.error('Analysis error:', error);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'seo', label: 'SEO Analysis', icon: '🔍' },
    { id: 'thumbnail', label: 'Thumbnail', icon: '🖼️' },
    { id: 'competitors', label: 'Competitors', icon: '⚔️' },
    { id: 'ai-tools', label: 'AI Tools', icon: '🤖' }
  ];

  return (
    <div className="video-analyzer">
      <div className="analyzer-header">
        <h1>Advanced Video Analysis</h1>
        <div className="url-input-container">
          <input
            type="text"
            placeholder="Paste YouTube video URL..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="url-input"
          />
          <button 
            onClick={() => analyzeVideo(videoUrl)}
            className="analyze-btn"
          >
            Analyze Video
          </button>
        </div>
      </div>

      {videoData && (
        <>
          {/* Video Summary */}
          <div className="video-summary">
            <div className="video-preview">
              <img src={videoData.thumbnail} alt="Video thumbnail" />
            </div>
            <div className="video-stats">
              <h2>{videoData.title}</h2>
              <div className="stat-grid">
                <div className="stat">
                  <span className="stat-value">{videoData.views?.toLocaleString()}</span>
                  <span className="stat-label">Views</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{videoData.likes?.toLocaleString()}</span>
                  <span className="stat-label">Likes</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{videoData.comments?.toLocaleString()}</span>
                  <span className="stat-label">Comments</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{videoData.engagementRate}%</span>
                  <span className="stat-label">Engagement</span>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Tabs */}
          <div className="analysis-tabs">
            <div className="tab-headers">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-header ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="tab-content">
              {activeTab === 'overview' && <VideoInsights data={videoData} />}
              {activeTab === 'seo' && <SEORecommendations data={videoData} />}
              {activeTab === 'thumbnail' && <ThumbnailAnalyzer data={videoData} />}
              {activeTab === 'competitors' && <CompetitorComparison data={videoData} />}
              {activeTab === 'ai-tools' && <AITools data={videoData} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoAnalyzer;