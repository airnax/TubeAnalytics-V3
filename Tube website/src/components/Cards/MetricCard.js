import React from 'react';

const MetricCard = ({ title, value, change, trend, icon }) => {
  return (
    <div className="metric-card">
      <div className="metric-header">
        <span className="metric-icon">{icon}</span>
        <h3 className="metric-title">{title}</h3>
      </div>
      <div className="metric-value">{value}</div>
      <div className={`metric-change ${trend}`}>
        <span className="change-arrow">
          {trend === 'up' ? '↗' : '↘'}
        </span>
        {change}
      </div>
    </div>
  );
};

export default MetricCard;