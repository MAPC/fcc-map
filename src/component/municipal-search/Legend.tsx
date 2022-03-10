/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import ToggleSwitch from './ToggleSwitch';

interface LegendProps {
  comcast: any,
  toggleComcast: any,
  netblazr: any,
  toggleNetblazr: any,
  rcn: any,
  toggleRcn: any,
  starry: any,
  toggleStarry: any
}

const legendStyle = css`
  background: ${themeColors.white};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, .4) 0 20px 20px -15px;
  color: navy;
  font-family: ${fonts.avenirNext};
  height: auto;
  margin: 4rem;
  padding: 2rem;
  width: 18rem;
  z-index: 1;
  h2 {
    margin-top: 0.5rem;
  }
  p {
    line-height: 2rem;
  }
`;

const Legend: React.FC<LegendProps> = ({
  comcast,
  toggleComcast,
  netblazr,
  toggleNetblazr,
  rcn,
  toggleRcn,
  starry,
  toggleStarry
}) => {
    return (
      <div css={legendStyle}>
        <h2>FCC Reported Provider Coverage</h2>
        <ToggleSwitch provider="Comcast" state={comcast} toggle={toggleComcast} />
        <ToggleSwitch provider="netBlazr" state={netblazr} toggle={toggleNetblazr} />
        <ToggleSwitch provider="RCN" state={rcn} toggle={toggleRcn} />
        <ToggleSwitch provider="Starry" state={starry} toggle={toggleStarry} />
      </div>
    );
};

export default Legend;