/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import SiteRow from './SiteRow';
import MunicipalRow from './MunicipalRow';
import { themeColors, fonts } from '../../utils/theme';

export type CsvData = {
  site_oid: string,
  municipal: string,
  Growth_Potential_Score: string,
  Healthy_Communtiies_Score: string,
  Healthy_Watersheds_Score: string,
  Travel_Choices_Score: string,
  Overall_Score: string,
  Tax_Revenue_Differential: string //added for MunicipalRow
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
      if (node.municipal === selectedMuni) {
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
      if (node.municipal === selectedMuni) {
        list.push(<MunicipalRow data={data} selectedMuni={selectedMuni} />);
      }
      return list;
    }, []);
  }
  return undefined;
}

// //  iterating through sites' tax differentials and returning the sum
// var taxDifferentials: Array<number> = [];
// var sum: number = 0;
// function getTax(data: Array<CsvData>, selectedMuni: string|undefined, taxDifferentials: Array<number>): number {
//   // if (selectedMuni) 
//     sum = 0; //reset value of sum for new municipality selection 
//     data.reduce((taxDifferentials: Array<number>, node: CsvData) => {
//       if (node.municipal === selectedMuni) {
//         taxDifferentials.push(parseInt(node.Tax_Revenue_Differential));
//       }
//       return taxDifferentials;
//     }, taxDifferentials);    
//   // } 
//   // loop through each site's tax differentials and add
//   for (let index = 0; index < taxDifferentials.length; index++) {
//     sum = sum + taxDifferentials[index];
//   }
//   console.log('sum: ', sum);
//   console.log(selectedMuni)
//   return sum;
// }

const MunicipalData: React.FC<MunicipalDataProps> = ({ data, selectedMuni, containerRef, dispatch }) => (
  <div css={wrapperStyle}>
    <div ref={containerRef} css={SearchBarStyle} />
    {/* {selectedMuni ? getTax(data, selectedMuni, taxDifferentials) : ''} gets tax on municipality selection */}
    {selectedMuni ? showMunicipalRow(data, selectedMuni) : ''} {/* renders the MunicipalRow on municipality selection */}
    <ul css={ulStyle}>
      {selectedMuni ? filterData(data, selectedMuni, dispatch) : ''}
    </ul>
  </div>
);

export default MunicipalData;
export { filterData };
// export { showMunicipalRow };
