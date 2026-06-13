/** SRP Design Tokens — TypeScript constants for programmatic use */

export const colors = {
  bg: '#0e0e10',
  bgSurface: '#161616',
  bgRaised: '#1b1b1d', // Used for hover states
  bgElevated: '#1d1d1f',

  fg: '#f3f4f6', // Softer white to reduce eye fatigue
  fgMuted: '#9ca3af',
  fgDim: '#6b7280',
  fgGhost: '#4b5563',

  border: '#262626',
  borderSubtle: '#1f1f1f',
  borderStrong: '#323232', // Used for hover states

  allowed: '#10b981', // Operational green (not neon)
  allowedDim: '#059669',
  allowedBg: '#064e3b',
  blocked: '#ef4444', // Operational red (not bright)
  blockedDim: '#dc2626',
  blockedBg: '#450a0a',

  structure: '#6b7280',
  accent: '#e5e5e5',
} as const;

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
} as const;

export const layout = {
  contentWidth: '760px',
  homepageWidth: '880px',
  sidebarWidth: '240px',
  navHeight: '56px',
} as const;

export type Colors = typeof colors;
export type Spacing = typeof spacing;
