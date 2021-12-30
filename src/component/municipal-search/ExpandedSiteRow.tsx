/** @jsx jsx */

import React, { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { CsvData } from './MunicipalData';
import { PushPinSimple } from 'phosphor-react';

interface ExpandedSiteRowProps {
  data: Array<CsvData>,
  // node: Array<CsvData>,
  selectedMuni: string|undefined,
  highlightedSites: Array<number|undefined>,
  selectedSite: any,
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

const ExpandedSiteRow: React.FC<ExpandedSiteRowProps> = ({ data, selectedMuni, highlightedSites, selectedSite, sitesCount }) => {

  return (
    <div>
      <h3>Current Conditions</h3>
      <p><span css={bold}>{parseDouble(+selectedSite.area_acres)}</span><span css={scoreType}>Unconstrained land area</span></p>
      <p><span css={bold}>{parseDouble(+selectedSite.bldlnd_rat)}</span><span css={scoreType}>Current floor area ratio</span></p>
      <p><span css={bold}>{parseDouble(+selectedSite.total_valu)}</span><span css={scoreType}>Current building land/value ratio</span></p>
      <p><span css={bold}>{}</span><span css={scoreType}>Year built</span></p>
      <p><span css={bold}>{}</span><span css={scoreType}>Land use code descriptors</span></p>
      <p><span css={bold}>{selectedSite.station}</span><span css={scoreType}>Associated transit station area</span></p>
      <p><span css={bold}>{parseDouble(+selectedSite.disttosewerft)}</span><span css={scoreType}>Distance to sewer</span></p>
      <h3>Redevelopment Suitability and Potential</h3>
      <p><span css={bold}>{(selectedSite["Growth Potential Score"])}</span>/1 <span css={scoreType}>Growth Potential Score</span></p>
      <p><span css={bold}>{(selectedSite["Healthy Communities Score"])}</span>/1 <span css={scoreType}>Healthy Communities Score</span></p>
      <p><span css={bold}>{(selectedSite["Healthy Watersheds Score"])}</span>/1 <span css={scoreType}>Healthy Watersheds Score</span></p>
      <p><span css={bold}>{(selectedSite["Travel Choices Score"])}</span>/1 <span css={scoreType}>Travel Choices Score</span></p>
      <p><span css={bold}>{parseDouble((+selectedSite["Overall Score"]) / 4)}</span>/1 <span css={scoreType}>Overall Score</span></p>
      <p><span css={bold}>{parseDouble(+selectedSite["Estimated Capacity (all residential)"])}</span> <span css={scoreType}>Estimated Capacity (all residential)</span></p>
      <p><span css={bold}>{parseDouble(+selectedSite["Estimated Capacity (some commercial)"])}</span> <span css={scoreType}>Estimated Capacity (some commercial)</span></p>
      <p><span css={bold}>${parseCommas(parseDouble(+selectedSite["Site Tax Revenue Change"]))}</span> <span css={scoreType}>Estimated Tax Revenue Change</span></p>
      <li><span css={bold}>{ordinalSuffix(+selectedSite.municipal_rank)}</span>/{sitesCount} in {selectedSite.municipal}</li>
      <li><span css={bold}>{ordinalSuffix(+selectedSite.regional_rank)}</span>/3037 in the Region</li>
    </div>
  )
};

export default ExpandedSiteRow;
