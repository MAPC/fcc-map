/** @jsx jsx */

import React from 'react';
import {
  css, jsx, Global, SerializedStyles,
} from '@emotion/react';
import { themeColors, fonts } from '../utils/theme';

const Layout: React.FC = ({ children }) => (
  <React.Fragment>
    <Global styles={css`
      @import url("//hello.myfonts.net/count/37908e");

      @font-face {
        font-family: 'Avenir Next';
        src: url('fonts/AvenirNextLTPro-Regular.otf') format('truetype');
        font-style: normal;
        font-weight: normal;
      }

      @font-face {
        font-family: 'Swift Neue LT Pro';
        src: url('fonts/SwiftNeueLTPro.eot') format('eot');
        src: local('Swift Neue LT Pro'),
            url('fonts/SwiftNeueLTPro.eot?#iefix') format('embedded-opentype'),
            url('fonts/SwiftNeueLTPro.woff2') format('woff2'),
            url('fonts/SwiftNeueLTPro.woff') format('woff'),
            url('fonts/SwiftNeueLTPro.ttf') format('truetype');
        font-style: normal;
        font-weight: normal;
      }

      @font-face {
        font-family: 'Calibre';
        src: url('./fonts/Calibre-Regular.eot');
        src: local('Calibre'), local('Calibre-Regular'),
            url('./fonts/Calibre-Regular.eot?#iefix') format('embedded-opentype'),
            url('./fonts/Calibre-Regular.woff2') format('woff2'),
            url('./fonts/Calibre-Regular.woff') format('woff'),
            url('./fonts/Calibre-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }

      html {
        font-size: 10px;
        height: 100%;
        margin: 0;
      }

      body {
        color: ${themeColors.fontGray};
        font-family: ${fonts.avenirNext};
        height: 100%;
        margin: 0;
        h1 {
          color: ${themeColors.indigo};
          font-size: 3rem;
        }
        h2 {
          color: ${themeColors.indigo};
          font-size: 1.9rem;
        }
        h3 {
          font-size: 1.7rem;
        }
        p, li {        
          font-size: 1.5rem;
          margin: 0;
        }
      }

      #___gatsby, #gatsby-focus-wrapper {
        height: 100%;
      }`}
    />
    {children}
  </React.Fragment>
);

export default Layout;
