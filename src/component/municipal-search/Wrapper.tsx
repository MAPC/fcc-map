/** @jsx jsx */

import React, { useState, useRef, useReducer } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { jsx, css } from '@emotion/react';
import { themeColors } from '../../utils/theme';
import SearchMap from './SearchMap';

const wrapperStyle = css`
  background: ${themeColors.gossamer};
  height: 100vh;
  margin: 0;
  padding: 0;
  width: 100vw;
`;

type MunicipalSearch = {
  providers: Array<string|string>,
}

const initialState: MunicipalSearch = {
  providers: ["Starry"]
}

function reducer(state: MunicipalSearch, action: any) {
  switch(action.type) {
    case 'addProvider':
      if (state.providers.find(site => site === action.toggledSite)) {
        return {...state, providers: state.providers.filter(item => item !== action.toggledSite)}
      }
      return {...state, providers: [...state.providers, action.toggledSite]};
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
    <StaticQuery
      query={graphql`
        {
          allBroadbandProvidersBlock10V2Csv {
            nodes {
              GEOID
              NumPrv
              Comcast
              netBlazr
              RCN
              Starry
            }
          }
        }
      `}
      render={(data) => (
        <div css={wrapperStyle}>
          <SearchMap
            data={data.allBroadbandProvidersBlock10V2Csv.nodes}
            containerRef={containerRef}
            providers={state.providers}
            dispatch={dispatch}
          />
        </div>
      )}
    />
  );
};

export default Wrapper;
