'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackTimeOnPage } from '@/lib/analytics';

export function usePageViewTime() {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const titleRef = useRef<string>('');

  // Extract page title from URL
  const getPageTitle = (path: string) => {
    if (!path) return 'Documentation';
    const parts = path.split('/').filter(Boolean);
    return parts.length > 0 
      ? parts[parts.length - 1]
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : 'Documentation';
  };

  useEffect(() => {
    // Set initial title
    titleRef.current = getPageTitle(pathname || '');
    startTimeRef.current = Date.now();

    // Track time when component unmounts or pathname changes
    return () => {
      const endTime = Date.now();
      const timeSpent = endTime - startTimeRef.current;
      
      // Only track if the user spent more than 5 seconds on the page
      if (timeSpent > 5000) {
        trackTimeOnPage(titleRef.current, timeSpent);
      }
    };
  }, [pathname]);
}
