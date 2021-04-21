/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import H2Ribbon from './H2Ribbon';
import { fonts, marginStyle , themeColors} from '../utils/theme';
import tempHouse from '../images/temp_house.png';

const contentWrapper = css`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  max-width: 100rem;
`;

const h3Style = css`
  color: ${themeColors.indigo};
  font-family: ${fonts.calibre};
  font-size: 4.8rem;
  line-height: 5.6rem;
`;

const h3HighlightStyle = css`
  color: ${themeColors.glass};
`;

const visualizationPlaceholder = css`
  background: ${themeColors.glass};
  height: 70rem;
  margin: 3.5rem auto;
  max-width: 100rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${themeColors.white};
`;

const BuildableArea: React.FC = () => (
  <div css={marginStyle}>
    <H2Ribbon title="Okay, but that's one small site. How many places like this do we have in the region?" width={1158} height={120} />
    <div css={contentWrapper}>
      <img src={tempHouse} css={css`margin-right: 5.4rem;`} />
      <div>
        <h3 css={h3Style}>
          Over
          {' '}
          <span css={h3HighlightStyle}>3,000 sites</span>
          {' '}
          and more than
          {' '}
          <span css={h3HighlightStyle}>11 square miles</span>
          {' '}
          of buildable area
        </h3>
        <p>Well, we looked at the regions data and identified sites across the region.</p>
        <p>
          MAPC mapped commercial properties across the region and identified those that might be good candidates for redevelopment: lower density commercial properties, built prior to [2000], with the following threshold criteria. We excluded properties with characteristics X, Y, Z.  In doing so we identified [x,000] sites with a total of [X,000] parcels.
        </p>
      </div>
    </div>
    <div css={visualizationPlaceholder}>
      Visualization here
    </div>
  </div>
);

export default BuildableArea;
