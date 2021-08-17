import { css, jsx } from '@emotion/react';

const fonts = {
  calibre: "'Calibre', sans-serif",
  swiftNeueLtPro: "'Swift Neue LT Pro', serif",
};

const themeColors = {
  winterSky: '#3b66b0',
  gossamer: '#f2f5fb',
  bayBlue: '#233069',
  indigo: '#252b6d',
  glass: '#0097c4',
  sky: '#92c9ed',
  clearWater: '#67cbe4',
  white: '#FFFFFF',
  fontGray: '#545454',
  fontLightGray: '#757575',
  black: '#000000',
  warmGray: '#E9E9E9',
  warmGrayTransparent: '#f7f7f7f5'
};

const marginStyle = css`
  margin: 0;
  padding: 0;
  max-width: 116.6rem;
`;

export { fonts, themeColors, marginStyle };
