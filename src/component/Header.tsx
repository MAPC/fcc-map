/** @jsx jsx */

import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { css, jsx } from '@emotion/react';
import { fonts, themeColors, marginStyle } from '../theme';
// import logo from '../images/submarkets_logo.png';
// import MainNav from './MainNav';
// import MobileNav from './MobileNav';

const headerStyle = css`
  align-items: center;
  background-color: ${themeColors.darkBlue};
  display: flex;
  flex-direction: row;
  height: 11.5rem;
`;

const headerWrapperStyle = css`
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${marginStyle}
`;

const logoTitleWrapperStyle = css`
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  text-decoration: none;
`;

const titleStyle = css`
  color: ${themeColors.white};
  font-family: ${fonts.swiftNeueLtPro};
  font-size: 4.2rem;
  font-weight: 400;
  padding: 0 5rem 0 1rem;

  @media (max-width: 670px) {
    font-size: 3rem;
    line-height: 3rem;
  }

  @media (max-width: 500px) {
    border-bottom: 0;
    margin: 0;
    padding: 0 0 0 1rem;
  }
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
        <Link to="/" css={logoTitleWrapperStyle}>
          {/* <img src={logo} alt="Decorative logo of two houses" /> */}
          <h1 css={titleStyle}>Retrofitting Suburbia</h1>
        </Link>
        {/* { pageWidth >= 1400 ? 'Insert main nav' : 'Insert mobile nav' } */}
      </div>
    </header>
  );
};

export default Header;
