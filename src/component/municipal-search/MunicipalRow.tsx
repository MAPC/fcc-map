/** @jsx jsx */

import React, { useState } from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { CsvData } from './MunicipalData';
import { Star } from 'phosphor-react';

// interface MunicipalRowProps {
//   node: CsvData,
//   dispatch: React.Dispatch<unknown>
// }

interface MunicipalDataProps {
  // data: Array<CsvData>,
  selectedMuni: string|undefined,
  // containerRef: React.RefObject<HTMLInputElement>,
  // dispatch: React.Dispatch<unknown>
}

const muniRowStyle = css`
  background: ${themeColors.white};
  margin: 0 0 2rem;
  padding: 1.5rem 2rem;
`;

const titleStyle = css`
  color: ${themeColors.indigo};
  font-family: ${fonts.calibre};
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

const buttonStyle = css`
  background: none;
  border: none;
  float: right;
  cursor: pointer;
`;

const detailListStyle = css`
  padding-left: 0;
  list-style: none;
`;

function parseDouble(input: number): string {
  return input.toFixed(2);
}

// rendering MunicipalRow, imported into SearchMap
const MunicipalRow: React.FC<MunicipalDataProps> = ({ selectedMuni }) => {
  return (
    <div css={muniRowStyle}>
      <p css={titleStyle}>{selectedMuni}</p>
      <ul css={detailListStyle}>
        <li>Tax Revenue Before: </li>
        <li>Tax Revenue After: </li>
      </ul>
    </div>

    // <li css={liStyle}>
    //   <p>This renders</p>
    //   <p css={titleStyle}>{node.municipal} site {node.site_oid}</p>
    //   <ul css={detailListStyle}>
    //     <li>Growth Potential Score: {parseDouble(+node.Growth_Potential_Score)}</li>
    //     <li>Healthy Communities Score: {parseDouble(+node.Healthy_Communtiies_Score)}</li>
    //     <li>Healthy Watersheds Score: {parseDouble(+node.Healthy_Watersheds_Score)}</li>
    //     <li>Travel Choices Score: {parseDouble(+node.Travel_Choices_Score)}</li>
    //     <li>Overall Score: {parseDouble(+node.Overall_Score)}</li>
    //     <li>Number of Parcels on Site: {parseDouble(+node.Number_of_Parcels_on_Site)}</li>
    //   </ul>
    // </li>

  )
};

export default MunicipalRow;