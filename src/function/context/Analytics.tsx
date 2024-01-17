/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode, createContext, useContext, useEffect } from 'react';
import { logEvent, Analytics } from 'firebase/analytics';
import { analytics } from '../../utils/Firebase'

type FirebaseContextType = {
  analytics: Analytics;
  logPageView: (pageName: string) => void;
};

const AnalyticsContext = createContext<FirebaseContextType | undefined>(undefined);

interface ProviderProps {
    children: ReactNode;
  }

export const AnalyticsProvider: React.FC<ProviderProps> = ({ children }) => {

  const logPageView = (pageName: string) => {
    logEvent(analytics, 'page_view', { page_name: pageName });
  };

  useEffect(() => {
    logPageView('initial_page');
  }, []);

  return (
    <AnalyticsContext.Provider value={{ analytics, logPageView }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = (): FirebaseContextType => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
