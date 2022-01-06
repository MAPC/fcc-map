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
          allSitesMpClean20211231Csv {
            nodes {
              Buildable_Area__sf_
              Condo_Assessed_Value_per_Square_Foot
              ECDF
              Estimated_Capacity__all_residential_
              Estimated_Capacity__some_commercial_
              Growth_Potential_Score
              Healthy_Communities_Score
              Healthy_Watersheds_Score
              Latitude
              Longitude
              Municipal_Avg_Tax_Increase
              Municipal_Total_Tax_Increase
              Number_of_Parcels_on_Site
              Overall_Score
              Parcel_IDs
              Quintile_Category
              Site_Tax_Revenue_Change
              Submarket
              Tax_Revenue__after_retrofit_
              Tax_Revenue__before_retrofit_
              Top_Category
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
              field1
              fz100_p
              fz500_p
              highway
              id
              jobs30mincar
              jobs45mintr
              land_value
              landv_pac
              muni_id
              municipal
              municipal_rank
              openspace_p
              othr_value
              parcel_addr
              pctnonautocmt
              pub_ind
              regional_rank
              site_oid
              sitearea_sf
              station
              subregion
              subtype_id
              total_valu
              totvalpacre
              transit_typ
              type_id
              walkscore
              wetland100_p
              z2wpa_p
            }
          }
        }
      `}

      render={(data) => (
        <div css={wrapperStyle}>
          <MunicipalData
            data={data.allSitesMpClean20211231Csv.nodes}
            selectedMuni={selectedMuni}
            sitesCount={sitesCount}
            setSitesCount={setSitesCount}
            selectedSite={selectedSite}
            setSite={setSite}
            node={data.allSitesMpClean20211231Csv.nodes}
            containerRef={containerRef}
            highlightedSites={state.highlightedSites} //passing to SiteRow
            dispatch={dispatch}
            region={region}
            toggleRegion={toggleRegion}
          />
          <SearchMap
            data={data.allSitesMpClean20211231Csv.nodes}
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
