/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import { marginStyle } from '../utils/theme';

const wrapperStyle = css`
  ${marginStyle}
  display: flex;
  flex-direction: row;
  margin: 5rem auto;

  p:first-of-type {
    margin-top: 0;
  }
`;

const TwoColImageText: React.FC = ({ children }) => (
  <div css={wrapperStyle}>
    {children}
  </div>
);

export default TwoColImageText;
