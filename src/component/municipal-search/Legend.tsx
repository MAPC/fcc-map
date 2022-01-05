/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { Link } from 'gatsby';
import { Circle } from 'phosphor-react';

const legendStyle = css`
  height: auto;
  p {
    line-height: 2rem;
  }
`;

const linkStyle = css`
  align-items: center;
  display: flex;
  margin: 2.5rem 0 1rem;
  text-decoration: none;
  transition: 0.2s ease-in-out;
  width: auto;
  span:hover {
    color: ${themeColors.sky};
  }
`;

const Legend: React.FC = () => {
    return (
        <div css={legendStyle}>
        <h2>Legend</h2>
        <h3>Site Score</h3>
          {/* <span css={circleStyle1}>&#183;</span><p>3.25 - 3.96</p>
          <span css={circleStyle2}>&#183;</span><p>3.05 - 3.25</p>
          <span css={circleStyle3}>&#183;</span><p>2.88 - 3.05</p>
          <span css={circleStyle4}>&#183;</span><p>2.67 - 2.88</p>
          <span css={circleStyle5}>&#183;</span><p>1.84 - 2.67</p> */}
          <p><Circle size={14} weight="fill" color={themeColors.quintile5} /> Most Favorable</p>
          <p><Circle size={14} weight="fill" color={themeColors.quintile4} /> Very Favorable</p>
          <p><Circle size={14} weight="fill" color={themeColors.quintile3} /> Favorable</p>
          <p><Circle size={14} weight="fill" color={themeColors.quintile2} /> Less Favorable</p>
          <p><Circle size={14} weight="fill" color={themeColors.quintile1} /> Least Favorable</p>
        <Link css={linkStyle} to="/about">
          <p>Read the Report</p>
        </Link>
      </div>
    );
};

export default Legend;