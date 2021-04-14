/** @jsx jsx */

import React from 'react';
import { Link } from 'gatsby';
import { css, jsx } from '@emotion/react';
import { fonts, themeColors, marginStyle } from '../utils/theme';

const headerStyle = css`
  background-color: ${themeColors.darkBlue};
  display: flex;
  flex-direction: column;
`;

const headerWrapperStyle = css`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  ${marginStyle}
`;

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

const titleStyle = css`
  color: ${themeColors.white};
  font-family: ${fonts.calibre};
  font-size: 10rem;
  font-weight: 400;
  line-height: 14rem;
  margin: 5rem 0 1rem 0;
`;

const underlineStyle = css`
  border-bottom: 2rem solid ${themeColors.skyBlue};
`;

const subtitleStyle = css`
  color: ${themeColors.white};
  font-family: ${fonts.swiftNeueLtPro};
  font-size: 3.6rem;
  font-weight: normal;
  line-height: 5rem;
  margin-bottom: 12rem;
  text-align: right;
  width: 65rem;
`;

const Header: React.FC = () => (
  <header css={headerStyle}>
    <div css={headerWrapperStyle}>
      <nav css={navStyle}>
        <Link to="/" css={navItemStyle} activeStyle={{ borderBottom: `4px solid ${themeColors.white}` }}>
          Home
        </Link>
        <Link to="/about" css={navItemStyle} activeStyle={{ borderBottom: `4px solid ${themeColors.white}` }}>
          About
        </Link>
      </nav>
      <h1 css={titleStyle}>
        <span css={underlineStyle}>
          Rethink
        </span>
        {' '}
        <span>
          the Suburban Strip
        </span>
      </h1>
      <p css={subtitleStyle}>First best place to start transforming old uses the meet the needs of residents</p>
    </div>
  </header>
);

export default Header;
