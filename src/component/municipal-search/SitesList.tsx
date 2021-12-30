/** @jsx jsx */

import React, { useState, useEffect, useRef } from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { CsvData } from './MunicipalData';
import { AlignTop, PushPinSimple } from 'phosphor-react';
import SiteRow from './SiteRow';

interface SitesListProps {
  data: Array<CsvData>,
  dispatch: React.Dispatch<unknown>,
  highlightedSites: Array<number|undefined>,
  sitesCount: number|undefined,
  selectedMuni: string|undefined,
  selectedSite: any,
  setSite: React.Dispatch<React.SetStateAction<any>>,
  setSitesCount: React.Dispatch<React.SetStateAction<any>>
}

const ulStyle = css`
  list-style: none;
  margin: .5rem 0;
  max-width: 45rem;
  overflow-y: scroll;
  padding-left: 0;
  width: 45rem;
  z-index: 1;
`;

function filterData(
    data: Array<CsvData>, 
    dispatch: React.Dispatch<unknown>, 
    highlightedSites: Array<number|undefined>, 
    selectedMuni: string|undefined, 
    selectedSite: any, 
    setSite: React.Dispatch<React.SetStateAction<any>>, 
    setSitesCount: React.Dispatch<React.SetStateAction<any>>, 
    sitesCount: number|undefined 
  ): Array<JSX.Element>|undefined 
{
  if (selectedMuni) {
    data.sort((a: any, b: any) => 
      // choose sort-by attribute here
      b.Quintile_Category - a.Quintile_Category
    );
    let count = data.filter(d => d.municipal == selectedMuni).length;
    setSitesCount(count);
    return data.reduce((list: Array<JSX.Element>, node: CsvData) => {
      if (node.municipal === selectedMuni) {
        list.push(<SiteRow 
          data={data} 
          dispatch={dispatch} 
          highlightedSites={highlightedSites} 
          key={node.site_oid} 
          node={node} 
          selectedMuni={selectedMuni} 
          selectedSite={selectedSite} 
          setSite={setSite} 
          sitesCount={sitesCount} 
        />);
      }
      return list;
    }, []);
  }
  return undefined;
}

const SitesList: React.FC<SitesListProps> = ({ 
  data, 
  dispatch, 
  highlightedSites, 
  selectedMuni, 
  selectedSite,
  setSite, 
  setSitesCount,
  sitesCount
}) => {
  const executeScroll = () => {
    console.log("selectedSite", selectedSite.site_oid);
    if (selectedMuni && selectedSite && selectedSite.municipal === selectedMuni) {
        const siteIntoView = document.getElementById(selectedSite.site_oid);
        console.log("executeScroll executing");
        siteIntoView.scrollIntoView({behavior: "smooth"});
    } else {
        return null;
    }
  }
  return (
    <ul css={ulStyle}>
      {selectedSite ? executeScroll() : ''}
      {selectedMuni ? filterData(
        data, 
        dispatch, 
        highlightedSites, 
        selectedMuni, 
        selectedSite, 
        setSite,
        setSitesCount, 
        sitesCount
        ) : ''
      }
    </ul>
  )
};

export default SitesList;
