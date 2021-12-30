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
  cursor: pointer;
  background: none;
  border: none;
  float: right;
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
    > 
      <button css={buttonStyle} 
        // onMouseEnter={() => {
        //   if (!highlighted) {
        //     toggleHightlight(!highlighted);
        //     dispatch({ type: 'addSite', toggledSite: +node.site_oid });
        //   }
        // }}
        // onMouseLeave={() => {
        //   if (highlighted && !starred) {
        //     toggleHightlight(!highlighted);
        //     dispatch({ type: 'addSite', toggledSite: +node.site_oid });
        //   }
        // }}
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
          if (selectedSite === node) {
            setSite(false);
          } else {
            setSite(node);
          }
        }}
        style={{ cursor: `pointer`}}
      >
        <h2>{node.parcel_addr}</h2>
        <h1>{node.municipal} | Site {node.site_oid}</h1>
      </div>
      {selectedSite.site_oid === node.site_oid ? showExpanded(data, dispatch, highlightedSites, node, selectedMuni, selectedSite, setSite, sitesCount) : ''}
    </li>
  )
};

export default SiteRow;
