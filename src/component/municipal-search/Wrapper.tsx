/** @jsx jsx */

import React, { useState, useRef, useReducer } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { jsx, css } from '@emotion/react';
import { themeColors } from '../../utils/theme';
import MunicipalData from './MunicipalData';
import SearchMap from './SearchMap';

const wrapperStyle = css`
  background: ${themeColors.gossamer};
  height: 100vh;
  margin: 0;
  padding: 0;
  width: 100vw;
`;

type MunicipalSearch = {
  highlightedSites: Array<number|undefined>,
}

const initialState: MunicipalSearch = {
  highlightedSites: []
}

function reducer(state: MunicipalSearch, action: any) {
  switch(action.type) {
    case 'addSite':
      if (state.highlightedSites.find(site => site === action.toggledSite)) {
        return {...state, highlightedSites: state.highlightedSites.filter(item => item !== action.toggledSite)}
      }
      return {...state, highlightedSites: [...state.highlightedSites, action.toggledSite]};
    default:
      return {...state};
  }
}

const Wrapper: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedMuni, setMuni] = useState<string|undefined>();
  const [sitesCount, setSitesCount] = useState<number|undefined>(0);
  const [selectedSite, setSite] = useState<any>();
  const containerRef = useRef<HTMLInputElement>(null);
  const [region, toggleRegion] = useState<boolean>(true);
  return (
    <div css={wrapperStyle}>
      {/* <MunicipalData
        data={data.allSitesDigital20220110Csv.nodes}
        selectedMuni={selectedMuni}
        sitesCount={sitesCount}
        setSitesCount={setSitesCount}
        selectedSite={selectedSite}
        setSite={setSite}
        node={data.allSitesDigital20220110Csv.nodes}
        containerRef={containerRef}
        highlightedSites={state.highlightedSites} //passing to SiteRow
        dispatch={dispatch}
        region={region}
        toggleRegion={toggleRegion}
      /> */}
      <SearchMap
        // data={data.allSitesDigital20220110Csv.nodes}
        selectedMuni={selectedMuni}
        setMuni={setMuni}
        selectedSite={selectedSite}
        setSite={setSite}
        containerRef={containerRef}
        highlightedSites={state.highlightedSites}
        dispatch={dispatch}
        region={region}
        toggleRegion={toggleRegion}
      />
    </div>
  );
};

export default Wrapper;
