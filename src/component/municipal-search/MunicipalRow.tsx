/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { CsvData } from './MunicipalData'; 
import Chart from './Chart';

interface MunicipalRowProps {
  data: Array<CsvData>,
  node: Array<CsvData>,
  selectedMuni: string|undefined,
  highlightedSites: Array<number|undefined>,
  sitesCount: number|undefined
}

const muniRowStyle = css`
  background: ${themeColors.warmGrayTransparent};
  margin: .5rem 0;
  max-width: 45rem;
  padding: 1.5rem 2rem;
  z-index: 1;
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
  color: black;
`;

// iterating through sites' tax differentials and returning the number of sites and sum
function getTax(data: Array<CsvData>, selectedMuni: string|undefined): Array<number> {
  let taxDifferentials: Array<number> = [];
  let sum: number = 0;
  let average: number = 0;
  data.reduce((taxDifferentials: Array<number>, node: CsvData) => {
    if (node.municipal === selectedMuni) {
      taxDifferentials.push(parseFloat(node.Site_Tax_Revenue_Change));
    }
    return taxDifferentials;
  }, taxDifferentials);  
  if (taxDifferentials.length > 0) {
    sum = 0;
    average = 0;
    taxDifferentials.forEach(function(e) {
      sum = sum + e;
    });
    average = sum / taxDifferentials.length;
  }
  return [taxDifferentials.length, sum, average];
}

// no decimal places
function parseToString(input: number): string {
  return input.toFixed(0);
}

// commas
function parseCommas(string: any) {
  return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// rendering MunicipalRow, imported into SearchMap
const MunicipalRow: React.FC<MunicipalRowProps> = ({ data, node, selectedMuni, highlightedSites, sitesCount }) => {
  const quantitySites : number = getTax(data, selectedMuni)[0];
  const differential : number = getTax(data, selectedMuni)[1]; 
  const averageDiff : number = getTax(data, selectedMuni)[2];
  return (
    <div css={muniRowStyle}>
      <h2>Suitability Analysis of Identified Sites:</h2>
      <h1>{selectedMuni}</h1>
      <ul css={detailListStyle}>
        <li>Tax Revenue Differential: ${parseCommas(parseToString(differential))}</li>
        <li>Average Tax Revenue Differential Per Site: ${parseCommas(parseToString(averageDiff))}</li>
        {/* <li>Average Tax Revenue Differential Per Site: ${parseCommas(parseToString(parseFloat(node.Municipal_Avg_Tax_Increase)))}</li> */}
        <li>Quantity of Sites: {quantitySites}</li>
      </ul>
      {/* <Chart
        data={data}
        node={node}
        selectedMuni={selectedMuni}
        highlightedSites={highlightedSites}
      /> */}
    </div>
  )
};

export default MunicipalRow;