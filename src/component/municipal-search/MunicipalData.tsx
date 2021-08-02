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
  muni_id: string //added
}

interface MunicipalDataProps {
  data: Array<CsvData>,
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
  max-height: 70.5rem;
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

const MunicipalData: React.FC<MunicipalDataProps> = ({ data, selectedMuni, containerRef, dispatch }) => (
  <div css={wrapperStyle}>
    <div ref={containerRef} css={SearchBarStyle} />
    <ul css={ulStyle}>
      {selectedMuni ? filterData(data, selectedMuni, dispatch) : ''}
    </ul>
  </div>
);

export default MunicipalData;
export { filterData };
