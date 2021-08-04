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

//  iterating through sites' tax differentials and returning the sum
// let taxDifferentials: Array<number> = [];

// function getTax(data: Array<CsvData>, selectedMuni: string|undefined, taxDifferentials: Array<number>): Array<number>|undefined {
//   if (selectedMuni) {
//     data.reduce((taxDifferentials: Array<number>, node: CsvData) => {
//       if (node.municipal === selectedMuni) {
//         taxDifferentials.push(parseInt(node.Tax_Revenue_Differential));
//       }
//       // console.log(list2);
//       // for (let index = 0; index < list2.length; index++) {
//       //   let sum = 0;
//       //   sum = sum + parseFloat(list2[index]);
//       // }
//       // console.log(taxDifferentials);

//       return taxDifferentials;
//     }, []);
//     return taxDifferentials;
//   }
//   return undefined;
// }

// console.log('returned tax differentials' + taxDifferentials)



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
function showMunicipalRow(data: Array<CsvData>, selectedMuni: string|undefined, dispatch: React.Dispatch<unknown>): Array<JSX.Element>|undefined {
  if (selectedMuni) {
    return data.reduce((list: Array<JSX.Element>, node: CsvData) => {
      if (node.municipal === selectedMuni) {
        list.push(<MunicipalRow node={node} selectedMuni={selectedMuni} dispatch={dispatch} />);
      }
      return list;
    }, []);
  }
  return undefined;
}

const MunicipalData: React.FC<MunicipalDataProps> = ({ data, selectedMuni, containerRef, dispatch }) => (
  <div css={wrapperStyle}>
    <div ref={containerRef} css={SearchBarStyle} />
    {selectedMuni ? showMunicipalRow(data, selectedMuni, dispatch) : ''} {/* renders the MunicipalRow on municipality selection */}
    <ul css={ulStyle}>
      {selectedMuni ? filterData(data, selectedMuni, dispatch) : ''}
      {/* {selectedMuni ? getTax(data, selectedMuni, taxDifferentials) : ''} */}
    </ul>
  </div>
);

export default MunicipalData;
export { filterData };
// export { showMunicipalRow };
