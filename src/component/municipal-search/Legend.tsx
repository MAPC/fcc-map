/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';

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
  color: pink;
`;

const circleStyle2 = css`
  display: inline-block;
  font-size: 100px;
  text-align: center;
  margin-right: 1.2rem;
  color: darksalmon;
`;

const circleStyle3 = css`
  display: inline-block;
  font-size: 100px;
  text-align: center;
  margin-right: 1.2rem;
  color: cadetblue;
`;

const circleStyle4 = css`
  display: inline-block;
  font-size: 100px;
  text-align: center;
  margin-right: 1.2rem;
  color: cornflowerblue;
`;

const circleStyle5 = css`
  display: inline-block;
  font-size: 100px;
  text-align: center;
  margin-right: 1.2rem;
  color: darkslateblue;
`;

const Legend: React.FC = () => {
    return (
        <div css={legendStyle}>
        <p css={titleStyle}>Legend</p>
        <ul css={detailListStyle}>
          <p>Top Quintile</p>
          <li css={liStyle}><span css={circleStyle1}>&#183;</span>1-4%</li>
          <li css={liStyle}><span css={circleStyle2}>&#183;</span>5-8%</li>
          <li css={liStyle}><span css={circleStyle3}>&#183;</span>9-12%</li>
          <li css={liStyle}><span css={circleStyle4}>&#183;</span>13-16%</li>
          <li css={liStyle}><span css={circleStyle5}>&#183;</span>17-20%</li>
        </ul>
      </div>
    );
};

export default Legend;