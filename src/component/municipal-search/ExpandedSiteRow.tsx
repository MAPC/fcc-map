/** @jsx jsx */

import React, { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/react';
import { CsvData } from './MunicipalData';
import { PushPinSimple } from 'phosphor-react';
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

const bold = css`
  font-weight: 600;
  padding-right: 2px;
  color: black;
`;

const scoreType = css`
  margin-left: 1.2em;
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
    <div key={node.site_oid}>
      <h3>Current Conditions</h3>
      <p><span css={bold}>{parseDouble(+node.area_acres)}</span><span css={scoreType}>Unconstrained land area</span></p>
      <p><span css={bold}>{parseDouble(+node.bldlnd_rat)}</span><span css={scoreType}>Current floor area ratio</span></p>
      <p><span css={bold}>{parseDouble(+node.total_valu)}</span><span css={scoreType}>Current building land/value ratio</span></p>
      <p><span css={bold}>{}</span><span css={scoreType}>Year built</span></p>
      <p><span css={bold}>{}</span><span css={scoreType}>Land use code descriptors</span></p>
      <p><span css={bold}>{node.station}</span><span css={scoreType}>Associated transit station area</span></p>
      <p><span css={bold}>{parseDouble(+node.disttosewerft)}</span><span css={scoreType}>Distance to sewer</span></p>
      <h3>Redevelopment Suitability and Potential</h3>
      <p><span css={bold}>{(node.Growth_Potential_Score)}</span>/1 <span css={scoreType}>Growth Potential Score</span></p>
      <p><span css={bold}>{(node.Healthy_Communities_Score)}</span>/1 <span css={scoreType}>Healthy Communities Score</span></p>
      <p><span css={bold}>{(node.Healthy_Watersheds_Score)}</span>/1 <span css={scoreType}>Healthy Watersheds Score</span></p>
      <p><span css={bold}>{(node.Travel_Choices_Score)}</span>/1 <span css={scoreType}>Travel Choices Score</span></p>
      <p><span css={bold}>{parseDouble(+node.Overall_Score / 4)}</span>/1 <span css={scoreType}>Overall Score</span></p>
      <p><span css={bold}>{node.Estimated_Capacity__all_residential_}</span> <span css={scoreType}>Estimated Capacity (all residential)</span></p>
      <p><span css={bold}>{node.Estimated_Capacity__some_commercial_}</span> <span css={scoreType}>Estimated Capacity (some commercial)</span></p>
      <p><span css={bold}>${parseCommas(parseDouble(+node.Site_Tax_Revenue_Change))}</span> <span css={scoreType}>Estimated Tax Revenue Change</span></p>
      <li><span css={bold}>{ordinalSuffix(+node.municipal_rank)}</span>/{sitesCount} in {node.municipal}</li>
      <li><span css={bold}>{ordinalSuffix(+node.regional_rank)}</span>/3037 in the Region</li>
      <h3
        onClick={() => {
          setSite(false);
        }}  
        style={{cursor: "pointer"}}
      >
        Show Less
      </h3>
    </div>
  )
};

export default ExpandedSiteRow;
