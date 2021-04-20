/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import { themeColors, marginStyle } from '../utils/theme';

const wrapperStyle = css`
  ${marginStyle};
  margin-top: -100px;
  z-index: 10;
`;

const firstParagraphStyle = css`
  background: ${themeColors.indigo};
  color: ${themeColors.white};
  margin: 0;
  padding: 5rem 5.6rem;
  width: 69rem;
`;

const HeroOverlayParagraph: React.FC = ({ children }) => (
  <div css={wrapperStyle}>
    <p css={firstParagraphStyle}>
      {children}
    </p>
  </div>
);

export default HeroOverlayParagraph;
