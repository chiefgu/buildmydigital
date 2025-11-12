'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AnnouncementContextType {
  isAnnouncementVisible: boolean;
  hideAnnouncement: () => void;
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

export function AnnouncementProvider({ children }: { children: ReactNode }) {
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);

  useEffect(() => {
    // Check localStorage on mount
    const dismissed = localStorage.getItem('announcement-dismissed');
    if (dismissed === 'true') {
      setIsAnnouncementVisible(false);
    }
  }, []);

  const hideAnnouncement = () => {
    setIsAnnouncementVisible(false);
    localStorage.setItem('announcement-dismissed', 'true');
  };

  return (
    <AnnouncementContext.Provider value={{ isAnnouncementVisible, hideAnnouncement }}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncement() {
  const context = useContext(AnnouncementContext);
  if (context === undefined) {
    throw new Error('useAnnouncement must be used within AnnouncementProvider');
  }
  return context;
}
