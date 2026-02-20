'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Logo() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to avoid layout shift
    return (
      <img
        src="/assets/Devfolio - White.png"
        alt="Devfolio"
        width={120}
        height={24}
        className="h-6"
      />
    );
  }

  // Determine which logo to show based on the current theme
  const currentTheme = resolvedTheme || theme;
  const logoSrc = currentTheme === 'dark' 
    ? '/assets/Devfolio - White.png'
    : '/assets/Devfolio - Normal.png';

  return (
    <img
      src={logoSrc}
      alt="Devfolio"
      width={120}
      height={24}
      className="h-6"
    />
  );
}
