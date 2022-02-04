/** @jsx jsx */

import React, {
  useRef, useState, useCallback, useEffect, useMemo
} from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import ReactMapGL, { Source, Layer, NavigationControl, Popup, GeolocateControl } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { CsvData } from './MunicipalData';
import municipalities from '../../utils/municipalities';

interface MunicipalMapProps {
  containerRef: React.RefObject<HTMLInputElement>,
  data: Array<CsvData>,
  dispatch: React.Dispatch<unknown>,
  highlightedSites: Array<number|number>
  region: boolean,
  selectedMuni: string|undefined,
  selectedSite: any,
  setMuni: React.Dispatch<React.SetStateAction<string|undefined>>,
  setSite: React.Dispatch<React.SetStateAction<any>>,
  toggleRegion: React.Dispatch<React.SetStateAction<boolean>>
}

const navigationStyle = css`
  bottom: 4.2rem;
  position: absolute;
  right: 1rem;
`;

const mapStyle = css`
  position: absolute;
  top: 0;
`;

const inputStyle = css`
  z-index: 2;
`;

const popupStyle = css`
  padding: 0 0.4rem;
  h1 {
    font-size: 1.8rem;
  }
  h2 {
    font-size: 1.4rem;
    text-transform: lowercase;
  }
  h2:first-letter,
  h2:first-line {
    text-transform: capitalize;
  }
`;

function handleClick(e: Array<mapboxgl.EventData>): string {
  const muniPolygon = e.find((feature) => feature.layer.id === 'Municipal highlight');
  if (muniPolygon) {
    return muniPolygon.properties.municipal;
  }
  return '';
}

