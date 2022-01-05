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
  if (units >= 150) {
    return "> 150";
  } else if (units > 50 && units < 150) {
    return "50 - 150"; 
  } else {
    return "< 50";
  }
}

function getStation(node: CsvData) {
  if (node.station !== "") {
    console.log("station avail", node.station);
    return node.station;
  } else {
    console.log("station not avail", node.station);
    return "-"
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
      <p className="value"><span css={bold}>{parseCommas(parseDouble(+node.sitearea_sf))}</span></p>
      <p className="field">Unconstrained land area (sq. ft.)</p>
      <p className="value"><span css={bold}></span></p>
      <p className="field">Current floor area ratio</p>
      <p className="value"><span css={bold}>{parseDouble(+node.bldlnd_rat)}</span></p>
      <p className="field">Building to land value ratio</p>
      <p className="value"><span css={bold}>{}</span></p>
      <p className="field">Year built</p>
      <p className="value"><span css={bold}>{}</span></p>
      <p className="field">Land use code descriptors</p>
      <p className="value"><span css={bold}>{getStation(node)}</span></p>
      <p className="field">Associated transit station</p>
      <p className="value"><span css={bold}>{parseDouble(+node.disttosewerft)}</span></p>
      <p className="field">Distance to nearest sewer line (ft.)</p>
      <h3>Redevelopment Suitability and Potential</h3>
      <p className="value"><span css={bold}>{parseDouble(+node.Growth_Potential_Score)}</span>/1</p>
      <p className="field">Growth Potential Score</p>
      <p className="value"><span css={bold}>{parseDouble(+node.Healthy_Communities_Score)}</span>/1</p>
      <p className="field">Healthy Communities Score</p>
      <p className="value"><span css={bold}>{parseDouble(+node.Healthy_Watersheds_Score)}</span>/1</p>
      <p className="field">Healthy Watersheds Score</p>
      <p className="value"><span css={bold}>{parseDouble(+node.Travel_Choices_Score)}</span>/1</p>
      <p className="field">Travel Choices Score</p>
      <p className="value"><span css={bold}>{parseDouble(+node.Overall_Score / 4)}</span>/1</p>
      <p className="field">Overall Score</p>
      <p className="value"><span css={bold}>{getCapacityRange(+node.Estimated_Capacity__all_residential_)}</span> units</p>
      <p className="field">of Estimated Capacity (all residential)</p>
      <p className="value"><span css={bold}>{getCapacityRange(+node.Estimated_Capacity__some_commercial_)}</span> units</p>
      <p className="field">of Estimated Capacity (some commercial)</p>
      <p className="value"><span css={bold}>${parseCommas(parseDouble(+node.Site_Tax_Revenue_Change))}</span></p>
      <p className="field">in New Taxes</p>
      <p className="value"><span css={bold}>{ordinalSuffix(+node.municipal_rank)}</span>/{sitesCount}</p>
      <p className="field">in {node.municipal}</p>
      <p className="value"><span css={bold}>{ordinalSuffix(+node.regional_rank)}</span>/3036</p>
      <p className="field">in the Region</p>
      <h3
        onClick={() => {
          const siteIntoView:any = document.getElementById(selectedSite.site_oid);
          siteIntoView.scrollIntoView(AlignBottom);
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
