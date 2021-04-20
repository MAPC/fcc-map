/** @jsx jsx */

import React, {
  useRef, useReducer, useCallback, useEffect,
} from 'react';
import { jsx, css } from '@emotion/react';
import ReactMapGL, { Source, Layer, NavigationControl } from 'react-map-gl';
// import municipalities from '../../utils/municipalities';

interface MunicipalMapProps {
  selectedMuni: string|undefined,
  setMuni: React.Dispatch<React.SetStateAction<string|undefined>>,
}

const navigationStyle = css`
  bottom: 4.2rem;
  position: absolute;
  right: 1rem;
`;

const mapStyle = css`
  flex-shrink: 0;
  padding-left: 5rem;
`;

function handleClick(e: Array<mapboxgl.EventData>): string {
  const muniPolygon = e.find((feature) => feature.layer.id === 'Municipal highlight');
  if (muniPolygon) {
    return muniPolygon.properties.municipal;
  }
  return '';
}

const Map: React.FC<MunicipalMapProps> = ({ selectedMuni, setMuni }) => {
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

  const initialState = {
    viewport: {
      latitude: 42.3653,
      longitude: -71.0834,
      zoom: 8.4,
    },
  };

  function reducer(state: any, action: any) {
    switch (action.type) {
      case 'setViewport':
        return { ...state, viewport: action.viewport };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleViewportChange = useCallback(
    (viewport) => dispatch({ type: 'setViewport', viewport }), [],
  );

  // const handleGeocoderViewportChange = useCallback((newViewport) => {
  //   const geocoderDefaultOverrides = { transitionDuration: 1000, zoom: 11 };
  //   return handleViewportChange({
  //     ...newViewport,
  //     ...geocoderDefaultOverrides,
  //   });
  // }, []);

  return (
    <div css={mapStyle}>
      <ReactMapGL
        {...state.viewport}
        ref={(ref) => assignRef(ref)}
        width="600px"
        height="600px"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken="pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg"
        mapStyle="mapbox://styles/ihill/cknj7cvb513e317rxm4a8i9ah"
        scrollZoom={false}
        onClick={(e) => {
          setMuni(handleClick(e.features));
          dispatch({
            type: 'setViewport',
            viewport: {
              ...state.viewport, longitude: e.lngLat[0], latitude: e.lngLat[1], zoom: 11, transitionDuration: 1000,
            },
          });
        }}
      >
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
                'hsla(0, 0%, 0%, 0.3)',
              ],
            }}
          />
        </Source>
        <Source id="Sites" type="vector" url="mapbox://ihill.ayu61cpw">
          <Layer
            type="circle"
            id="Sites (circles)"
            source="Sites"
            source-layer="site_suitability_pt_quintile-bz2r40"
            paint={{
              'circle-color': [
                'match',
                ['get', 'csv_munici'],
                [selectedMuni],
                [
                  'step',
                  ['get', 'csv_Overal'],
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
                '#000000',
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
                'match', ['get', 'csv_Top Qu'],
                1,
                1, 0,
              ],
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

export default Map;
