/** @jsx jsx */

import React, { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { CsvData } from './MunicipalData';
import { PushPinSimple } from 'phosphor-react';
import ExpandedSiteRow from './ExpandedSiteRow';

interface SiteRowProps {
  data: Array<CsvData>,
  dispatch: React.Dispatch<unknown>,
  highlightedSites: Array<number|undefined>,
  node: CsvData,
  selectedMuni: string|undefined,
  selectedSite: any,
  setSite: React.SetStateAction<any>,
  sitesCount: number|undefined
}

const liStyle = css`
  background: ${themeColors.warmGrayTransparent};
  margin: .5rem 0;
  padding: 1.5rem 2rem;
  .title-container:hover {
    cursor: pointer;
    h1, h2 {color: ${themeColors.clearWater};}
  }
  h2 {
    margin: 0.4rem;
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
  cursor: pointer;
  float: right;
  padding: 1rem 0;
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

const SiteRow: React.FC<SiteRowProps> = ({ 
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

  function showExpanded(
      data: Array<CsvData>, 
      dispatch: React.Dispatch<unknown>,
      highlightedSites: Array<number|undefined>,
      node: CsvData,
      selectedMuni: string|undefined, 
      selectedSite: any, 
      setSite: React.SetStateAction<any>,
      sitesCount: number|undefined 
    ) 
  {
    if (selectedSite) {
      return <ExpandedSiteRow 
        data={data} 
        dispatch={dispatch}
        highlightedSites={highlightedSites} 
        node={node}
        selectedMuni={selectedMuni} 
        selectedSite={selectedSite}
        setSite={setSite} 
        sitesCount={sitesCount} 
      />
    } 
    return (null); 
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
            console.log("highlightedSites: ", highlightedSites);
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
      <div         
        onClick={(e) => {
          if (selectedSite.site_oid === node.site_oid) {
            setSite(false);
          } else if (selectedSite.site_oid !== node.site_oid) {
            setSite(node);
          } else {
            setSite(node);
          }
        }}
        className="title-container"
      >
        <h2>{node.parcel_addr}</h2>
        <h2>Site {node.site_oid}</h2>
      </div>
      {selectedSite.site_oid === node.site_oid ? showExpanded(data, dispatch, highlightedSites, node, selectedMuni, selectedSite, setSite, sitesCount) : ''}
    </li>
  )
};

export default SiteRow;
