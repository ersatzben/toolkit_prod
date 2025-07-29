export const breakpoints = {
  mobile: '480px',
  tablet: '768px', 
  desktop: '1024px',
  wide: '1200px'
} as const;

export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (max-width: ${breakpoints.desktop})`,
  wide: `@media (max-width: ${breakpoints.wide})`,
  
  // Min-width queries for mobile-first approach
  minTablet: `@media (min-width: ${breakpoints.tablet})`,
  minDesktop: `@media (min-width: ${breakpoints.desktop})`,
  minWide: `@media (min-width: ${breakpoints.wide})`,
  
  // Range queries for specific breakpoints
  tabletOnly: `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
  desktopOnly: `@media (min-width: ${breakpoints.desktop}) and (max-width: ${breakpoints.wide})`
} as const;

export type Breakpoint = keyof typeof breakpoints;
export type MediaQuery = keyof typeof media;