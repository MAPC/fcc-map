/** @jsx jsx */

import React from 'react';
import { Link } from 'gatsby';
import { css, jsx } from '@emotion/react';
import { fonts, themeColors, marginStyle } from '../utils/theme';

const navStyle = css`
  align-self: flex-end;
  margin: 5rem 0;
`;

const navItemStyle = css`
  color: ${themeColors.white};
  font-family: ${fonts.calibre};
  font-size: 2.4rem;
  font-weight: 600;
  margin: 0 2rem;
  text-decoration: none;
`;

const Navigation: React.FC = () => (
  <nav css={navStyle}>
    <Link to="/" css={navItemStyle} activeStyle={{ borderBottom: `4px solid ${themeColors.sky}`, color: `${themeColors.sky}` }}>
      Home
    </Link>
    <Link to="/about" css={navItemStyle} activeStyle={{ borderBottom: `4px solid ${themeColors.sky}`, color: `${themeColors.sky}` }}>
      About
    </Link>
  </nav>
);

export default Navigation;
