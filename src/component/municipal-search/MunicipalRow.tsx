/** @jsx jsx */

import React, { useState } from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { CsvData } from './MunicipalData';

interface MunicipalRowProps {
  selectedMuni: string|undefined,
  node: CsvData
  dispatch: React.Dispatch<unknown>
}

const muniRowStyle = css`
  width: 45rem;
  background: ${themeColors.white};
  margin: 4vh 2vw;
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

const buttonStyle = css`
  background: none;
  border: none;
  float: right;
  cursor: pointer;
`;

const detailListStyle = css`
  padding-left: 0;
  list-style: none;
  color: ${themeColors.fontGray}
`;

// function sumInput
// function sumInput(data: Array<CsvData>, selectedMuni: string|undefined): string {
//   if (selectedMuni) {
//     return data.forEach((sum: number, node: CsvData) => {
//       if (node.municipal === selectedMuni) {
//         num += node.Tax_Revenue_Differential;
//       }
//       return num;
//     }, '');
//   }
// }

function parseDouble(input: number): string {
  return input.toFixed(2);
}

function parseCommas(string: any) {
  return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// rendering MunicipalRow, imported into SearchMap
const MunicipalRow: React.FC<MunicipalRowProps> = ({ node, selectedMuni, dispatch }) => {
  return (
    <div css={muniRowStyle}>
      <p css={titleStyle}>{selectedMuni}</p>
      <ul css={detailListStyle}>
        <li>Tax Revenue Differential: ${parseCommas(parseDouble(+node.Tax_Revenue_Differential))}</li>
      </ul>
    </div>

  )
};

export default MunicipalRow;