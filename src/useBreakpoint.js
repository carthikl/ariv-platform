import { useState, useEffect } from 'react';

export function useBreakpoint() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return {
    isMobile: width < 640,
    isTablet: width >= 640 && width < 1024,
    isDesktop: width >= 1024,
    width,
  };
}

// Responsive grid columns string
export function grid(mobile, tablet, desktop) {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
  if (w < 640) return `repeat(${mobile}, 1fr)`;
  if (w < 1024) return `repeat(${tablet}, 1fr)`;
  return `repeat(${desktop}, 1fr)`;
}

// Responsive value picker
export function rv(mobileVal, desktopVal) {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
  return w < 640 ? mobileVal : desktopVal;
}
