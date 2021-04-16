/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';

type CsvData = {
  'site_oid': string,
  municipal: string
}

interface MunicipalDataProps {
  data: Array<CsvData>,
  selectedMuni: string|undefined
}

function filterData(data: Array<CsvData>, selectedMuni: string|undefined): Array<JSX.Element>|undefined {
  if (selectedMuni) {
    return data.reduce((list: Array<JSX.Element>, node: CsvData) => {
      if (node.municipal === selectedMuni) {
        list.push(<li key={node.site_oid}>{node.site_oid}</li>);
      }
      return list;
    }, []);
  }
  return undefined;
}

const MunicipalData: React.FC<MunicipalDataProps> = ({ data, selectedMuni }) => (
  <React.Fragment>
    <h3>{selectedMuni || 'Select a municipality'}</h3>
    <ul>
      {selectedMuni ? filterData(data, selectedMuni) : ''}
    </ul>
  </React.Fragment>
);

export default MunicipalData;
export { filterData };
