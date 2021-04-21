/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import { fonts, themeColors  } from '../utils/theme';
import triangle from '../images/triangle.svg';

interface H2RibbonProps {
  title: string,
  height: number,
  width: number
}

const wrapperStyle = css`
  align-items: center;
  background: ${themeColors.sky};
  display: flex;
  flex-direction: row;
  margin-left: .8rem;
`;

const triangleStyle = css`
  left: -.8rem;
  position: relative;
  width: 4rem;
  z-index: 10;
`;

const titleStyle = css`
  color: ${themeColors.indigo};
  font-family: ${fonts.calibre};
  font-size: 4rem;
  margin: 0;
  padding: 1rem;
  line-height: 4.4rem;
`;

const H2Ribbon: React.FC<H2RibbonProps> = ({ title, height, width }) => (
  <div
    css={css`
      ${wrapperStyle}
      height: ${height}px;
      width: ${width}px;
    `}
  >
    <img src={triangle} alt="Decorative triangle" css={triangleStyle} />
    <h2 css={titleStyle}>{title}</h2>
  </div>
);

export default H2Ribbon;
