/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import SiteRow from './SiteRow';
import ExpandedSiteRow from './ExpandedSiteRow';
import MunicipalRow from './MunicipalRow';
import Legend from './Legend'
import { themeColors, fonts } from '../../utils/theme';
import { List } from 'phosphor-react';

export type CsvData = {
  Quintile_Category: string,
  Top_Category: string,
  municipal: string,
  site_oid: string,
  Growth_Potential_Score: string,
  Healthy_Communities_Score: string,
  Healthy_Watersheds_Score: string,
  Travel_Choices_Score: string,
  Overall_Score: string,
  Number_of_Parcels_on_Site: string,
  Site_Tax_Revenue_Change: string,
  Tax_Revenue__after_retrofit_: string,
  Tax_Revenue__before_retrofit_: string,
  Municipal_Avg_Tax_Increase: string,
  Municipal_Total_Tax_Increase: string,
  municipal_rank: string,
  regional_rank: string,
  parcel_addr: string,
  parcel_addrl: string
}

interface MunicipalDataProps {
  data: Array<CsvData>,
  selectedMuni: string|undefined,
  node: Array<CsvData>,
  containerRef: React.RefObject<HTMLInputElement>,
  highlightedSites: Array<number|undefined>, //passing to SiteRow
  sitesCount: number|undefined,
  setSitesCount: React.Dispatch<React.SetStateAction<any>>,
  dispatch: React.Dispatch<unknown>,
  site: any //lifted from SearchMap to Wrapper, passed down to MuniData
}

const SearchBarStyle = css`
  .mapboxgl-ctrl-geocoder {
    margin: .5rem 0;
    max-width: 45rem;
    width: 100%;
    z-index: 5;
  }
`;

const dataWrapperStyle = css`
  display: flex;
  flex-direction: column;
  height: 96vh;
  max-width: 45rem;
  padding: 2vh;
  width: 45rem;
`;

const ulStyle = css`
  padding-left: 0;
  list-style: none;
  margin: .5rem 0;
  max-width: 45rem;
  overflow-y: scroll;
  width: 45rem;
  z-index: 1;
`;

function filterData(data: Array<CsvData>, selectedMuni: string|undefined, dispatch: React.Dispatch<unknown>, highlightedSites: Array<number|undefined>, sitesCount: number|undefined, setSitesCount: React.Dispatch<React.SetStateAction<any>>): Array<JSX.Element>|undefined {
  if (selectedMuni) {
    data.sort((a: any, b: any) => 
      // choose sort-by attribute here
      b.Quintile_Category - a.Quintile_Category
    );
    let count = data.filter(d => d.municipal == selectedMuni).length;
    setSitesCount(count);
    return data.reduce((list: Array<JSX.Element>, node: CsvData) => {
      if (node.municipal === selectedMuni) {
        list.push(<SiteRow data={data} node={node} key={node.site_oid} dispatch={dispatch} selectedMuni={selectedMuni} highlightedSites={highlightedSites} sitesCount={sitesCount} />);
      }
      return list;
    }, []);
  }
  return undefined;
}

function showMunicipalRow(data: Array<CsvData>, node: Array<CsvData>, selectedMuni: string|undefined, highlightedSites: Array<number|undefined> ) {
  if (selectedMuni) {
    return <MunicipalRow data={data} node={node} selectedMuni={selectedMuni} highlightedSites={highlightedSites} sitesCount={filterData.length}/>;
  }
  return undefined;
}

function showExpanded(data: Array<CsvData>, node: Array<CsvData>, selectedMuni: string|undefined, highlightedSites: Array<number|undefined>, site: any, dispatch: React.Dispatch<unknown>, sitesCount: number|undefined ) {
  if (site) {
    return <ExpandedSiteRow data={data} node={node} key={site.site_oid} selectedMuni={selectedMuni} highlightedSites={highlightedSites} site={site} dispatch={dispatch} sitesCount={sitesCount} />
  } 
  return (null); // does not render component if site evaluates false
}

const MunicipalData: React.FC<MunicipalDataProps> = ({ data, selectedMuni, node, containerRef, highlightedSites, sitesCount, setSitesCount, site, dispatch }) => (
  <div css={dataWrapperStyle}>
    <div ref={containerRef} css={SearchBarStyle} />
    {selectedMuni ? showMunicipalRow(data, node, selectedMuni, highlightedSites ) : ''} {/* renders one MunicipalRow on municipality selection */}
    {/* <Legend /> */}
    <ul css={ulStyle}>
      {site ? showExpanded(data, node, selectedMuni, highlightedSites, site, dispatch, sitesCount) : '' }
      {selectedMuni ? filterData(data, selectedMuni, dispatch, highlightedSites, sitesCount, setSitesCount) : ''}
    </ul>
  </div>
);

export default MunicipalData;