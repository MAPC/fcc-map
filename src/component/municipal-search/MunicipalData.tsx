/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import SiteRow from './SiteRow';
import MunicipalRow from './MunicipalRow';
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
  containerRef: React.RefObject<HTMLInputElement>,
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

function filterData(data: Array<CsvData>, selectedMuni: string|undefined, dispatch: React.Dispatch<unknown>): Array<JSX.Element>|undefined {
  if (selectedMuni) {
    return data.reduce((list: Array<JSX.Element>, node: CsvData) => {
      if (node.municipal === selectedMuni && node.Quintile_Category === '5') {
        list.push(<SiteRow node={node} key={node.site_oid} dispatch={dispatch} />);
      }
      return list;
    }, []);
  }
  return undefined;
}

// similar to filterData, grabs corresponding MunicipalRow on municipality selection 
function showMunicipalRow(data: Array<CsvData>, selectedMuni: string|undefined): Array<JSX.Element>|undefined {
  if (selectedMuni) {
    return data.reduce((list: Array<JSX.Element>, node: CsvData) => {
      if (node.municipal === selectedMuni && node.Quintile_Category === '5') {
        list.push(<MunicipalRow data={data} node={node} selectedMuni={selectedMuni} />);
      }
      return list;
    }, []);
  }
  return undefined;
}

const MunicipalData: React.FC<MunicipalDataProps> = ({ data, selectedMuni, containerRef, dispatch }) => (
  <div css={wrapperStyle}>
    <div ref={containerRef} css={SearchBarStyle} />
    {selectedMuni ? showMunicipalRow(data, selectedMuni) : ''} {/* renders the MunicipalRow on municipality selection */}
    <ul css={ulStyle}>
      {selectedMuni ? filterData(data, selectedMuni, dispatch) : ''}
    </ul>
  </div>
);

export default MunicipalData;
export { filterData };