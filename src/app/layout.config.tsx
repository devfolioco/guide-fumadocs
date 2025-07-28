import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <img
          src="/assets/Devfolio - White.png" 
          alt="Devfolio" 
          width={120} 
          height={24}
          className="h-6"
        />
        
      </>
    ),
  },
  links: [
    {
      text: 'Documentation',
      url: '/docs/guide',
      active: 'nested-url',
    },
  ],
};