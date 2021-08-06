/** @jsx jsx */

import React, { useState } from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { CsvData } from './MunicipalData';

interface MunicipalRowProps {
  data: Array<CsvData>,
  selectedMuni: string|undefined,
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

//  iterating through sites' tax differentials and returning the sum
let taxDifferentials: Array<number> = [];
let sum: number = 0;
function getTax(data: Array<CsvData>, selectedMuni: string|undefined, taxDifferentials: Array<number>): number {
    data.reduce((taxDifferentials: Array<number>, node: CsvData) => {
      if (node.municipal === selectedMuni) {
        taxDifferentials.push(parseInt(node.Tax_Revenue_Differential));
      }
      return taxDifferentials;
    }, taxDifferentials);  

    if (taxDifferentials.length > 0) {
      sum = 0;
      // console.log('if taxdifferentials.length > 0: ', taxDifferentials.length);
      for (let index = 0; index < taxDifferentials.length; index++) {
        sum = sum + taxDifferentials[index];
      }
    }
  return sum;
}


// two decimal places
function parseDouble(input: number): string {
  return input.toFixed(2);
}

// commas
function parseCommas(string: any) {
  return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// rendering MunicipalRow, imported into SearchMap
const MunicipalRow: React.FC<MunicipalRowProps> = ({ data, selectedMuni }) => {
  return (
    <div css={muniRowStyle}>
      <p css={titleStyle}>{selectedMuni}</p>
      <ul css={detailListStyle}>
        {/* {getTax(data, selectedMuni, taxDifferentials)} gets tax on municipality selection */}
        <li>Tax Revenue Differential: ${parseCommas(parseDouble(getTax(data, selectedMuni, taxDifferentials)))}</li>
      </ul>
    </div>
  )
};

export default MunicipalRow;