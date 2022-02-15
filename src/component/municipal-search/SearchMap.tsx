/** @jsx jsx */

import React, {
  useRef, useState, useCallback, useEffect, useMemo
} from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import ReactMapGL, { Source, Layer, NavigationControl, Popup, GeolocateControl } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import municipalities from '../../utils/municipalities';

interface MunicipalMapProps {
  containerRef: React.RefObject<HTMLInputElement>,
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

const SearchMap: React.FC<MunicipalMapProps> = () => {
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
    latitude: 42.41722,
    longitude: -71.02446,
    zoom: 12.4,
    transitionDuration: 1000
  });

  const [showPopup, togglePopup] = useState<boolean>(false);
  const [lngLat, setLngLat] = useState<any>();
  const [popupSite, setPopupSite] = useState<any>();

  const [homeFiber, toggleHomeFiber] = useState<boolean>(true);
  const [allTech, toggleAllTech] = useState<boolean>(true);

  const handleViewportChange = useCallback(
    (viewport) => setViewport(viewport), [],
  );

  function parseTechCode (techCode: string) {
    switch (techCode) {
      case "42":
      case "43":
      console.log("Cable");
      return "Cable";
      break;
      case "50":
      console.log("Fiber");
      return "Fiber";
      break;
      case "70":
      console.log("Wireless");
      return "Wireless";
      break;
      default:
      console.log("other");  
    }
  }

  return (
    <div css={mapStyle}>
      <div className="radio-buttons">
        <input type="radio" value="Fiber" name="Fiber" onClick={() => toggleHomeFiber(!homeFiber)} /> Fiber
        <input type="radio" value="Fiber, Wireless, and Cable" name="Fiber, Wireless, and Cable" onClick={() => toggleAllTech(!allTech)} /> Fiber, Wireless, and Cable
      </div>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        width="100vw"
        height="100vh"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken="pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg"
        // mapStyle="mapbox://styles/ihill/ckzmwlj7a000814p5udbl3din"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        scrollZoom={true}
        // onLoad={() => {
        //     setViewport({
        //       ...viewport,
        //       longitude: -71.211580, latitude: 42.368020, transitionDuration: 1000
        //     })
        // }}
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
                <h2>{popupSite?.ProviderName}</h2>
                <h2>{parseTechCode(popupSite?.TechCode)}</h2>
                <h2>Provider Distinct Count: {popupSite?.Nmbr__P}</h2>
                <h2>Providers: {popupSite?.Prvdr_1} <br/>{popupSite?.Prvdr_2} <br/>{popupSite?.Prvdr_3} <br/>{popupSite?.Prvdr_4} <br/>{popupSite?.Prvdr_5} <br/>{popupSite?.Prvdr_6}</h2>
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
        <Source id="Fiber, Wireless, Cable" type="vector" url="mapbox://ihill.arnam9d2">
          <Layer
            type="fill"
            id="Fiber, Wireless, Cable (fill)"
            source="Fiber, Wireless, Cable"
            source-layer="broadband_providers_block10_w-8cfm1t"
            paint={{
              'fill-color': 'blue',
              'fill-opacity': allTech ? [
                'match',
                ['get', 'Nmbr__P'],
                1,
                0.1,
                2,
                0.2,
                3,
                0.3,
                4,
                0.5,
                5,
                0.7,
                6,
                0.9,
                0
              ] : 0
            }}
          />
        </Source>
        <Source id="Home Fiber" type="vector" url="mapbox://ihill.4cew0qe1">
          <Layer
            type="fill"
            id="Home Fiber (fill)"
            source="Home Fiber"
            source-layer="fcc_fiber_rcn_starry_wgs84-crdtpq"
            paint={{
              'fill-color': 'pink',
              'fill-opacity': homeFiber ? 1 : 0,
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
