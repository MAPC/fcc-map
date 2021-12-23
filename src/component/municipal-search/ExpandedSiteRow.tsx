/** @jsx jsx */

import React, { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { CsvData } from './MunicipalData';
import { PushPinSimple } from 'phosphor-react';

interface ExpandedSiteRowProps {
  data: Array<CsvData>,
  node: Array<CsvData>,
  selectedMuni: string|undefined,
  highlightedSites: Array<number|undefined>,
  site: any,
  dispatch: React.Dispatch<unknown>,
  sitesCount: number|undefined
}

const expandedStyle = css`
  background: ${themeColors.white};
  max-width: 45rem;
  padding: 1.5rem 2rem;
  z-index: 1;
  h2 {
    text-transform: lowercase;
  }
  h2:first-letter,
  h2:first-line {
    text-transform: capitalize;
  }
`;

const quintile1 = css`
border-right: 10px solid ${themeColors.quintile1};
`;

const quintile2 = css`
border-right: 10px solid ${themeColors.quintile2};
`;

const quintile3 = css`
border-right: 10px solid ${themeColors.quintile3};
`;

const quintile4 = css`
border-right: 10px solid ${themeColors.quintile4};
`;

const quintile5 = css`
border-right: 10px solid ${themeColors.quintile5};
`;

const buttonStyle = css`
  background: none;
  border: none;
  float: right;
  cursor: pointer;
`;

const bold = css`
  font-weight: 600;
  padding-right: 2px;
  color: black;
`;

const scoreType = css`
  margin-left: 1.2em;
`;

const detailListStyle = css`
  padding-left: 0;
  list-style: none;
  color: black;
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

// function filterNode(node: any, site: any) {
//     node.map((elem) => {
//         if (elem.site_oid === site.site_oid)
//         console.log("elem inside filterNode: ", elem);
//         return elem;
//     })
// }

// rendering MunicipalRow, imported into SearchMap
const ExpandedSiteRow: React.FC<ExpandedSiteRowProps> = ({ data, node, selectedMuni, highlightedSites, site, dispatch, sitesCount }) => {
    const [highlighted, toggleHightlight] = useState<boolean>(false);
    const [starred, toggleStarred] = useState<boolean>(false);
    
    useEffect(() => {
      // if on render highlightedSites array includes this SiteRow card's site_oid,
      // then initialize highlighted and starred to true
      // else, useState(false)
      // need to call it only once, on ComponentDidMount
      const checkHighlightedSites = () => {
        if (highlightedSites.includes(+site.site_oid)) {
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
    <div
      css={
        [
          expandedStyle,
          site["Quintile Category"] ===  '5' ? quintile5 : 
          site["Quintile Category"] ===  '4' ? quintile4 : 
          site["Quintile Category"] ===  '3' ? quintile3 : 
          site["Quintile Category"] === '2' ? quintile2 : 
          site["Quintile Category"] === '1' ? quintile1 :
          ''
        ]
      }
      onMouseEnter={(e) => {
        if (!highlighted) {
          toggleHightlight(!highlighted);
          dispatch({ type: 'addSite', toggledSite: +site["site_oid"] });
        }
      }}
      onMouseLeave={(e) => {
        if (highlighted && !starred) {
          toggleHightlight(!highlighted);
          dispatch({ type: 'addSite', toggledSite: +site["site_oid"] });
        }
      }}
    >
      <button css={buttonStyle} 
         onClick={() => {
          if (highlighted && starred) {
            toggleStarred(false);
            toggleHightlight(false);
            dispatch({ type: 'addSite', toggledSite: +site.site_oid });
          } else if (highlighted && !starred) {
            toggleStarred(true);
          } else if (!highlighted && !starred) {
            toggleStarred(true);
            toggleHightlight(true);
            dispatch({ type: 'addSite', toggledSite: +site.site_oid });
          }
        }}
      >
        <PushPinSimple size={25} weight="fill" color={highlighted ? themeColors.gold : themeColors.fontGray} />
      </button>
      <h2>{site.parcel_addr}</h2>
      <h1>{site.municipal} | Site {site.site_oid}</h1>
      <h3>Current Conditions</h3>
      <p><span css={bold}>{}</span><span css={scoreType}>Unconstrained land area</span></p>
      <p><span css={bold}>{}</span><span css={scoreType}>Current floor area ratio</span></p>
      <p><span css={bold}>{}</span><span css={scoreType}>Current building land/value ratio</span></p>
      <p><span css={bold}>{}</span><span css={scoreType}>Year built</span></p>
      <p><span css={bold}>{}</span><span css={scoreType}>Land use code descriptors</span></p>
      <p><span css={bold}>{}</span><span css={scoreType}>Associated transit station area</span></p>
      <p><span css={bold}>{site.disttosewerft}</span><span css={scoreType}>Distance to sewer</span></p>
      <h3>Redevelopment Suitability and Potential</h3>
      <p><span css={bold}>{(site["Growth Potential Score"])}</span>/1 <span css={scoreType}>Growth Potential Score</span></p>
      <p><span css={bold}>{(site["Healthy Communities Score"])}</span>/1 <span css={scoreType}>Healthy Communities Score</span></p>
      <p><span css={bold}>{(site["Healthy Watersheds Score"])}</span>/1 <span css={scoreType}>Healthy Watersheds Score</span></p>
      <p><span css={bold}>{(site["Travel Choices Score"])}</span>/1 <span css={scoreType}>Travel Choices Score</span></p>
      <p><span css={bold}>{parseDouble((+site["Overall Score"]) / 4)}</span>/1 <span css={scoreType}>Overall Score</span></p>
      <p><span css={bold}>{parseDouble(+site["Estimated Capacity (all residential)"])}</span> <span css={scoreType}>Estimated Capacity (all residential)</span></p>
      <p><span css={bold}>{parseDouble(+site["Estimated Capacity (some commercial)"])}</span> <span css={scoreType}>Estimated Capacity (some commercial)</span></p>
      <p><span css={bold}>$ {parseCommas(parseDouble(+site["Site Tax Revenue Change"]))}</span> <span css={scoreType}>Estimated Tax Revenue Change</span></p>
      <li><span css={bold}>{ordinalSuffix(+site.municipal_rank)}</span>/{sitesCount} in {site.municipal}</li>
      <li><span css={bold}>{ordinalSuffix(+site.regional_rank)}</span>/3037 in the Region</li>
    </div>
  )
};

export default ExpandedSiteRow;
