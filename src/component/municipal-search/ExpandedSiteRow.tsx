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
  setSite: React.Dispatch<React.SetStateAction<any>>,
  sitesCount: number|undefined
}

const buttonStyle = css`
  cursor: pointer;
  background: none;
  border: none;
  float: right;
`;

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

  const [highlighted, toggleHightlight] = useState<boolean>(false);
  const [starred, toggleStarred] = useState<boolean>(false);

  useEffect(() => {
    // if on render highlightedSites array includes this SiteRow card's site_oid,
    // then initialize highlighted and starred to true
    // else, useState(false)
    // need to call it only once, on ComponentDidMount
    const checkHighlightedSites = () => {
      if (highlightedSites.includes(+node.site_oid)) {
        toggleHightlight(true)
        toggleStarred(true)
      } else {
        toggleHightlight(false)
        toggleStarred(false)
      }
    }
    checkHighlightedSites();
  }, [])

  return (
    <div key={node.site_oid}>
      <button css={buttonStyle} 
        onMouseEnter={() => {
          if (!highlighted) {
            toggleHightlight(!highlighted);
            dispatch({ type: 'addSite', toggledSite: +node.site_oid });
          }
        }}
        onMouseLeave={() => {
          if (highlighted && !starred) {
            toggleHightlight(!highlighted);
            dispatch({ type: 'addSite', toggledSite: +node.site_oid });
          }
        }}
        onClick={() => {
          if (highlighted && starred) {
            toggleStarred(false);
            toggleHightlight(false);
            dispatch({ type: 'addSite', toggledSite: +node.site_oid });
          } else if (highlighted && !starred) {
            toggleStarred(true);
          } else if (!highlighted && !starred) {
            toggleStarred(true);
            toggleHightlight(true);
            dispatch({ type: 'addSite', toggledSite: +node.site_oid });
          }
        }}
      >
        <PushPinSimple size={25} weight="fill" color={highlighted ? themeColors.gold : themeColors.fontGray} />
      </button>
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
