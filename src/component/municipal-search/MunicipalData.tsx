/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import SiteRow from './SiteRow';
// import MunicipalRow from './MunicipalRow';

export type CsvData = {
  site_oid: string,
  municipal: string,
  Growth_Potential_Score: string,
  Healthy_Communtiies_Score: string,
  Healthy_Watersheds_Score: string,
  Travel_Choices_Score: string,
  Overall_Score: string,
  Number_of_Parcels_on_Site: string
}

// attempting to add muni data
// export type CsvDataMunicipalRow = {
//   site_oid: string,
//   municipal: string,
//   Growth_Potential_Score: string,
//   Healthy_Communtiies_Score: string,
//   Healthy_Watersheds_Score: string,
//   Travel_Choices_Score: string,
//   Overall_Score: string,  
//   Number_of_Parcels_on_Site: string
// }

interface MunicipalDataProps {
  data: Array<CsvData>,
  // dataMuni: Array<CsvDataMunicipalRow>, //added
  selectedMuni: string|undefined,
  containerRef: React.RefObject<HTMLInputElement>,
  dispatch: React.Dispatch<unknown>
}

const SearchBarStyle = css`
  .mapboxgl-ctrl-geocoder {
    max-width: 50rem;
    width: 50rem;
  }
`;

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
  width: 50rem;
`;

const ulStyle = css`
  padding-left: 0;
  list-style: none;
  max-height: 55rem;
  overflow-y: scroll;
  padding-right: 1rem;
`;

function filterData(data: Array<CsvData>, selectedMuni: string|undefined, dispatch: React.Dispatch<unknown>): Array<JSX.Element>|undefined {
  if (selectedMuni) {
    return data.reduce((list: Array<JSX.Element>, node: CsvData) => {
      if (node.municipal === selectedMuni) {
        list.push(<SiteRow node={node} key={node.site_oid} dispatch={dispatch} />);
      }
      return list;
    }, []);
  }
  return undefined;
}

// function filtering data for MunicipalRow
// function filterDataMuni(dataMuni: Array<CsvDataMunicipalRow>, selectedMuni: string|undefined, dispatch: React.Dispatch<unknown>): Array<JSX.Element>|undefined {
//   if (selectedMuni) {
//     return dataMuni.reduce((list: Array<JSX.Element>, node: CsvDataMunicipalRow) => {
//       if (node.municipal === selectedMuni) {
//         list.push(<MunicipalRow node={node} key={node.site_oid} dispatch={dispatch} />);
//       }
//       return list;
//     }, []);
//   }
//   return undefined;
// }

const MunicipalData: React.FC<MunicipalDataProps> = ({ data, selectedMuni, containerRef, dispatch }) => (
  <div css={wrapperStyle}>
    <div ref={containerRef} css={SearchBarStyle} />
    <ul css={ulStyle}>
      {/* adding MunicipalRow here, ends up just doubling SiteRows */}
      {/* {selectedMuni ? filterDataMuni(dataMuni, selectedMuni, dispatch) : ''} */}
      {selectedMuni ? filterData(data, selectedMuni, dispatch) : ''}
    </ul>
  </div>
);

export default MunicipalData;
export { filterData };
