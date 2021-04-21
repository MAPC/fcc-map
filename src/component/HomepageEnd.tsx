/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import { fonts, themeColors, marginStyle } from '../utils/theme';
import triangleLi from '../images/triangleLi.svg';

const wrapperStyle = css`
  ${marginStyle}
  height: 80rem;
`;

const changedWrapper = css`
  background: ${themeColors.sky};
  float: right;
  padding: 6rem 7.5rem;
  position: relative;
  width: 80rem;
  z-index: 10;
`;

const changedTitle = css`
  color: ${themeColors.indigo};
  font-size: 5.2rem;
`;

const relatedReportsWrapper = css`
  background: ${themeColors.indigo};
  color: ${themeColors.white};
  float: left;
  padding: 5rem 10rem;
  position: relative;
  margin-top: -4rem;
  width: 40rem;
`;

const relatedReportsTitle = css`
  font-size: 3.6rem;
`;

const listItemStyle = css`
  list-style-image: url(${triangleLi});
  font-size: 1.8rem;
`;

const linkStyle = css`
  color: ${themeColors.white};
  text-decoration: none;
`;

const HomepageEnd: React.FC = () => (
  <div css={wrapperStyle}>
    <div css={changedWrapper}>
      <h2 css={changedTitle}>We have changed before</h2>
      <p>
        Obviously, though, it isn’t all in Woburn (though some of it is!) As the map below indicates, the distribution of strip mall parcels is spread fairly evenly throughout each subregion. The Inner Core has the most land area, at 2.6 square miles, which may not be surprising as there is a greater concentration of retail activity in these communities. On the other hand, one would expect these communities — which are denser, have mixed-use neighborhoods, and more transit access than other subregions — to have a smaller concentration of autocentric retail
      </p>
      <p>
        MAPC developed a set of assumptions for each of the region’s various community types. Each community also had separate sets of assumptions for parcels within various station area types (if applicable) and for parcels located along major roadway arterials. This nuanced approached allowed for creating a varied set of realistic assumptions in a context-sensitive way. (For example, parcels in Saugus’ downtown would be different from what could likely be built along Route 1.) MAPC used best practices and, where available, data to formulate the various assumptions (i.e.,
      </p>
    </div>
    <div css={relatedReportsWrapper}>
      <h2 css={relatedReportsTitle}>Related Reports</h2>
      <ul css={css`padding-left: 2rem;`}>
        <li css={listItemStyle}>
          <a href="#" css={linkStyle}>Report 1</a>
        </li>
        <li css={listItemStyle}>
          <a href="#" css={linkStyle}>Report 2</a>
        </li>
        <li css={listItemStyle}>
          <a href="#" css={linkStyle}>Report 3</a>
        </li>
      </ul>
    </div>
  </div>
);

export default HomepageEnd;
