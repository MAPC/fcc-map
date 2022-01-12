/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { Link } from 'gatsby';
import { Circle, PushPinSimple } from 'phosphor-react';

const legendStyle = css`
  background: ${themeColors.white};
  height: auto;
  left: 47.5rem;
  margin: .5rem 0 0;
  padding: .5rem 2rem;
  position: absolute;
  z-index: 1;
  p {
    line-height: 2rem;
  }
`;

const highlightStyle = css`
  color: ${themeColors.fontGray};
  font-size: 1.5rem;
  margin: 1.5rem 0;
`;

const linkStyle = css`
  align-items: center;
  color: ${themeColors.fontGray};
  display: flex;
  font-size: 1.5rem;
  margin: 1.5rem 0;
  text-decoration: none;
  transition: 0.2s ease-in-out;
  width: auto;
  :hover {
    color: ${themeColors.sky};
  }
`;

const Legend: React.FC = () => {
    return (
      <div css={legendStyle}>
        <h2>Legend</h2>
        <h3>Site Score</h3>
          <p><Circle size={14} weight="fill" color={themeColors.quintile5} /> Most Favorable</p>
          <p><Circle size={14} weight="fill" color={themeColors.quintile4} /> Very Favorable</p>
          <p><Circle size={14} weight="fill" color={themeColors.quintile3} /> Favorable</p>
          <p><Circle size={14} weight="fill" color={themeColors.quintile2} /> Less Favorable</p>
          <p><Circle size={14} weight="fill" color={themeColors.quintile1} /> Least Favorable</p>
        <div css={highlightStyle}>
          <p><PushPinSimple size={14} weight="fill" color={themeColors.fontGray} /> Highlighted Site</p>
        </div>
        <a css={linkStyle} href="http://rethinking-the-suburban-strip.mapc.org/">
          Read the Report
        </a>
      </div>
    );
};

export default Legend;