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
  padding: 1.5rem 2rem;
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
  .margin-bottom {
    margin-bottom: 1.5rem;
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
    if (elem.statname !== "") {
      stationSum++;
    }
    return stationSum;
  })
  console.log("stations", stationSum);
  
  return stationSum;
}


function getAverageRegionalTax(data: Array<CsvData>): number {
  let taxDifferentialsArr: Array<number> = [];
  let sum: number = 0;
  let average: number = 0;
  data.forEach((site) => {
    taxDifferentialsArr.push(parseFloat(site.Site_Tax_Revenue_Change));
    return taxDifferentialsArr;
  });  
  if (taxDifferentialsArr.length > 0) {
    sum = 0;
    average = 0;
    taxDifferentialsArr.forEach(function(e) {
      sum = sum + e;
    });
    average = sum / taxDifferentialsArr.length;
  }
  return average;
}

function getPotentialUnits(data: Array<CsvData>): number {
  let unitsArray: Array<number> = [];
  let unitsSum: number = 0;
  data.forEach((e) => {
    // if (e.municipal === selectedMuni && +e.munpctile >= 90) {
      unitsArray.push(+e.Estimated_Capacity__all_residential_)
    // }
    return unitsArray;
  })
  if (unitsArray.length > 0) {
    unitsArray.forEach((e) => {
      unitsSum = unitsSum + e;
    })
    return unitsSum;
  }
  return unitsSum;
}

function getTaxTopTen(data: Array<CsvData>): number {
  let taxesArray: Array<number> = [];
  let taxesSum: number = 0;
  data.forEach((e) => {
    // if (e.municipal === selectedMuni && +e.munpctile >= 90) {
      taxesArray.push(+e.Tax_Revenue__after_retrofit_)
    // }
    return taxesArray;
  })
  if (taxesArray.length > 0) {
    taxesArray.forEach((e) => {
      taxesSum = taxesSum + e;
    })
    return taxesSum;
  }
  return taxesSum;
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
      <h2 className="margin-bottom">Summary Statistics</h2>
      <p className="value"><span css={bold}>{data.length}</span></p>
      <p className="field">Sites</p>
      <p className="value"><span css={bold}>{parseCommas(parseDouble(getRegionalSiteArea(data)))}</span></p>
      <p className="field">Acres Sites Area</p>
      <p className="value"><span css={bold}>{getRegionalTransit(data)}</span></p>
      <p className="field">Sites Near MBTA Transit</p>
      <p className="value"><span css={bold}>${parseCommas(parseToString(getAverageRegionalTax(data)))}</span></p>
      <p className="field">Average New Tax Revenue Per Site</p>
      <p className="value"><span css={bold}>{parseCommas(parseToString(getPotentialUnits(data)))}</span></p>
      <p className="field">Potential Units, top 10% of sites</p>
      <p className="value"><span css={bold}>${parseCommas(parseToString(getTaxTopTen(data)))}</span></p>
      <p className="field">Potential New Tax Revenue, top 10% of sites</p>
    </div>
  )
};

export default RegionalRow;