/** @jsx jsx */

import React, {
  useRef, useState, useCallback, useEffect, useMemo
} from 'react';
import { jsx, css } from '@emotion/react';
import ReactMapGL, { Source, Layer, NavigationControl, Popup, GeolocateControl } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import municipalities from '../../utils/municipalities';
import { themeColors } from '../../utils/theme';
import { CsvData } from './MunicipalData'; //added

interface MunicipalMapProps {
  data: Array<CsvData>, //added
  dispatch: React.Dispatch<unknown>, //added
  selectedMuni: string|undefined,
  setMuni: React.Dispatch<React.SetStateAction<string|undefined>>,
  containerRef: React.RefObject<HTMLInputElement>,
  highlightedSites: Array<number|number>
}

const navigationStyle = css`
  bottom: 4.2rem;
  position: absolute;
  right: 1rem;
`;

const mapStyle = css`
  // flex-shrink: 0;
  position: absolute;
  top: 0;
`;

const inputStyle = css`
  z-index: 2;
`;

function handleClick(e: Array<mapboxgl.EventData>): string {
  const muniPolygon = e.find((feature) => feature.layer.id === 'Municipal highlight');
  if (muniPolygon) {
    return muniPolygon.properties.municipal;
  }
  return '';
}

const SearchMap: React.FC<MunicipalMapProps> = ({ data, selectedMuni, setMuni, containerRef, highlightedSites }) => {
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
    latitude: 42.40319165277521,
    longitude: -71.10714566074827,
    zoom: 8,
    transitionDuration: 1000
  });
  const [showPopup, togglePopup] = useState<boolean>(false);
  const [lngLat, setLngLat] = useState<any>();
  const [site, setSite] = useState<any>();

  const handleViewportChange = useCallback(
    (viewport) => setViewport(viewport), [],
  );

  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000, zoom: 12 };
    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);

  // grabs user's current lat long coordinates and adjusts viewport
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((pos) => {
  //     setViewport({
  //       ...viewport,
  //       latitude: pos.coords.latitude,
  //       longitude: pos.coords.longitude,
  //       zoom: 10,
  //       transitionDuration: 1000
  //     });
  //   });
  // }, [viewport]);

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

        // loading map, attempting to set viewport to municipality
        // onLoad={(e) => {
        //   console.log('loaded');
        //     setViewport({
        //       ...viewport,
        //       longitude: -71.4328, latitude: 42.4851, zoom: 12, transitionDuration: 1000
        //     })
        // }}

        onLoad={() => {

        }}

        onClick={(e) => {
          if (e.features.find((row) => row.sourceLayer === 'retrofit_site_pts-3ot9ol')) {
            setViewport({
              ...viewport,
              longitude: e.lngLat[0], latitude: e.lngLat[1], zoom: 16, transitionDuration: 1000
            })
          } else {
            setMuni(handleClick(e.features));
            setViewport({
              ...viewport,
              longitude: e.lngLat[0], latitude: e.lngLat[1], zoom: 12, transitionDuration: 1000
            })
          }
        }}
        onHover={(e) => {
          if (e.features.find((row) => row.sourceLayer === 'retrofit_site_pts-3ot9ol')) {
            setLngLat(e.lngLat);
            togglePopup(true);
            setSite(e.features.find((row) => row.sourceLayer === 'retrofit_site_pts-3ot9ol').properties);
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
        />
        {showPopup && (
          <Popup
            latitude={lngLat[1]}
            longitude={lngLat[0]}
            closeButton={false}
            onClose={() => togglePopup(false)}
            anchor="top"
          >
            <p>{site?.municipal} site {site?.site_oid}</p>
            <p>Muni ID: {site?.muni_id}</p> {/* passed in new data here to popup*/}
          </Popup>
        )}
        <Source id="Municipalities" type="vector" url="mapbox://ihill.763lks2o">
          <Layer
            type="fill"
            id="Municipal highlight"
            source="Municipalities"
            source-layer="MAPC_borders-0im3ea"
            paint={{
              'fill-color': [
                'match',
                ['get', 'municipal'],
                [`${selectedMuni}`],
                'hsla(0, 0%, 0%, 0)',
                'hsla(0, 0%, 0%, 0.4)',
              ],
            }}
          />
        </Source>
        <Source id="Sites" type="vector" url="mapbox://ihill.0a4w5d52">
          <Layer
            type="circle"
            id="Sites (circles)"
            source="Sites"
            source-layer="retrofit_site_pts-3ot9ol"
            paint={{
              'circle-color': [
                'match',
                ['get', 'municipal'],
                [selectedMuni || ''],
                [
                'step',
                ['get', 'Overall_Sc'],
                '#FFFDA7',
                2,
                '#99f26d',
                2.5,
                '#78cd98',
                3,
                '#649abd',
                3.5,
                '#5456a0',
                ],
                'gray'
              ],
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                8,
                3,
                12,
                7,
              ],
              'circle-opacity': [
                'match', ['get', 'top20_p'],
                1,
                1, 0,
              ],
              'circle-stroke-color': highlightedSites.length > 0 ? [
                'match',
                ['get', 'site_oid'],
                highlightedSites,
                '#FDB525',
                'rgba(0, 0, 0, 0)'
              ]
              : 'rgba(0, 0, 0, 0)',
              'circle-stroke-width': 3
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
