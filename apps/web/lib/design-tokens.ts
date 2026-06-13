/** SRP Design Tokens — TypeScript constants for programmatic use */

export const colors = {
  bg: '#050505',
  bgSurface: '#0a0a0a',
  bgRaised: '#111111',
  bgElevated: '#1a1a1a',

  fg: '#f5f5f5',
  fgMuted: '#a1a1aa',
  fgDim: '#6b7280',
  fgGhost: '#3f3f46',

  border: '#1a1a1a',
  borderSubtle: '#111111',
  borderStrong: '#2a2a2a',

  allowed: '#00ff41',
  allowedDim: '#00cc33',
  allowedBg: '#001a0a',
  blocked: '#ff3b30',
  blockedDim: '#cc2f26',
  blockedBg: '#1a0505',

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
  contentWidth: '720px',
  sidebarWidth: '240px',
  navHeight: '56px',
} as const;

export type Colors = typeof colors;
export type Spacing = typeof spacing;
