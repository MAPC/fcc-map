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
  margin: 4.5rem 0 5rem 0;
`;

const Wrapper: React.FC = () => {
  const [selectedMuni, setMuni] = useState<string|undefined>();
  const containerRef = useRef<HTMLInputElement>(null);
  return (
    <StaticQuery
      query={graphql`
        query TabularSiteData {
          allSitesQuintilesCsv(filter: {top_quintile: {eq: "TRUE"}}) {
            nodes {
              site_oid
              municipal
              Growth_Potential_Score
              Healthy_Communtiies_Score
              Healthy_Watersheds_Score
              Travel_Choices_Score
              Overall_Score
            }
          }
        }
      `}
      render={(data) => (
        <div css={wrapperStyle}>
          <MunicipalData data={data.allSitesQuintilesCsv.nodes} selectedMuni={selectedMuni} containerRef={containerRef} />
          <SearchMap selectedMuni={selectedMuni} setMuni={setMuni} containerRef={containerRef} />
        </div>
      )}
    />
  );
};

export default Wrapper;
