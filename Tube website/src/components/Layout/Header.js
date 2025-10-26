import React from 'react';

const Header = ({ onMenuToggle }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuToggle}>
          ☰
        </button>
        <div className="logo">
          <img src="/icons/logo.svg" alt="TubeAnalytics" />
          <span>TubeAnalytics</span>
        </div>
      </div>
      
      <div className="header-center">
        <div className="search-bar">
          <input type="text" placeholder="Search videos, channels, keywords..." />
          <button>🔍</button>
        </div>
      </div>
      
      <div className="header-right">
        <button className="notification-btn">🔔</button>
        <div className="user-avatar">👤</div>
      </div>
    </header>
  );
};

export default Header;