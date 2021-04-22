/** @jsx jsx */

import React, { useEffect, useRef, useState } from 'react';
import { css, jsx } from '@emotion/react';
import ReactMapGL, { Source, Layer, FlyToInterpolator } from 'react-map-gl';
import { themeColors, marginStyle } from '../utils/theme';

const wrapperStyle = css`
  ${marginStyle}
  margin-bottom: 5rem;
`;

const h2Style = css`
  color: ${themeColors.indigo};
  font-size: 3.6rem;
`;

const Explore: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const [viewport, setViewport] = useState({
    latitude: 42.329755482312734,
    longitude: -71.09049350120513,
    zoom: 8.4,
  });

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
    <div css={wrapperStyle}>
      <h2 css={h2Style}>Explore</h2>
      <ReactMapGL
          {...viewport}
          ref={(ref) => assignRef(ref)}
          width="100%"
          height="60rem"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapboxApiAccessToken="pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg"
          mapStyle="mapbox://styles/ihill/ckmxwp00t19at18mrkhfgj255"
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
                3,
                12,
                7,
              ],
            }}
            />
          </Source>
        </ReactMapGL>
    </div>
  )
};

export default Explore;
