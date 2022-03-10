/** @jsx jsx */

import React, {
  useRef, useState, useCallback, useEffect, useMemo
} from 'react';
import { jsx, css } from '@emotion/react';
import ReactMapGL, { Source, Layer, NavigationControl, Popup, GeolocateControl } from 'react-map-gl';
import Legend from './Legend';

const navigationStyle = css`
  bottom: 4.2rem;
  position: absolute;
  right: 1rem;
`;

const mapStyle = css`
  height: 100vh;
  position: absolute;
  top: 0;
`;

const legendContainer = css`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: end;
  position: absolute;
  width: 100%;
`;

const popupStyle = css`
  padding: 0 0.4rem;
  h2 {
    font-size: 1.4rem;
    margin: 0.2rem;
  }
`;

const SearchMap: React.FC = () => {
  const mapRef: any = useRef<mapboxgl.Map | null | undefined>();

  useEffect(() => {
    if (mapRef && mapRef.current) {
      const map = mapRef.current.getMap();

    }
  }, []);

  const [viewport, setViewport] = useState({
    latitude: 42.41722,
    longitude: -71.02446,
    zoom: 12.4,
    transitionDuration: 1000
  });

  const [showPopup, togglePopup] = useState<boolean>(false);
  const [lngLat, setLngLat] = useState<any>();
  const [popupSite, setPopupSite] = useState<any>();

  const [comcast, toggleComcast] = useState<boolean>(true);
  const [netblazr, toggleNetblazr] = useState<boolean>(true);
  const [rcn, toggleRcn] = useState<boolean>(true);
  const [starry, toggleStarry] = useState<boolean>(true);
  

  const handleViewportChange = useCallback(
    (viewport) => setViewport(viewport), [],
  );

  function parseTechCode (techCode: string) {
    switch (techCode) {
      case "42":
      case "43":
      return "Cable";
      break;
      case "42,50":
      return "Cable & Fiber";
      break;
      case "50":
      return "Fiber";
      break;
      case "70":
      return "Wireless";
      break;
      default: return "";
    }
  }

  return (
    <div css={mapStyle}>
      <div css={legendContainer}>
        <Legend 
          comcast={comcast}
          toggleComcast={toggleComcast}
          netblazr={netblazr}
          toggleNetblazr={toggleNetblazr}
          rcn={rcn}
          toggleRcn={toggleRcn}
          starry={starry}
          toggleStarry={toggleStarry}
        />
      </div>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        width="100vw"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken="pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg"
        mapStyle="mapbox://styles/ihill/ckzn61agl000c14qjecumnu8o"
        scrollZoom={false}
        onHover={(e) => {          
          if (e.features && e.features.find((row) => row.sourceLayer === "broadband_providers_block10_v-djgyr6")) {
            if (comcast && e.features.find((row) => row.sourceLayer === "broadband_providers_block10_v-djgyr6").properties.Comcast !== undefined) {
              setLngLat(e.lngLat);
              togglePopup(true);
              setPopupSite(e.features.find((row) => row.sourceLayer === "broadband_providers_block10_v-djgyr6").properties);
            } else if (netblazr && e.features.find((row) => row.sourceLayer === "broadband_providers_block10_v-djgyr6").properties.netBlazr !== undefined) {
              setLngLat(e.lngLat);
              togglePopup(true);
              setPopupSite(e.features.find((row) => row.sourceLayer === "broadband_providers_block10_v-djgyr6").properties);
            } else if (rcn && e.features.find((row) => row.sourceLayer === "broadband_providers_block10_v-djgyr6").properties.RCN !== undefined) {
              setLngLat(e.lngLat);
              togglePopup(true);
              setPopupSite(e.features.find((row) => row.sourceLayer === "broadband_providers_block10_v-djgyr6").properties);
            } else if (starry && e.features.find((row) => row.sourceLayer === "broadband_providers_block10_v-djgyr6").properties.Starry !== undefined) {
              setLngLat(e.lngLat);
              togglePopup(true);
              setPopupSite(e.features.find((row) => row.sourceLayer === "broadband_providers_block10_v-djgyr6").properties);
            } else {
              togglePopup(false);
            }
          } else {
            togglePopup(false);
          }
        }}
      >
        {popupSite ? 
          showPopup && (
            <Popup
              latitude={lngLat[1]}
              longitude={lngLat[0]}
              closeButton={false}
              onClose={() => togglePopup(false)}
              anchor="top"
            >
              <div css={popupStyle}>
                <h2>{comcast && popupSite?.Comcast !== undefined ? "Comcast: " + parseTechCode(popupSite?.Comcast) : ""}</h2>
                <h2>{netblazr && popupSite?.netBlazr !== undefined ? "netBlazr: " + parseTechCode(popupSite?.netBlazr) : ""}</h2>
                <h2>{rcn && popupSite?.RCN !== undefined ? "RCN: " + parseTechCode(popupSite?.RCN) : ""}</h2>
                <h2>{starry && popupSite?.Starry !== undefined ? "Starry: " + parseTechCode(popupSite?.Starry) : ""}</h2>
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
              'fill-color': [
                'match',
                ['get', 'municipal'],
                'Chelsea',
                'hsla(0, 0%, 0%, 0)',
                'Everett',
                'hsla(0, 0%, 0%, 0)',
                'Revere',
                'hsla(0, 0%, 0%, 0)',
                'hsla(0, 0%, 0%, 0.4)' // if not one of our three munis, overlay
              ]
            }}
          />
        </Source>
        <Source id="All Broadband" type="vector" url="mapbox://ihill.1qg5vf3o">
          <Layer
            type="fill"
            id="Comcast"
            source="All Broadband"
            source-layer="broadband_providers_block10_v-djgyr6"
            paint={{
              'fill-color': comcast ? [
                'match',
                ['get', 'Comcast'],
                '43',
                'blue',
                'hsla(0, 0%, 0%, 0)'
              ] : 'hsla(0, 0%, 0%, 0)',
              'fill-opacity': 0.25
            }}
          />
          <Layer
            type="fill"
            id="netBlazr"
            source="All Broadband"
            source-layer="broadband_providers_block10_v-djgyr6"
            paint={{
              'fill-color': netblazr ? [
                'match',
                ['get', 'netBlazr'],
                '70',
                'blue',
                'hsla(0, 0%, 0%, 0)'
              ] : 'hsla(0, 0%, 0%, 0)',
              'fill-opacity': 0.25
            }}
          />
          <Layer
            type="fill"
            id="RCN"
            source="All Broadband"
            source-layer="broadband_providers_block10_v-djgyr6"
            paint={{
              'fill-color': rcn ? [
                'match',
                ['get', 'RCN'],
                '42',
                'blue',
                '50',
                'blue',
                '42,50',
                'blue',
                'hsla(0, 0%, 0%, 0)'
              ] : 'hsla(0, 0%, 0%, 0)',
              'fill-opacity': 0.25
            }}
          />
          <Layer
            type="fill"
            id="Starry"
            source="All Broadband"
            source-layer="broadband_providers_block10_v-djgyr6"
            paint={{
              'fill-color': starry ? [
                'match',
                ['get', 'Starry'],
                '70',
                'blue',
                '70,50',
                'blue',
                'hsla(0, 0%, 0%, 0)'
              ] : 'hsla(0, 0%, 0%, 0)',
              'fill-opacity': 0.25
            }}
          />
        </Source>
        <Source id="All Blocks" type="vector" url="mapbox://ihill.4rxyz9qn">
          <Layer
            type="line"
            id="Blocks (border)"
            source="Blocks"
            source-layer="blocks_chelsea_everett_revere-ak2dce"
            paint={{
              'line-color': 'slategray',
              'line-width': 0.5
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
