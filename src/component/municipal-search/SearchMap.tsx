/** @jsx jsx */

import React, {
  useRef, useState, useCallback, useEffect, useMemo
} from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import ReactMapGL, { Source, Layer, NavigationControl, Popup, GeolocateControl } from 'react-map-gl';
import municipalities from '../../utils/municipalities';

export type CsvData = {
  GEOID: string,
  NumPrv: string,
  Comcast: string,
  netBlazr: string,
  RCN: string,
  Starry: string
}

interface MunicipalMapProps {
  containerRef: React.RefObject<HTMLInputElement>,
  data: Array<CsvData>,
  dispatch: React.Dispatch<unknown>,
  providers: Array<string|string>
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

const SearchMap: React.FC<MunicipalMapProps> = ({containerRef, data, dispatch, providers}) => {
  const mapRef: any = useRef<mapboxgl.Map | null | undefined>();

  useEffect(() => {
    if (mapRef && mapRef.current) {
      const map = mapRef.current.getMap();
      // map?.on('load', () => {
      //   map?.moveLayer('state-label');
      //   map?.moveLayer('settlement-minor-label');
      //   map?.moveLayer('settlement-major-label');
      // });
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

  const [fiberOnly, toggleFiberOnly] = useState<boolean>(false);
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
      <div className="radio-buttons">
        <div>
          <label>
            <input type="checkbox" name="Fiber" checked={fiberOnly ? true : false} onChange={() => {
              toggleFiberOnly(!fiberOnly);
              if (fiberOnly) {
                toggleComcast(true);
                toggleNetblazr(true);
                toggleRcn(true);
                toggleStarry(true);
              } else if (!fiberOnly) {
                toggleComcast(false);
                toggleNetblazr(false);
                toggleRcn(true);
                toggleStarry(true);
              }
            }} />
            Fiber Only
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="Comcast" checked={comcast ? true : false} onChange={() => toggleComcast(!comcast)} /> 
            Comcast
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" value="" name="netBlazr" checked={netblazr ? true : false} onChange={() => toggleNetblazr(!netblazr)} />
            netBlazr
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" value="" name="RCN" checked={rcn ? true : false} onChange={() => toggleRcn(!rcn)} /> 
            RCN
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" value="" name="Starry" checked={starry ? true : false} onChange={() => toggleStarry(!starry)} /> 
            Starry
          </label>
        </div>
      </div>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        width="100vw"
        height="100vh"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken="pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        scrollZoom={true}
        onHover={(e) => {          
          if (e.features && e.features.find((row) => row.sourceLayer === "fcc_fiber_rcn_starry_wgs84-crdtpq")) {
            setLngLat(e.lngLat);
            togglePopup(true);
            setPopupSite(e.features.find((row) => row.sourceLayer === "fcc_fiber_rcn_starry_wgs84-crdtpq").properties);
            console.log(e.features.find((row) => row.sourceLayer === "fcc_fiber_rcn_starry_wgs84-crdtpq").properties);
          } else if (e.features && e.features.find((row) => row.sourceLayer === "broadband_providers_block10_w-8cfm1t")) {
            setLngLat(e.lngLat);
            togglePopup(true);
            setPopupSite(e.features.find((row) => row.sourceLayer === "broadband_providers_block10_w-8cfm1t").properties);
            console.log(e.features.find((row) => row.sourceLayer === "broadband_providers_block10_w-8cfm1t").properties);
          } else if (e.features && e.features.find((row) => row.sourceLayer === "broadband_providers_block10_v-djgyr6")) {
            setLngLat(e.lngLat);
            togglePopup(true);
            setPopupSite(e.features.find((row) => row.sourceLayer === "broadband_providers_block10_v-djgyr6").properties);
            console.log(e.features.find((row) => row.sourceLayer === "broadband_providers_block10_v-djgyr6").properties);
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
              {
                fiberOnly ? 
                  <div css={popupStyle}>                
                    <h2>{popupSite?.ProviderName}</h2>
                    <h2>{parseTechCode(popupSite?.TechCode)}</h2>
                  </div> 
                : 
                  <div css={popupStyle}>
                    <h2>{comcast && popupSite?.Comcast !== undefined ? "Comcast " + parseTechCode(popupSite?.Comcast) : ""}</h2>
                    <h2>{netblazr && popupSite?.netBlazr !== undefined ? "netBlazr " + parseTechCode(popupSite?.netBlazr) : ""}</h2>
                    <h2>{rcn && popupSite?.RCN !== undefined ? "RCN " + parseTechCode(popupSite?.RCN) : ""}</h2>
                    <h2>{starry && popupSite?.Starry !== undefined ? "Starry " + parseTechCode(popupSite?.Starry) : ""}</h2>
                  </div>
              }
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
        <Source id="Fiber Only" type="vector" url="mapbox://ihill.4cew0qe1">
          <Layer
            type="fill"
            id="RCN Fiber (fill)"
            source="Fiber Only"
            source-layer="fcc_fiber_rcn_starry_wgs84-crdtpq"
            paint={{
              'fill-color': 'blue',
              'fill-opacity': fiberOnly && rcn ? [
                'match',
                ['get', 'ProviderName'],
                'RCN BecoCom LLC',
                0.25,
                0
              ] : 0
            }}
          />
          <Layer
            type="fill"
            id="Starry Fiber (fill)"
            source="Fiber Only"
            source-layer="fcc_fiber_rcn_starry_wgs84-crdtpq"
            paint={{
              'fill-color': 'blue',
              'fill-opacity': fiberOnly && starry ? [
                'match',
                ['get', 'ProviderName'],
                'Starry, Inc',
                0.25,
                0
              ] : 0
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
              'fill-opacity': fiberOnly ? 0 : 0.25
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
              'fill-opacity': fiberOnly ? 0 : 0.25
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
              'fill-opacity': fiberOnly ? 0 : 0.25
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
              'fill-opacity': fiberOnly ? 0 : 0.25
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
              'line-width': 1
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
