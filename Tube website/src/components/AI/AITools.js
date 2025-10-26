// src/components/AI/AITools.js
import React, { useState } from 'react';

const AITools = ({ data }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAISuggestions = async (type) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoData: data, type })
      });
      const aiData = await response.json();
      setSuggestions(aiData.suggestions);
    } catch (error) {
      console.error('AI generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="ai-tools">
      <div className="ai-header">
        <h3>AI-Powered Optimization Tools</h3>
        <p>Generate intelligent suggestions using advanced machine learning</p>
      </div>

      <div className="ai-actions">
        <button 
          onClick={() => generateAISuggestions('titles')}
          disabled={isGenerating}
          className="ai-btn"
        >
          🎯 Generate Title Ideas
        </button>
        <button 
          onClick={() => generateAISuggestions('thumbnails')}
          disabled={isGenerating}
          className="ai-btn"
        >
          🖼️ Thumbnail Suggestions
        </button>
        <button 
          onClick={() => generateAISuggestions('tags')}
          disabled={isGenerating}
          className="ai-btn"
        >
          🔖 Optimal Tags
        </button>
        <button 
          onClick={() => generateAISuggestions('content')}
          disabled={isGenerating}
          className="ai-btn"
        >
          📝 Content Strategy
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="ai-suggestions">
          <h4>AI Suggestions:</h4>
          <div className="suggestions-grid">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="suggestion-card">
                <div className="suggestion-content">
                  {suggestion.content}
                </div>
                <div className="suggestion-meta">
                  <span className="confidence">
                    Confidence: {suggestion.confidence}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AITools;
// PUT THE AITools COMPONENT CODE HERE
// This is the last code block from the previous response