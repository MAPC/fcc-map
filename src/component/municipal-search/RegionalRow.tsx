/** @jsx jsx */

import React, { useState } from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { CsvData } from './MunicipalData'; 
import { PlusCircle, TextAlignJustify } from 'phosphor-react';
import { MinusCircle } from 'phosphor-react';
import Chart from './Chart';
import ExpandedMuniRow from "./ExpandedMuniRow";
import Legend from "./Legend";

interface RegionalRowProps {
  data: Array<CsvData>,
  node: Array<CsvData>,
  selectedMuni: string|undefined,
  highlightedSites: Array<number|undefined>,
}

const containerStyle = css`
  background: ${themeColors.white};
  display: flex;
  flex-flow: row wrap;
  margin: .5rem 0;
  max-width: 45rem;
  padding: 1.5rem 2rem .5rem;
  z-index: 1;
  h1 {
    width: 100%;
  }
  h2 {
    margin-top: 0;
    margin-bottom: 0;
    width: 100%;
  }
  p.value {
    padding-right: 1%;
    text-align: right;
    width: 29%;
  }
  p.field {
    width: 70%;
  }
  .title-container:hover {
    cursor: pointer;
    width: 100%;
    h1, h2 {color: ${themeColors.clearWater};}
  }
  .legend {
    width: 100%;
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

function getRegionalSiteArea(data: Array<CsvData>): number {
  let siteAreaArray: Array<number> = [];
  let siteAreaSum: number = 0;

  data.forEach((elem) => {
    siteAreaArray.push(+elem.buildarea_ac)
    return siteAreaArray;
  })
  if (siteAreaArray.length > 0) {
    siteAreaSum = 0;
    siteAreaArray.forEach(function(e) {
      siteAreaSum = siteAreaSum + e;
    });
  }
  return siteAreaSum;
}

function getRegionalTransit(data: Array<CsvData>): number {
  let stationSum: number = 0;

  data.forEach((elem) => {
    if (elem.station !== "") {
      stationSum++;
    }
    return stationSum;
  })
  console.log("stations", stationSum);
  
  return stationSum;
}

// no decimal places
function parseToString(input: number): string {
  return input.toFixed(0);
}

// two decimal places
function parseDouble(input: number): string {
  return input.toFixed(2);
}

// commas
function parseCommas(string: any) {
  return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const RegionalRow: React.FC<RegionalRowProps> = ({ data, node, selectedMuni, highlightedSites }) => {

  return (
    <div css={containerStyle}>
      <h2>Potential Retail Retrofit Sites in</h2>
      <h1>MAPC Region</h1>
      <p className="value"><span css={bold}>{data.length}</span></p>
      <p className="field">Sites</p>
      <p className="value"><span css={bold}>{parseCommas(parseDouble(getRegionalSiteArea(data)))}</span></p>
      <p className="field">Sites Area (acres)</p>
      <p className="value"><span css={bold}>{getRegionalTransit(data)}</span></p>
      <p className="field">Sites Near MBTA Transit</p>
      <p className="value"><span css={bold}>{}</span></p>
      <p className="field">Average New Tax Revenue Per Site</p>
      <p className="value"><span css={bold}>{}</span></p>
      <p className="field">Potential Units, top 10% of sites</p>
      <p className="value"><span css={bold}>{}</span></p>
      <p className="field">Potential New Tax Revenue, top 10% of sites</p>
    </div>
  )
};

export default RegionalRow;