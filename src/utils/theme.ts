import { css, jsx } from '@emotion/react';

const fonts = {
  calibre: "'Calibre', sans-serif",
  swiftNeueLtPro: "'Swift Neue LT Pro', serif",
};

const themeColors = {
  winterSky: '#3b66b0',
  gossamer: '#f2f5fb',
  bayBlue: '#233069',
  indigo: '#111436',
  glass: '#0097c4',
  sky: '#92c9ed',
  clearWater: '#67cbe4',
  white: '#FFFFFF',
  fontGray: '#707070',
  black: '#000000',
};

const marginStyle = css`
  margin: 0 auto;
  padding: 0 10rem;
  max-width: 116.6rem;
`;

export { fonts, themeColors, marginStyle };
