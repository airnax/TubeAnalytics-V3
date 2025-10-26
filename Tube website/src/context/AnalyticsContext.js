import React, { createContext, useState, useContext } from 'react';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const [channelData, setChannelData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const value = {
    channelData,
    setChannelData,
    isLoading,
    setIsLoading,
    user,
    setUser
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
};