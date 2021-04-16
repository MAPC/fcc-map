/** @jsx jsx */

import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { jsx, css } from '@emotion/react';
import MunicipalData from './MunicipalData';
import Map from './Map';

const wrapperStyle = css`
  display: flex;
  flex-direction: row;
`;

const Wrapper: React.FC = () => {
  const [selectedMuni, setMuni] = useState<string|undefined>();
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
        <React.Fragment>
          <h2 id="municipal">Temp Header - Municipal Search</h2>
          <div css={wrapperStyle}>
            <MunicipalData data={data.allSiteSuitabilityV2QuintilesCsv.nodes} selectedMuni={selectedMuni} />
            <Map selectedMuni={selectedMuni} setMuni={setMuni} />
          </div>
        </React.Fragment>
      )}
    />
  );
};

export default Wrapper;
