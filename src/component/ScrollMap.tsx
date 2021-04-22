/** @jsx jsx */

import React, { useEffect, useRef } from 'react';
import { css, jsx } from '@emotion/react';
import ReactMapGL, { Source, Layer, FlyToInterpolator } from 'react-map-gl';

interface MapProps {
  currentPanel: number,
  viewport: {
    latitude: number,
    longitude: number,
    zoom: number
  },
  setViewport: React.Dispatch<React.SetStateAction<{
    latitude: number;
    longitude: number;
    zoom: number;
  }>>
}

const ScrollMap: React.FC<MapProps> = ({ currentPanel, viewport, setViewport }) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const map = mapRef.current;
    map?.on('load', () => {
      map?.moveLayer('state-label');
      map?.moveLayer('settlement-minor-label');
      map?.moveLayer('settlement-major-label');
    });
  }, []);

  const assignRef = (ref: ReactMapGL | null) => {
    mapRef.current = ref && ref.getMap();
  };

  return (
    <div
      css={css`
      max-height: 100vh;
      position: sticky;
      right: 0;
      top: 0;
    `}
    >
      <ReactMapGL
        {...viewport}
        ref={(ref) => assignRef(ref)}
        transitionDuration={1000}
        transitionInterpolator={new FlyToInterpolator()}
        width="755px"
        height="100%"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken="pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg"
        mapStyle="mapbox://styles/ihill/ckmxwp00t19at18mrkhfgj255"
        scrollZoom={false}
        dragPan={false}
        dragRotate={false}
        doubleClickZoom={false}
        touchZoom={false}
        touchRotate={false}
        keyboard={false}
      >
        <Source id="Sites" type="vector" url="mapbox://ihill.0a4w5d52">
          <Layer
            type="circle"
            id="Sites (circles)"
            source="Sites"
            source-layer="retrofit_site_pts-3ot9ol"
            paint={{
              'circle-color': [
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
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                8,
                2.5,
                12,
                7,
              ]
            }}
            layout={{ visibility: currentPanel === 1 ? 'visible' : 'none' }}
          />
        </Source>
        <Source id="Parcels" type="vector" url="mapbox://ihill.2yxozn9p">
          <Layer
            type="fill"
            id="Sites (parcels)"
            source="Parcels"
            source-layer="retrofit_site_geo-cvc0x0"
            paint={{ 'fill-color': '#b3b3b3' }}
            layout={{ visibility: currentPanel === 0 ? 'visible' : 'none' }}
          />
        </Source>
      </ReactMapGL>
    </div>
  );
};

export default ScrollMap;
