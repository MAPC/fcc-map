import { css, jsx } from '@emotion/react';

const fonts = {
  calibre: "'Calibre', sans-serif",
  swiftNeueLtPro: "'Swift Neue LT Pro', serif",
};

const themeColors = {
  white: '#FFFFFF',
  lightBlue: '#E8F7FE',
  skyBlue: '#BEE8FD',
  accentBlue: '#007DA3',
  darkBlue: '#111436',
  fontGray: '#707070',
  black: '#000000',
};

const marginStyle = css`
  margin: 0 auto;
  padding: 0 5rem;
  max-width: 136.6rem;
`;

export { fonts, themeColors, marginStyle };
