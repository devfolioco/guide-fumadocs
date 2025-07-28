'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// if (typeof window !== 'undefined') {
//   posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
//     api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
//     // Enable debug mode in development
//     loaded: (posthog) => {
//       if (process.env.NODE_ENV === 'development') posthog.debug();
//     },
//     // Capture page views automatically
//     capture_pageview: true,
//     // Capture clicks, form interactions, etc.
//     capture_pageleave: true,
//     // Record user sessions
//     session_recording: {
//       maskAllInputs: false
//     },
//     // Advanced configuration
//     request_headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// }

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views
  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
