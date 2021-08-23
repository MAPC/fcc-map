/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { Link } from 'gatsby';

const legendStyle = css`
  width: 10rem;
  height: 20rem;
  background: ${themeColors.warmGrayTransparent};
  margin: 36vh 2vw;
  padding: 1.5rem 2rem;
  position: absolute;
  z-index: 1;
  right: 0;
`;

const titleStyle = css`
  color: ${themeColors.indigo};
  font-family: ${fonts.calibre};
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

const detailListStyle = css`
  padding-left: 0;
  list-style: none;
  color: ${themeColors.fontLightGray};
`;

const liStyle = css`
  display: flex;
`;

const circleStyle1 = css`
  display: inline-block;
  font-size: 100px;
  text-align: center;
  margin-right: 1.2rem;
  color: ${themeColors.quintile1};
`;

const circleStyle2 = css`
  display: inline-block;
  font-size: 100px;
  text-align: center;
  margin-right: 1.2rem;
  color: ${themeColors.quintile2};
`;

const circleStyle3 = css`
  display: inline-block;
  font-size: 100px;
  text-align: center;
  margin-right: 1.2rem;
  color: ${themeColors.quintile3};
`;

const circleStyle4 = css`
  display: inline-block;
  font-size: 100px;
  text-align: center;
  margin-right: 1.2rem;
  color: ${themeColors.quintile4};
`;

const circleStyle5 = css`
  display: inline-block;
  font-size: 100px;
  text-align: center;
  margin-right: 1.2rem;
  color: ${themeColors.quintile5};
`;

const Legend: React.FC = () => {
    return (
        <div css={legendStyle}>
        <p css={titleStyle}>Legend</p>
        <ul css={detailListStyle}>
          <p>Quintile</p>
          <li css={liStyle}><span css={circleStyle1}>&#183;</span>First</li>
          <li css={liStyle}><span css={circleStyle2}>&#183;</span>Second</li>
          <li css={liStyle}><span css={circleStyle3}>&#183;</span>Third</li>
          <li css={liStyle}><span css={circleStyle4}>&#183;</span>Fourth</li>
          <li css={liStyle}><span css={circleStyle5}>&#183;</span>Fifth</li>
        </ul>
        <Link to="/about">More Info</Link>
      </div>
    );
};

export default Legend;