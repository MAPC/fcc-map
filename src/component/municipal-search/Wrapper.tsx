/** @jsx jsx */

import React, { useState, useRef } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { jsx, css } from '@emotion/react';
import { themeColors } from '../../utils/theme';
import MunicipalData from './MunicipalData';
import SearchMap from './SearchMap';

const wrapperStyle = css`
  background: ${themeColors.gossamer};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3.5rem 5rem;
`;

const Wrapper: React.FC = () => {
  const [selectedMuni, setMuni] = useState<string|undefined>();
  const containerRef = useRef<HTMLInputElement>(null);
  return (
    <StaticQuery
      query={graphql`
        query TabularSiteData {
          allSiteSuitabilityV2QuintilesCsv(filter: {Top_Quartile: {eq: "TRUE"}}) {
            nodes {
              site_oid
              municipal
            }
          }
        }
      `}
      render={(data) => (
        <div css={wrapperStyle}>
          <MunicipalData data={data.allSiteSuitabilityV2QuintilesCsv.nodes} selectedMuni={selectedMuni} containerRef={containerRef} />
          <SearchMap selectedMuni={selectedMuni} setMuni={setMuni} containerRef={containerRef} />
        </div>
      )}
    />
  );
};

export default Wrapper;
