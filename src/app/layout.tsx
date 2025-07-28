'use client';

import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { PostHogProvider, usePostHog } from 'posthog-js/react';
import posthog from 'posthog-js';

const inter = Inter({
  subsets: ['latin'],
});

// Initialize PostHog if we're in the browser
// if (typeof window !== 'undefined') {
//   posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
//     api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
//     capture_pageview: false, // We'll handle page views manually
//     session_recording: {
//       maskAllInputs: false
//     },
//   });
// }

// Client-side only component for analytics
function Analytics() {
  const pathname = usePathname();
  const posthog = usePostHog();

  useEffect(() => {
    if (pathname && posthog) {
      posthog.capture('$pageview');
    }
  }, [pathname, posthog]);

  return null;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <PostHogProvider client={posthog}>
          <RootProvider>
            {children}
            <Analytics />
          </RootProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
