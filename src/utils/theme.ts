import { css, jsx } from '@emotion/react';

const fonts = {
  calibre: "'Calibre', sans-serif",
  swiftNeueLtPro: "'Swift Neue LT Pro', serif",
  avenirNext: "Avenir Next"
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
  warmGrayTransparent: '#fbfdff',
  gold: '#ffc800',
  quintile1: '#CAF0F8',
  quintile2: '#82DDED',
  quintile3: '#0088A3',
  quintile4: '#05078A',
  quintile5: '#00072D'
};

const marginStyle = css`
  margin: 0;
  padding: 0;
`;

const aboutPageStyle = css`
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  position: absolute;
  font-family: ${fonts.calibre};

  header {
    width: 85%;
    max-width: 850px;
    padding: 25px 0;
    margin: 0 auto;

    img {
      width: 50px; 
      height: auto;
    } 

    a {
      float: right; 
      top: 12px;

      font-size: 18px;
      transition: 0.2s ease-in-out;
    }
  }

  a {
    text-decoration: none;
    color: ${themeColors.winterSky};
    &:hover {
      color: ${themeColors.sky}; 
    }
  }

  main {
    width: 85%;
    max-width: 700px;
    min-height: 95vh;
    margin: 0 auto;
    padding: 20px 0 80px;

    h3 {
      color: ${themeColors.black}
    }

    p {
      color: ${themeColors.fontLightGray}
    }

    @include media('medium') { width: 92%; }
  }

  h1 {
    display: inline-block;
    margin-bottom: 40px;
    font-size: 34px;
    color: ${themeColors.indigo};
    border-bottom: 6px solid ${themeColors.glass};
  }

  footer {
    padding: 15px;
    text-align: right;
    background: ${themeColors.indigo};
    img { width: 80px; }
  }
`;

export { fonts, themeColors, marginStyle, aboutPageStyle };
