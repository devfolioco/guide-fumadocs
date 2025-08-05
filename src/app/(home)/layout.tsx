import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: '/assets/devfolio-logo.webp',
    shortcut: '/assets/devfolio-logo.webp',
    apple: '/assets/devfolio-logo.webp',
  }
};

export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}
