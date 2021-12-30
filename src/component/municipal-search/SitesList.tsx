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
  selectedMuni: string|undefined,
  highlightedSites: Array<number|undefined>,
  sitesCount: number|undefined,
  setSitesCount: React.Dispatch<React.SetStateAction<any>>,
  selectedSite: any
}

const ulStyle = css`
  padding-left: 0;
  list-style: none;
  margin: .5rem 0;
  max-width: 45rem;
  overflow-y: scroll;
  width: 45rem;
  z-index: 1;
`;

function filterData(data: Array<CsvData>, selectedMuni: string|undefined, dispatch: React.Dispatch<unknown>, highlightedSites: Array<number|undefined>, sitesCount: number|undefined, setSitesCount: React.Dispatch<React.SetStateAction<any>>, selectedSite: any ): Array<JSX.Element>|undefined {
  if (selectedMuni) {
    data.sort((a: any, b: any) => 
      // choose sort-by attribute here
      b.Quintile_Category - a.Quintile_Category
    );
    let count = data.filter(d => d.municipal == selectedMuni).length;
    setSitesCount(count);
    return data.reduce((list: Array<JSX.Element>, node: CsvData) => {
      if (node.municipal === selectedMuni) {
        list.push(<SiteRow data={data} node={node} key={node.site_oid} dispatch={dispatch} selectedMuni={selectedMuni} highlightedSites={highlightedSites} sitesCount={sitesCount} selectedSite={selectedSite} />);
      }
      return list;
    }, []);
  }
  return undefined;
}

const SitesList: React.FC<SitesListProps> = ({ data, dispatch, sitesCount, setSitesCount, selectedMuni, highlightedSites, selectedSite }) => {

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
      {selectedMuni ? filterData(data, selectedMuni, dispatch, highlightedSites, sitesCount, setSitesCount, selectedSite) : ''}
    </ul>
  )
};

export default SitesList;
