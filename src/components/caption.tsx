import type { ReactNode } from "react";

/**
 * Centered, muted caption rendered under images and videos across the guide.
 */
export function Caption({ children }: { children: ReactNode }) {
  return (
    <p className="-mt-2 mb-6 text-center text-sm text-fd-muted-foreground">
      {children}
    </p>
  );
}
