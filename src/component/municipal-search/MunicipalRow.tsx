/** @jsx jsx */

import React, { useState } from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { CsvData } from './MunicipalData'; 
import { PlusCircle, TextAlignJustify } from 'phosphor-react';
import { MinusCircle } from 'phosphor-react';
import Chart from './Chart';
import ExpandedMuniRow from "./ExpandedMuniRow";

interface MunicipalRowProps {
  data: Array<CsvData>,
  node: Array<CsvData>,
  selectedMuni: string|undefined,
  highlightedSites: Array<number|undefined>,
  sitesCount: number|undefined
}

const containerStyle = css`
  background: ${themeColors.warmGrayTransparent};
  display: flex;
  flex-flow: row wrap;
  margin: .5rem 0;
  max-width: 45rem;
  padding: .5rem 2rem;
  z-index: 1;
  h1 {
    width: 100%;
  }
  h2 {
    margin-bottom: 0;
    width: 100%;
  }
  p.value {
    width: 30%;
  }
  p.field {
    width: 70%;
  }
`;

const bold = css`
  font-weight: 600;
  padding-right: 2px;
  color: black;
`;

const buttonStyle = css`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 37.5rem;
  margin-top: 0.5rem;
  padding: 1rem 0;
  position: absolute;
`;

// iterating through sites' tax differentials and returning the number of sites and sum
function getMuniTax(data: Array<CsvData>, selectedMuni: string|undefined): Array<number> {
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

function getMuniSiteArea(data: Array<CsvData>, selectedMuni: string|undefined): number {
  let siteAreaArray: Array<number> = [];
  let siteAreaSum: number = 0;
  data.reduce((siteAreaArray: Array<number>, node: CsvData) => {
    if (node.municipal === selectedMuni) {
      siteAreaArray.push(+node.sitearea_sf);
    }
    return siteAreaArray
  }, siteAreaArray);
  if (siteAreaArray.length > 0) {
    siteAreaSum = 0;
    siteAreaArray.forEach(function(e) {
      siteAreaSum = siteAreaSum + e;
    });
  }
  return siteAreaSum;
}

function getMuniTransit(data: Array<CsvData>, selectedMuni: string|undefined): number {
  let stationArray: Array<number> = [];
  let stationSum: number = 0;
  data.filter((e) => {
    if (e.municipal === selectedMuni && e.station !== "") {
      stationArray.push(+e.sitearea_sf)
      stationSum++;
    }
    return stationSum;
  }, stationSum);
  if (stationArray.length > 0) {
    let stationAreaSum = 0;
    stationArray.forEach(function(e) {
      stationAreaSum = stationAreaSum + e;
    });
  }
  return stationSum;
}

// no decimal places
function parseToString(input: number): string {
  return input.toFixed(0);
}

// commas
function parseCommas(string: any) {
  return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const MunicipalRow: React.FC<MunicipalRowProps> = ({ data, node, selectedMuni, highlightedSites, sitesCount }) => {
  const quantitySites : number = getMuniTax(data, selectedMuni)[0];
  const differential : number = getMuniTax(data, selectedMuni)[1]; 
  const averageDiff : number = getMuniTax(data, selectedMuni)[2];
  const [shown, toggleShow] = useState<boolean>(true);
  const [isHovered, toggleHover] = useState<boolean>(false);

  function handleMouseEnter() {
    toggleHover(true);
  };

  function handleMouseLeave () {
    toggleHover(false);
  };

  return (
    <div css={containerStyle}>
      <button css={buttonStyle} onClick={() => {toggleShow(!shown);}}>
        {shown ? 
          <MinusCircle size={25} weight="bold" color={isHovered ? themeColors.gold : themeColors.fontGray} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} /> : 
          <PlusCircle size={25} weight="bold" color={isHovered ? themeColors.gold : themeColors.fontGray} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} /> 
        }
      </button>
      <h2>Suitability Analysis of Identified Sites:</h2>
      <h1>{selectedMuni}</h1>
      {shown ? <ExpandedMuniRow  data={data} node={node} selectedMuni={selectedMuni} highlightedSites={highlightedSites} sitesCount={sitesCount} /> : ""}
    </div>
  )
};

export default MunicipalRow;