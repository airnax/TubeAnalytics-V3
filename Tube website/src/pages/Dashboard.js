// src/pages/Dashboard.js
import React, { useState, useContext } from 'react';
import { AnalyticsContext } from '../context/AnalyticsContext';
import MetricCard from '../components/Cards/MetricCard';
import AnalyticsChart from '../components/Charts/AnalyticsChart';
import QuickActions from '../components/Widgets/QuickActions';
import RecentVideos from '../components/Widgets/RecentVideos';
import PerformanceGrid from '../components/Widgets/PerformanceGrid';

const Dashboard = () => {
  const { channelData, isLoading } = useContext(AnalyticsContext);
  const [timeRange, setTimeRange] = useState('30d');

  const metrics = [
    {
      title: 'Subscribers',
      value: channelData?.subscribers || 0,
      change: '+12.5%',
      trend: 'up',
      icon: '👥'
    },
    {
      title: 'Views',
      value: channelData?.views?.toLocaleString() || 0,
      change: '+8.3%',
      trend: 'up',
      icon: '👀'
    },
    {
      title: 'Watch Time',
      value: `${Math.round(channelData?.watchTime / 3600) || 0}h`,
      change: '+15.2%',
      trend: 'up',
      icon: '⏱️'
    },
    {
      title: 'Engagement Rate',
      value: `${channelData?.engagementRate || 0}%`,
      change: '+2.1%',
      trend: 'up',
      icon: '💬'
    }
  ];

  if (isLoading) {
    return <div className="loading">Loading advanced analytics...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Channel Analytics</h1>
        <div className="time-range-selector">
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="analytics-section">
        <div className="chart-container">
          <AnalyticsChart 
            type="views"
            timeRange={timeRange}
            height={300}
          />
        </div>
        
        <div className="widgets-grid">
          <QuickActions />
          <RecentVideos />
        </div>
      </div>

      {/* Performance Overview */}
      <PerformanceGrid />
    </div>
  );
};

export default Dashboard;
// PUT THE Dashboard COMPONENT CODE HERE
// This is the second code block from the previous response