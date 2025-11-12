'use client';

import { usePathname } from 'next/navigation';
import ChatWidget from './ChatWidget';
import AnnouncementBar from './AnnouncementBar';
import CookieConsent from './CookieConsent';

/**
 * Conditionally renders widgets based on current route
 * Excludes widgets from admin pages
 */
export default function ConditionalWidgets() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  // Don't show widgets on admin pages
  if (isAdminPage) {
    return null;
  }

  return (
    <>
      <AnnouncementBar />
      <ChatWidget />
      <CookieConsent />
    </>
  );
}
