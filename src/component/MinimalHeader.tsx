/** @jsx jsx */

import React from 'react';
import { Link } from 'gatsby';
import { css, jsx } from '@emotion/react';
import Navigation from './Navigation';
import { fonts, themeColors } from '../utils/theme';

const headerWrapperStyle = css`
  background-color: ${themeColors.indigo};
`;

const headerStyle = css`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 10rem 0 5rem;
  max-width: 136.6rem;
`;

const titleStyle = css`
  color: ${themeColors.white};
  font-family: ${fonts.calibre};
  font-size: 4.2rem;
  font-weight: 600;
  margin: 0;
`;

const MinimalHeader: React.FC = () => (
  <header css={headerWrapperStyle}>
    <div css={headerStyle}>
      <Link to="/" css={css`text-decoration: none;`}>
        <h1 css={titleStyle}>Rethinking the Suburban Strip</h1>
      </Link>
      <Navigation />
    </div>
  </header>
);

export default MinimalHeader;
