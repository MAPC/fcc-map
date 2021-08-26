/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import SiteRow from './SiteRow';
import MunicipalRow from './MunicipalRow';
import Legend from './Legend'
import { themeColors, fonts } from '../../utils/theme';

export type CsvData = {
  Quintile_Category: string,
  Top_Category: string,
  municipal: string,
  site_oid: string,
  Growth_Potential_Score: string,
  Healthy_Communtiies_Score: string,
  Healthy_Watersheds_Score: string,
  Travel_Choices_Score: string,
  Overall_Score: string,
  Number_of_Parcels_on_Site: string,
  Site_Tax_Revenue_Change: string,
  Tax_Revenue__after_retrofit_: string,
  Tax_Revenue__before_retrofit_: string,
  Municipal_Avg_Tax_Increase: string,
  Municipal_Total_Tax_Increase: string
}

interface MunicipalDataProps {
  data: Array<CsvData>,
  selectedMuni: string|undefined,
  node: Array<CsvData>,
  containerRef: React.RefObject<HTMLInputElement>,
  highlightedSites: Array<number|undefined>, //passing to SiteRow
  dispatch: React.Dispatch<unknown>
}

const SearchBarStyle = css`
  .mapboxgl-ctrl-geocoder {
    max-width: 45rem;
    width: 45rem;
    margin: 4vh 2vw 2vh;
    z-index: 5;
  }
`;

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
  width: 45rem;
`;

const ulStyle = css`
  padding-left: 0;
  list-style: none;
  max-height: 86vh;
  width: 45rem;
  overflow-y: scroll;
  padding-right: 1rem;
  z-index: 1;
  margin: 0 2vw 4vh;
`;

// working original SiteRow filter 
// function filterData(data: Array<CsvData>, selectedMuni: string|undefined, dispatch: React.Dispatch<unknown>, highlightedSites: Array<number|undefined> ): Array<JSX.Element>|undefined {
//   if (selectedMuni) {
//     return data.reduce((list: Array<JSX.Element>, node: CsvData) => {
//       if (node.municipal === selectedMuni) {
//         list.push(<SiteRow node={node} key={node.site_oid} dispatch={dispatch} highlightedSites={highlightedSites} />);
//       }
//       return list;
//     }, []);
//   }
//   return undefined;
// }

function filterData(data: Array<CsvData>, selectedMuni: string|undefined, dispatch: React.Dispatch<unknown>, highlightedSites: Array<number|undefined> ): Array<JSX.Element>|undefined {
  if (selectedMuni) {
    data.sort((a: any, b: any) => 
      // choose sort-by attribute here
      b.Quintile_Category - a.Quintile_Category
    );
    // console.log("data.sort'ed by overall score: ", data);
    return data.reduce((list: Array<JSX.Element>, node: CsvData) => {
      if (node.municipal === selectedMuni) {
        list.push(<SiteRow node={node} key={node.site_oid} dispatch={dispatch} highlightedSites={highlightedSites} />);
      }
      return list;
    }, []);
  }
  return undefined;
}

function showMunicipalRow(data: Array<CsvData>, node: Array<CsvData>, selectedMuni: string|undefined) {
  if (selectedMuni) {
    return <MunicipalRow data={data} node={node} selectedMuni={selectedMuni} />;
  }
  return undefined;
}

const MunicipalData: React.FC<MunicipalDataProps> = ({ data, selectedMuni, node, containerRef, highlightedSites, dispatch }) => (
  <div css={wrapperStyle}>
    <div ref={containerRef} css={SearchBarStyle} />
    {selectedMuni ? showMunicipalRow(data, node, selectedMuni) : ''} {/* renders one MunicipalRow on municipality selection */}
    <Legend />
    <ul css={ulStyle}>
      {selectedMuni ? filterData(data, selectedMuni, dispatch, highlightedSites) : ''}
    </ul>
  </div>
);

export default MunicipalData;
export { filterData };