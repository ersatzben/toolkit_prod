export const newBrandColors = {
  beige: '#FDF9E9',
  brightGreen: '#81F494',
  darkGreen: '#0B4938',
  lightBlue: '#80B7F4',
  darkBlue: '#093D77',
  charcoal: '#283131',
  orange: '#FE9F1C',
  lightRed: '#FAC2C2',
  deepRed: '#B3063E',
};

// Responsive typography scale
export const typography = {
  fontSize: {
    xs: { mobile: '0.75rem', desktop: '0.75rem' },
    sm: { mobile: '0.875rem', desktop: '0.875rem' },
    base: { mobile: '1rem', desktop: '1rem' },
    lg: { mobile: '1.125rem', desktop: '1.125rem' },
    xl: { mobile: '1.25rem', desktop: '1.5rem' },
    '2xl': { mobile: '1.5rem', desktop: '1.875rem' },
    '3xl': { mobile: '2rem', desktop: '2.25rem' },
    '4xl': { mobile: '2.5rem', desktop: '3.5rem' },
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.7',
    loose: '1.8',
  },
  fontFamily: {
    body: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    mono: '"SF Mono", Menlo, Monaco, Consolas, monospace',
  }
};

// Responsive spacing scale
export const spacing = {
  xs: { mobile: '0.25rem', desktop: '0.25rem' },
  sm: { mobile: '0.5rem', desktop: '0.5rem' },
  md: { mobile: '1rem', desktop: '1rem' },
  lg: { mobile: '1.5rem', desktop: '2rem' },
  xl: { mobile: '2rem', desktop: '2.5rem' },
  '2xl': { mobile: '2.5rem', desktop: '3rem' },
};

// Component-specific color variants
export const toolColors = {
  primary: newBrandColors.darkGreen,
  activeBg: newBrandColors.brightGreen + '20',
  activeHoverBg: newBrandColors.brightGreen + '30',
  inactiveHoverBg: newBrandColors.lightBlue + '15',
  tagBackground: newBrandColors.brightGreen + '20',
};

export const objectiveColors = {
  primary: newBrandColors.darkBlue,
  activeBg: newBrandColors.lightBlue + '30',
  activeHoverBg: newBrandColors.lightBlue + '40',
  inactiveHoverBg: newBrandColors.lightBlue + '15',
  tagBackground: newBrandColors.lightBlue + '30',
};

export const lightTheme = {
  body: newBrandColors.beige,
  text: newBrandColors.charcoal,
  toggleBorder: newBrandColors.lightBlue,
  background: newBrandColors.beige,
  sidebarBackground: '#FFFFFF',
  sidebarText: newBrandColors.charcoal,
  sidebarHighlight: newBrandColors.lightBlue + '30',
  mainContentBackground: '#FFFFFF',
  cardBackground: '#FFFFFF',
  borderColor: newBrandColors.lightBlue + '50',
  accentColor: newBrandColors.darkBlue,
  accentColorObjective: newBrandColors.darkGreen,
  accentColorTool: newBrandColors.darkBlue,
  filterChipBackground: newBrandColors.lightBlue + '30',
  filterChipText: newBrandColors.darkBlue,
  filterChipRemoveBackground: newBrandColors.lightRed,
  buttonBackground: newBrandColors.darkGreen,
  buttonText: newBrandColors.beige,
  buttonHover: newBrandColors.brightGreen,
  clearButtonBackground: 'transparent',
  clearButtonText: newBrandColors.charcoal,
  clearButtonHoverBackground: newBrandColors.lightBlue + '20',
  searchInputBackground: '#FFF',
  searchInputText: newBrandColors.charcoal,
  searchInputBorder: newBrandColors.lightBlue,
  primaryGradient: `linear-gradient(135deg, ${newBrandColors.darkGreen} 0%, ${newBrandColors.darkBlue} 100%)`,
  secondaryGradient: `linear-gradient(135deg, ${newBrandColors.lightBlue} 0%, ${newBrandColors.brightGreen} 100%)`,
  warningColor: newBrandColors.orange,
  errorColor: newBrandColors.deepRed,
  successColor: newBrandColors.brightGreen,
};

export const darkTheme = {
  body: newBrandColors.charcoal,
  text: newBrandColors.beige,
  toggleBorder: newBrandColors.lightBlue,
  background: newBrandColors.charcoal,
  sidebarBackground: '#1A1A1A',
  sidebarText: newBrandColors.beige,
  sidebarHighlight: newBrandColors.darkGreen + '50',
  mainContentBackground: '#1A1A1A',
  cardBackground: '#2A2A2A',
  borderColor: newBrandColors.lightBlue + '30',
  accentColor: newBrandColors.lightBlue,
  accentColorObjective: newBrandColors.brightGreen,
  accentColorTool: newBrandColors.lightBlue,
  filterChipBackground: newBrandColors.darkGreen + '80',
  filterChipText: newBrandColors.beige,
  filterChipRemoveBackground: newBrandColors.deepRed,
  buttonBackground: newBrandColors.darkGreen,
  buttonText: newBrandColors.beige,
  buttonHover: newBrandColors.brightGreen,
  clearButtonBackground: 'transparent',
  clearButtonText: newBrandColors.beige,
  clearButtonHoverBackground: newBrandColors.darkGreen + '30',
  searchInputBackground: '#2A2A2A',
  searchInputText: newBrandColors.beige,
  searchInputBorder: newBrandColors.lightBlue,
  primaryGradient: `linear-gradient(135deg, ${newBrandColors.darkGreen} 0%, ${newBrandColors.darkBlue} 100%)`,
  secondaryGradient: `linear-gradient(135deg, ${newBrandColors.lightBlue} 0%, ${newBrandColors.brightGreen} 100%)`,
  warningColor: newBrandColors.orange,
  errorColor: newBrandColors.lightRed,
  successColor: newBrandColors.brightGreen,
};

export type ThemeType = typeof lightTheme;