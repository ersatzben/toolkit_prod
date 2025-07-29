import { createGlobalStyle } from 'styled-components';
import { newBrandColors, typography } from './theme';

export const GlobalStyle = createGlobalStyle`
  :root {
    font-family: ${typography.fontFamily.body};
    line-height: ${typography.lineHeight.normal};
    font-weight: ${typography.fontWeight.normal};

    color-scheme: light dark;
    color: ${newBrandColors.charcoal};
    background-color: ${newBrandColors.beige};

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    background-color: ${newBrandColors.beige};
    color: ${newBrandColors.charcoal};
    transition: all 0.50s linear;
  }

  a {
    color: ${newBrandColors.darkBlue};
    text-decoration: none;
    
    &:hover {
      color: ${newBrandColors.lightBlue};
      text-decoration: underline;
    }
  }

  h1 {
    font-size: ${typography.fontSize['3xl'].desktop};
    margin-bottom: 1em;
    font-weight: ${typography.fontWeight.bold};
    line-height: ${typography.lineHeight.tight};

    @media (max-width: 768px) {
      font-size: ${typography.fontSize['2xl'].mobile};
    }
  }

  h2 {
    font-size: ${typography.fontSize['2xl'].desktop};
    font-weight: ${typography.fontWeight.semibold};
    line-height: ${typography.lineHeight.tight};

    @media (max-width: 768px) {
      font-size: ${typography.fontSize.xl.mobile};
    }
  }

  h3 {
    font-size: ${typography.fontSize.xl.desktop};
    font-weight: ${typography.fontWeight.medium};
    line-height: ${typography.lineHeight.normal};

    @media (max-width: 768px) {
      font-size: ${typography.fontSize.lg.mobile};
    }
  }

  p {
    margin-bottom: 1em;
    line-height: ${typography.lineHeight.relaxed};
  }

  ul {
    padding-left: 1.5em;
  }

  li {
    margin-bottom: 0.5em;
  }

  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: ${typography.fontWeight.medium};
    font-family: inherit;
    background-color: ${newBrandColors.darkGreen};
    color: ${newBrandColors.beige};
    cursor: pointer;
    transition: all 0.25s;

    &:hover {
      background-color: ${newBrandColors.brightGreen};
      color: ${newBrandColors.charcoal};
    }

    &:focus,
    &:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
  }

  /* Focus styles for accessibility */
  *:focus {
    outline: 2px solid ${newBrandColors.darkBlue};
    outline-offset: 2px;
  }

  /* Remove focus outline for mouse users */
  *:focus:not(:focus-visible) {
    outline: none;
  }

  @media (prefers-color-scheme: light) {
    :root {
      color: ${newBrandColors.charcoal};
      background-color: ${newBrandColors.beige};
    }
    
    a:hover {
      color: ${newBrandColors.lightBlue};
    }
    
    button {
      background-color: ${newBrandColors.darkGreen};
      color: ${newBrandColors.beige};
    }
  }
`;