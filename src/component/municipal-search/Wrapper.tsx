/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors } from '../../utils/theme';
import SearchMap from './SearchMap';

const wrapperStyle = css`
  background: ${themeColors.gossamer};
  height: 100vh;
  margin: 0;
  padding: 0;
  width: 100vw;
`;

const Wrapper: React.FC = () => {
  return (
    <div css={wrapperStyle}>
      <SearchMap />
    </div>
  );
};

export default Wrapper;
