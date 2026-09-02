import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Disabled Lenis to allow CSS scroll snap
  }, []);

  return <>{children}</>;
}
