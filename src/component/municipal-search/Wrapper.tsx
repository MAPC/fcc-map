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
    <StaticQuery
      query={graphql`
        {
          allSitesDigital20220110Csv {
            nodes {
              Estimated_Capacity__all_residential_
              Estimated_Capacity__some_commercial_
              FAR_after_retrofit
              FAR_mixed_after_retrofit
              Growth_Potential_Score
              Healthy_Communities_Score
              Healthy_Watersheds_Score
              Latitude
              Longitude
              Number_of_Parcels_on_Site
              Overall_Score
              Parcel_IDs
              Quintile_Category
              Site_Tax_Revenue_Change
              Submarket
              Tax_Revenue__after_retrofit_
              Travel_Choices_Score
              aulsite_p
              bldg_value
              bldlnd_rat
              buildarea_ac
              busstop
              ch21e_p
              commtype
              county
              disttosewerft
              excluded_p
              far_pre
              field1
              fz100_p
              fz500_p
              highway
              id
              imppreac
              jobs30mincar
              jobs45mintr
              land_value
              landv_pac
              muni_id
              municipal
              municipal_rank
              munpctile
              munqntile
              openspace_p
              othr_value
              parcel_addr
              pavear_ac
              pctnonautocmt
              pub_ind
              regional_rank
              regipctile
              site_oid
              sitearea_ac
              statname
              stattyp
              subregion
              subtype_id
              top10muni
              total_valu
              totvalpacre
              transit_typ
              type_id
              walkscore
              wetland100_p
              yr_built
              z2wpa_p
            }
          }
        }
      `}

      render={(data) => (
        <div css={wrapperStyle}>
          <MunicipalData
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
          />
          <SearchMap
            data={data.allSitesDigital20220110Csv.nodes}
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
      )}
    />
  );
};

export default Wrapper;