const SearchMap: React.FC<MunicipalMapProps> = ({ data, selectedMuni, dispatch, setMuni, selectedSite, setSite, containerRef, highlightedSites, region, toggleRegion }) => {
  const mapRef: any = useRef<mapboxgl.Map | null | undefined>();

  useEffect(() => {
    if (mapRef && mapRef.current) {
      const map = mapRef.current.getMap();
      map?.on('load', () => {
        map?.moveLayer('state-label');
        map?.moveLayer('settlement-minor-label');
        map?.moveLayer('settlement-major-label');
      });
    }
  }, []);

  const [viewport, setViewport] = useState({
    latitude: 42.368020,
    longitude: -71.211580,
    zoom: 8.85,
    transitionDuration: 1000
  });

  const [showPopup, togglePopup] = useState<boolean>(false);
  const [lngLat, setLngLat] = useState<any>();
  const [popupSite, setPopupSite] = useState<any>();

  const handleViewportChange = useCallback(
    (viewport) => setViewport(viewport), [],
  );

  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    toggleRegion(false);
    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);

  const bold = css`
    font-weight: 600;
    padding-right: 2px;
    color: black;
  `;

  function parseDouble(input: number): string {
    return input.toFixed(2);
  }

  function ordinalSuffix(i: number): string {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
  }

  return (
    <div css={mapStyle}>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        width="100vw"
        height="100vh"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken="pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg"
        mapStyle="mapbox://styles/ihill/cknj7cvb513e317rxm4a8i9ah"
        scrollZoom={true}
        onLoad={() => {
            toggleRegion(true);
            setMuni(undefined);
            setViewport({
              ...viewport,
              longitude: -71.211580, latitude: 42.368020, transitionDuration: 1000
            })
        }}
        onClick={(e) => {
          if (selectedMuni === undefined) {
            toggleRegion(false);
            setSite(false);
            setMuni(handleClick(e.features));
          } else if (e.features && e.features.find((row) => row.sourceLayer === "Sites_digital_2022_01_10_try")) {
            toggleRegion(false);
            setSite(e.features.find((row) => row.sourceLayer === "Sites_digital_2022_01_10_try").properties);  
            setMuni(e.features.find((row) => row.sourceLayer === "Sites_digital_2022_01_10_try").properties.municipal);
            console.log("point properties", e.features.find((row) => row.sourceLayer === "Sites_digital_2022_01_10_try").properties);
          } else if (e.features && e.features.find((row) => row.sourceLayer === "Sites_mp_clean_2022_01_10_try-3wjmzw")) {
            toggleRegion(false);
            console.log("polygon properties", e.features.find((row) => row.sourceLayer === "Sites_mp_clean_2022_01_10_try-3wjmzw").properties);
            setSite(e.features.find((row) => row.sourceLayer === "Sites_mp_clean_2022_01_10_try-3wjmzw").properties);  
          } else if (e.features && e.features.find((row) => row.sourceLayer === "MAPC_borders-0im3ea")) {
            toggleRegion(false);
            if ((e.features.find((row) => row.sourceLayer === "MAPC_borders-0im3ea").properties.municipal) !== selectedMuni) {
              setViewport({
                ...viewport,
                longitude: e.lngLat[0], latitude: e.lngLat[1], transitionDuration: 1000
              });
            }
            setMuni(e.features.find((row) => row.sourceLayer === "MAPC_borders-0im3ea").properties.municipal);
            setSite(false);
          } else {
            toggleRegion(true);
            setSite(false);
            setMuni(undefined);
            setViewport({
              ...viewport,
              longitude: e.lngLat[0], latitude: e.lngLat[1], transitionDuration: 1000
            });
          }
        }}
        onHover={(e) => {          
          if (e.features && e.features.find((row) => row.sourceLayer === "Sites_digital_2022_01_10_try")) {
            setLngLat(e.lngLat);
            togglePopup(true);
            setPopupSite(e.features.find((row) => row.sourceLayer === "Sites_digital_2022_01_10_try").properties);
          } else {
            togglePopup(false);
          }
        }}
      >
        <Geocoder
          css={inputStyle}
          containerRef={containerRef}
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken="pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg"
          types="place"
          bbox={useMemo(() => ([-71.66866501431952, 41.97523050594343, -70.53487628480008, 42.74357855916575]), [])}
          filter={useCallback((item) => {
            if (municipalities.find(row => item.place_name.includes(`${row}, Massachusetts`))) {
              return true
            }
            return false;
          }, [])}
          onResult={useCallback((e) => {
            if (e.result.text === 'Manchester-by-the-Sea') {
              setMuni('Manchester')
            } else {              
              setMuni(e.result.text)
            }
          }, [])}
          marker={false}
          placeholder="Search for a municipality"
          // value={selectedMuni}
        />
        {popupSite?.municipal === selectedMuni ? 
          showPopup && (
            <Popup
              latitude={lngLat[1]}
              longitude={lngLat[0]}
              closeButton={false}
              onClose={() => togglePopup(false)}
              anchor="top"
            >
              <div css={popupStyle}>
                <h2>{popupSite?.parcel_addr}</h2>
                <h1>{popupSite?.municipal} | Site {popupSite?.site_oid}</h1>
                <p><span css={bold}>{parseDouble(+popupSite?.["Overall Score"])}/4</span> Overall Score</p> 
                <p><span css={bold}>{ordinalSuffix(+popupSite?.municipal_rank)}</span> in {popupSite?.municipal}</p>
                <p><span css={bold}>{ordinalSuffix(+popupSite?.regional_rank)}</span> in the Region</p>
              </div>
            </Popup>
          )
          : !showPopup 
        }
        <Source id="Municipalities" type="vector" url="mapbox://ihill.763lks2o">
          <Layer
            type="fill"
            id="Municipal highlight"
            source="Municipalities"
            source-layer="MAPC_borders-0im3ea"
            paint={{
              'fill-color': selectedMuni ? [
                'match',
                ['get', 'municipal'],
                [`${selectedMuni}`],
                'hsla(0, 0%, 0%, 0)', // if selectedMuni, no overlay
                'hsla(0, 0%, 0%, 0.2)'
              ]
              : 'hsla(0, 0%, 0%, 0)'
            }}
          />
        </Source>
        <Source id="Sites_polygons" type="vector" url="mapbox://ihill.8x938bsn">
          <Layer
            type="fill"
            id="Sites (fill)"
            source="Sites_polygons"
            source-layer="Sites_mp_clean_2022_01_10_try-3wjmzw"
            paint={{
              'fill-opacity':
              [
                'interpolate',
                ['linear'],
                ['zoom'],
                10,
                0,
                14,
                0.6,
              ],
              'fill-color': selectedMuni ? [
                'match',
                ['get', 'municipal'],
                [`${selectedMuni}`],
                [
                  'match',
                  ['get', 'munqntile'],
                  "1", `${themeColors.quintile1}`,
                  "2", `${themeColors.quintile2}`,
                  "3", `${themeColors.quintile3}`,
                  "4", `${themeColors.quintile4}`,
                  "5", `${themeColors.quintile5}`,
                  `${themeColors.fontLightGray}`
                ],
                `${themeColors.fontLightGray}`
              ]
              :
              `${themeColors.fontLightGray}`
            }}
          /> 
        </Source>
        <Source id="Sites" type="vector" url="mapbox://ihill.cky9mrr961z0l22o0mt0om0ft-0qnzr">
          <Layer
            type="circle"
            id="Sites (circles)"
            source="Sites"
            source-layer="Sites_digital_2022_01_10_try"
            paint={{
              'circle-color': selectedMuni ? [
                'match',
                ['get', 'municipal'],
                [`${selectedMuni}`],
                [
                  'match',
                  ['get', 'munqntile'],
                  '1', `${themeColors.quintile1}`,
                  '2', `${themeColors.quintile2}`,
                  '3', `${themeColors.quintile3}`,
                  '4', `${themeColors.quintile4}`,
                  '5', `${themeColors.quintile5}`,
                  `${themeColors.fontLightGray}`
                ],
                `${themeColors.fontLightGray}`
              ]
              : 
              [
                'match',
                ['get', 'munqntile'],
                '1', `${themeColors.quintile1}`,
                '2', `${themeColors.quintile2}`,
                '3', `${themeColors.quintile3}`,
                '4', `${themeColors.quintile4}`,
                '5', `${themeColors.quintile5}`,
                `${themeColors.fontLightGray}`
              ], 
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                8,
                3,
                12,
                6
              ]
            }}
          />
        </Source>
        <Source id="Sites_highlight" type="vector" url="mapbox://ihill.8x938bsn">
          <Layer
            type="line"
            id="Sites (highlight)"
            source="Sites_highlight"
            source-layer="Sites_mp_clean_2022_01_10_try-3wjmzw"
            paint={{
              'line-width':
              [
                'interpolate',
                ['linear'],
                ['zoom'],
                8, 
                15, 
                16, 
                5,
              ],
              'line-color': `${themeColors.gold}`,
              'line-opacity': highlightedSites.length > 0 ? [
                'match',
                ['get', 'site_oid'],
                [`${highlightedSites}`],
                1,
                0
              ]
              : 0
            }}
          /> 
        </Source>
        <div css={navigationStyle}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    </div>
  );
};

export default SearchMap;
