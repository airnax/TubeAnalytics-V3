import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/video-analyzer', icon: '🎬', label: 'Video Analyzer' },
    { path: '/keyword-research', icon: '🔍', label: 'Keyword Research' },
    { path: '/competitor-analysis', icon: '⚔️', label: 'Competitor Analysis' },
    { path: '/seo-studio', icon: '🚀', label: 'SEO Studio' },
    { path: '/thumbnail-generator', icon: '🖼️', label: 'Thumbnail Generator' },
    { path: '/trend-alerts', icon: '🔔', label: 'Trend Alerts' },
    { path: '/channel-manager', icon: '⚙️', label: 'Channel Manager' }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;