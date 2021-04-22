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
`;

const liStyle = css`
  background: ${themeColors.warmGray};
  margin: .5rem 0;
  padding: .8rem 2rem;
`;

const titleStyle = css`
  color: ${themeColors.indigo};
  font-family: ${fonts.calibre};
  font-size: 2rem;
  font-weight: 600;
`;

function filterData(data: Array<CsvData>, selectedMuni: string|undefined): Array<JSX.Element>|undefined {
  if (selectedMuni) {
    return data.reduce((list: Array<JSX.Element>, node: CsvData) => {
      if (node.municipal === selectedMuni) {
        list.push(
          <li key={node.site_oid} css={liStyle}>
            <span css={titleStyle}>{node.site_oid}</span>
          </li>
        );
      }
      return list;
    }, []);
  }
  return undefined;
}

const MunicipalData: React.FC<MunicipalDataProps> = ({ data, selectedMuni, containerRef }) => (
  <div css={wrapperStyle}>
    <div ref={containerRef} css={SearchBarStyle} />
    <ul css={ulStyle}>
      {selectedMuni ? filterData(data, selectedMuni) : ''}
    </ul>
  </div>
);

export default MunicipalData;
export { filterData };
