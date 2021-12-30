/** @jsx jsx */

import React, { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { CsvData } from './MunicipalData';
import { PushPinSimple } from 'phosphor-react';
import ExpandedSiteRow from './ExpandedSiteRow';

interface SiteRowProps {
  data: Array<CsvData>,
  node: CsvData,
  dispatch: React.Dispatch<unknown>,
  selectedMuni: string|undefined,
  highlightedSites: Array<number|undefined>,
  sitesCount: number|undefined,
  selectedSite: any,
}

const liStyle = css`
  background: ${themeColors.warmGrayTransparent};
  margin: .5rem 0;
  padding: 1.5rem 2rem;
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

const detailListStyle = css`
  padding-left: 0;
  list-style: none;
  color: ${themeColors.fontGray}
`;

const bold = css`
  font-weight: 600;
  padding-right: 2px;
  color: black;
`;

const scoreType = css`
  margin-left: 1.2em;
`;

function parseDouble(input: number): string {
  return input.toFixed(2);
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

const SiteRow: React.FC<SiteRowProps> = ({ data, node, dispatch, sitesCount, selectedMuni, highlightedSites, selectedSite }) => {
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

  function showExpanded(data: Array<CsvData>, selectedMuni: string|undefined, highlightedSites: Array<number|undefined>, selectedSite: any, sitesCount: number|undefined ) {
    if (selectedSite) {
      return <ExpandedSiteRow data={data} key={selectedSite.site_oid} selectedMuni={selectedMuni} highlightedSites={highlightedSites} selectedSite={selectedSite} sitesCount={sitesCount} />
    } 
    return (null); // does not render component if site evaluates false
  }

  return (
    <li key={node.site_oid} 
        id={node.site_oid}
        css={
          [
            liStyle,
            node.Quintile_Category ===  '5' ? quintile5 : 
            node.Quintile_Category ===  '4' ? quintile4 : 
            node.Quintile_Category ===  '3' ? quintile3 : 
            node.Quintile_Category === '2' ? quintile2 : 
            node.Quintile_Category === '1' ? quintile1 :
            ''
          ]
        }
        onMouseEnter={(e) => {
          if (!highlighted) {
            toggleHightlight(!highlighted);
            dispatch({ type: 'addSite', toggledSite: +node.site_oid });
          }
        }}
        onMouseLeave={(e) => {
          if (highlighted && !starred) {
            toggleHightlight(!highlighted);
            dispatch({ type: 'addSite', toggledSite: +node.site_oid });
          }
        }}
    > 
      <button css={buttonStyle} 
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
      <h2>{node.parcel_addr}</h2>
      <h1>{node.municipal} | Site {node.site_oid}</h1>
      {selectedSite.site_oid === node.site_oid ? showExpanded(data, selectedMuni, highlightedSites, selectedSite, sitesCount) : ''}
    </li>
  )
};

export default SiteRow;
