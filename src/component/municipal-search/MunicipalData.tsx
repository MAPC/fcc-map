/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import SitesList from './SitesList';
import SiteRow from './SiteRow';
import ExpandedSiteRow from './ExpandedSiteRow';
import MunicipalRow from './MunicipalRow';
import RegionalRow from './RegionalRow';
import Legend from './Legend'
import { themeColors, fonts } from '../../utils/theme';
import { List } from 'phosphor-react';

export type CsvData = {
  ECDF: string,
  Estimated_Capacity__all_residential_: string,
  Estimated_Capacity__some_commercial_: string,
  FAR_after_retrofit: string,
  Growth_Potential_Score: string,
  Healthy_Communities_Score: string,
  Healthy_Watersheds_Score: string,
  Latitude: string,
  Longitude: string,
  Number_of_Parcels_on_Site: string,
  Overall_Score: string,
  Parcel_IDs: string,
  Quintile_Category: string,
  Site_Tax_Revenue_Change: string,
  Submarket: string,
  Tax_Revenue__after_retrofit_: string,
  Tax_Revenue__before_retrofit_: string,
  Travel_Choices_Score: string,
  aulsite_p: string,
  bldg_value: string,
  bldlnd_rat: string,
  buildarea_ac: string,
  busstop: string,
  ch21e_p: string,
  commtype: string,
  county: string,
  disttosewerft: string,
  excluded_p: string,
  far_pre: string,
  field1: string,
  fz100_p: string,
  fz500_p: string,
  highway: string,
  id: string,
  imppreac: string,
  jobs30mincar: string,
  jobs45mintr: string,
  land_value: string,
  landv_pac: string,
  muni_id: string,
  municipal: string,
  municipal_rank: string,
  munpctile: string,
  munqntile: string,
  openspace_p: string,
  othr_value: string,
  parcel_addr: string,
  pctnonautocmt: string,
  pub_ind: string,
  regional_rank: string,
  regipctile: string,
  site_oid: string,
  sitearea_ac: string,
  statname: string,
  stattyp: string,
  subregion: string,
  subtype_id: string,
  total_valu: string,
  totvalpacre: string,
  transit_typ: string,
  type_id: string,
  walkscore: string,
  wetland100_p: string,
  yr_built: string,
  z2wpa_p: string
}

interface MunicipalDataProps {
  containerRef: React.RefObject<HTMLInputElement>,
  data: Array<CsvData>,
  dispatch: React.Dispatch<unknown>,
  highlightedSites: Array<number|number>
  node: Array<CsvData>,
  region: boolean,
  selectedMuni: string|undefined,
  selectedSite: any,
  setSite: React.Dispatch<React.SetStateAction<any>>,
  sitesCount: number|undefined,
  setSitesCount: React.SetStateAction<any>,
  toggleRegion: React.Dispatch<React.SetStateAction<boolean>>
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

// original filterData
// function filterData(data: Array<CsvData>, selectedMuni: string|undefined, dispatch: React.Dispatch<unknown>, highlightedSites: Array<number|undefined>, sitesCount: number|undefined, setSitesCount: React.Dispatch<React.SetStateAction<any>>, site: any): Array<JSX.Element>|undefined {
//   if (selectedMuni) {
//     data.sort((a: any, b: any) => 
//       // choose sort-by attribute here
//       b.Quintile_Category - a.Quintile_Category
//     );
//     let count = data.filter(d => d.municipal == selectedMuni).length;
//     setSitesCount(count);
//     return data.reduce((list: Array<JSX.Element>, node: CsvData) => {
//       if (node.municipal === selectedMuni) {
//         list.push(<SiteRow data={data} node={node} key={node.site_oid} dispatch={dispatch} selectedMuni={selectedMuni} highlightedSites={highlightedSites} sitesCount={sitesCount} site={site} />);
//       }
//       return list;
//     }, []);
//   }
//   return undefined;
// }

function filterData(data: Array<CsvData>, selectedMuni: string|undefined, dispatch: React.Dispatch<unknown>, highlightedSites: Array<number|undefined>, sitesCount: number|undefined, setSitesCount: React.SetStateAction<any>, selectedSite: any, setSite: React.SetStateAction<any> ): Array<JSX.Element>|undefined {
  if (selectedMuni) {
    data.sort((a: any, b: any) => 
      // choose sort-by attribute here
      b.Quintile_Category - a.Quintile_Category
    );
    let count = data.filter(d => d.municipal == selectedMuni).length;
    setSitesCount(count);
    return data.reduce((list: Array<JSX.Element>, node: CsvData) => {
      if (node.municipal === selectedMuni) {
        list.push(<SiteRow data={data} node={node} key={node.site_oid} dispatch={dispatch} selectedMuni={selectedMuni} highlightedSites={highlightedSites} sitesCount={sitesCount} selectedSite={selectedSite} setSite={setSite} />);
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

const MunicipalData: React.FC<MunicipalDataProps> = ({ data, selectedMuni, node, containerRef, highlightedSites, sitesCount, setSitesCount, selectedSite, setSite, dispatch, region }) => (
  <div css={dataWrapperStyle}>
    <div ref={containerRef} css={SearchBarStyle} />
    <Legend />
    {region ? <RegionalRow data={data} node={node} selectedMuni={selectedMuni} highlightedSites={highlightedSites} /> : ''}
    {selectedMuni ? showMunicipalRow(data, node, selectedMuni, highlightedSites ) : ''} 
    <SitesList data={data} selectedMuni={selectedMuni} dispatch={dispatch} highlightedSites={highlightedSites} sitesCount={sitesCount} selectedSite={selectedSite} setSite={setSite} setSitesCount={setSitesCount} />
  </div>
);

export default MunicipalData;