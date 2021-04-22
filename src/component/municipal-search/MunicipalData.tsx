/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';

type CsvData = {
  'site_oid': string,
  municipal: string
}

interface MunicipalDataProps {
  data: Array<CsvData>,
  selectedMuni: string|undefined,
  containerRef: React.RefObject<HTMLInputElement>,
}

const SearchBarStyle = css`
  .mapboxgl-ctrl-geocoder {
    width: 40rem;
  }
`;

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

const MunicipalData: React.FC<MunicipalDataProps> = ({ data, selectedMuni, containerRef }) => (
  <React.Fragment>
    <div ref={containerRef} css={SearchBarStyle} />
    <ul>
      {selectedMuni ? filterData(data, selectedMuni) : ''}
    </ul>
  </React.Fragment>
);

export default MunicipalData;
export { filterData };
