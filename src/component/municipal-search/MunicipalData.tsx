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

const MunicipalData: React.FC<MunicipalDataProps> = ({ data, selectedMuni }) => {
  const displayedMuniData = data.filter((node) => node.municipal === selectedMuni);
  return (
    <React.Fragment>
      <h3>{selectedMuni ? selectedMuni : 'Select a municipality'}</h3>
      <ul>
        {/* {displayedMuniData ? displayedMuniData.map((node) => <li key={node.site_oid}>{node.site_oid}</li>) : ''} */}
      </ul>
    </React.Fragment>
  );
};

export default MunicipalData;
