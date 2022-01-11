/** @jsx jsx */

import React, { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/react';
import { CsvData } from './MunicipalData';
import { AlignBottom, AlignTop, PushPinSimple } from 'phosphor-react';
import { themeColors, fonts } from '../../utils/theme';

interface ExpandedSiteRowProps {
  data: Array<CsvData>,
  dispatch: React.Dispatch<unknown>,
  highlightedSites: Array<number|undefined>,
  node: CsvData,
  selectedMuni: string|undefined,
  selectedSite: any,
  setSite: React.SetStateAction<any>,
  sitesCount: number|undefined
}

const containerStyle = css`
  display: flex;
  flex-flow: row wrap;
  h3 {
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
`;

const bold = css`
  font-weight: 600;
  padding-right: 2px;
  color: black;
`;

const collapseLink = css`
  cursor: pointer;
  :hover {
    color: ${themeColors.clearWater};
  }
`;

// no decimal places
function parseToString(input: number): string {
  return input.toFixed(0);
}

// one decimal places
function parseSingle(input: number): string {
  return input.toFixed(1);
}

// two decimal places
function parseDouble(input: number): string {
  return input.toFixed(2);
}

// commas
function parseCommas(string: any) {
  return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ordinalSuffix(i: number): string {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function getCapacityRange(units: number) {
  if (units >= 500) {
    return "Over 500";
  } else if (units >= 250 && units < 500) {
    return "250 - 500"; 
  } else if (units >= 100 && units < 250) {
    return "100 - 250"; 
  } else if (units >= 50 && units < 100) {
    return "50 - 100"; 
  } else {
    return "Fewer than 50";
  }
}

function getNewTaxRange(tax: number) {
  if (tax >= 1000000) {
    return "Over $1 million";
  } else if (tax >= 500000 && tax < 1000000) {
    return "$500,000 - $1 million"; 
  } else if (tax >= 100000 && tax < 500000) {
    return "$100,000 - $500,000"; 
  } else {
    return "0 - $100,000";
  }
}

function getStation(node: CsvData) {
  if (node.statname !== "") {
    return node.statname;
  } else {
    return "None within 0.5 miles"
  }
}

const ExpandedSiteRow: React.FC<ExpandedSiteRowProps> = ({
  data, 
  dispatch,
  highlightedSites, 
  node,
  selectedMuni,
  selectedSite,
  setSite,
  sitesCount
}) => {

  return (
    <div key={node.site_oid} css={containerStyle}>
      <h3>Current Conditions</h3>
      <p className="value"><span css={bold}>{parseToString(+node.Number_of_Parcels_on_Site)}</span></p>
      <p className="field">{+node.Number_of_Parcels_on_Site > 1 ? "Parcels" : "Parcel"}</p>
      <p className="value"><span css={bold}>{parseCommas(parseDouble(+node.buildarea_ac))}</span></p>
      <p className="field">Acres of Potentially Buildable Area</p>
      <p className="value"><span css={bold}>${parseCommas(parseToString(+node.land_value))}</span></p>
      <p className="field">Assessed Land Value</p>
      <p className="value"><span css={bold}>${parseCommas(parseToString(+node.bldg_value))}</span></p>
      <p className="field">Assessed Building Value</p>
      <p className="value"><span css={bold}>{parseCommas(parseDouble(+node.pavear_ac))}</span></p>
      <p className="field">Acres of Estimated Paved Area</p>
      <p className="value"><span css={bold}>{getStation(node)}</span></p>
      <p className="field">Transit Station Area</p>
      <p className="value"><span css={bold}>{+node.disttosewerft > 0 ? "Yes" : "No"}</span></p>
      <p className="field">Municipal Sewer Nearby</p>

      <h3>Redevelopment Suitability and Potential</h3>
      <p className="value"><span css={bold}>{getCapacityRange(+node.Estimated_Capacity__all_residential_)}</span></p>
      <p className="field">Units of Potential Housing Capacity</p>
      <p className="value"><span css={bold}>{getNewTaxRange(+node.Site_Tax_Revenue_Change)}</span></p>
      <p className="field">Estimated New Tax Revenue</p>
      <p className="value"><span css={bold}>{parseDouble(+node.Growth_Potential_Score)}/1</span></p>
      <p className="field">Growth Potential Score</p>
      <p className="value"><span css={bold}>{parseDouble(+node.Healthy_Communities_Score)}/1</span></p>
      <p className="field">Healthy Communities Score</p>
      <p className="value"><span css={bold}>{parseDouble(+node.Healthy_Watersheds_Score)}/1</span></p>
      <p className="field">Healthy Watersheds Score</p>
      <p className="value"><span css={bold}>{parseDouble(+node.Travel_Choices_Score)}/1</span></p>
      <p className="field">Travel Choices Score</p>
      <p className="value"><span css={bold}>{parseDouble(+node.Overall_Score)}/4</span></p>
      <p className="field">Overall Score</p>
      <p className="value"><span css={bold}>{ordinalSuffix(+node.municipal_rank)}/{sitesCount}</span></p>
      <p className="field">Rank within Municipality</p>
      <h3
        onClick={() => {
          const sitesList:any = document.getElementById("sites-list");
          const siteListItem:any = document.getElementById(selectedSite.site_oid);
          sitesList.scrollTop = (siteListItem.offsetTop - sitesList.offsetTop);
          setSite(false);
        }}  
        css={collapseLink}
      >
        Show Less
      </h3>
    </div>
  )
};

export default ExpandedSiteRow;
