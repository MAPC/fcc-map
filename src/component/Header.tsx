/** @jsx jsx */

import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { css, jsx } from '@emotion/react';
import { fonts, themeColors, marginStyle } from '../utils/theme';

const headerStyle = css`
  background-color: ${themeColors.indigo};
  display: flex;
  flex-direction: column;
  position: relative;
`;

const headerWrapperStyle = css`
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
  line-height: 10rem;
  margin: 0;
  margin: 5rem 0 1rem 0;
`;

const underlineStyle = css`
  background: ${themeColors.sky};
  color: ${themeColors.indigo};
  padding: 1rem 1rem 0;
`;

const subtitleStyle = css`
  color: ${themeColors.white};
  font-family: ${fonts.swiftNeueLtPro};
  font-size: 3.6rem;
  font-weight: normal;
  line-height: 5rem;
  margin-bottom: 12rem;
  width: 65rem;
`;

const Header: React.FC = () => {
  const [pageWidth, updatePageWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  useEffect(() => {
    const handleResize = () => updatePageWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
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
  )
};

export default Header;
