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
  setSite: React.SetStateAction<any>,
  setSitesCount: React.SetStateAction<any>
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
    setSite: React.SetStateAction<any>, 
    setSitesCount: React.SetStateAction<any>, 
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

function executeScroll(
    selectedMuni: string|undefined, 
    selectedSite: any
  ): any|undefined 
{
  if (selectedMuni && selectedSite.municipal === selectedMuni) {
    // window.postMessage("scrollTop", "https://storymaps.arcgis.com/stories/cb9bec551f9d48599f267f4ff6282906");
    // console.log("window.postMessage inside executeScroll");
    const siteIntoView:any = document.getElementById(selectedSite.site_oid);
    siteIntoView.scrollIntoView({behavior: "smooth"}, true);
  } else {
    return null;
  }
}

function scrollToTop(selectedMuni: string|undefined) {
  if (selectedMuni) {
    // window.postMessage("scrollTop", "https://storymaps.arcgis.com/stories/cb9bec551f9d48599f267f4ff6282906");
    // console.log("window.postMessage inside scrollToTop");
    // const yOffset = window.pageYOffset;
    const sitesList:any = document.getElementById("sites-list");
    sitesList.scrollTop = 0 - sitesList.offsetTop;
  } else {
    return undefined;
  }
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

  useEffect(() => {
    executeScroll(
      selectedMuni, 
      selectedSite
    );
  }, [selectedSite])

  useEffect(() => {
    scrollToTop(selectedMuni);
  }, [selectedMuni])

  return (
    <ul css={ulStyle} id="sites-list">
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
