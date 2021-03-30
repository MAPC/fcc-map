/** @jsx jsx */

import React, { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import 'intersection-observer';
import scrollama from 'scrollama';

const sectionStyle = css`
  border: 1px solid red;
`;

const ScrollMap: React.FC = () => {
  const scroller = scrollama();
  const [currentPanel, updatePanel] = useState(0);
  useEffect(() => {
    scroller
      .setup({
        step: '.step',
      })
      .onStepEnter((response) => {
        updatePanel(response.index);
      })
      .onStepExit((response) => {
        updatePanel(response.index);
      });
  }, []);

  const [viewport, setViewport] = useState({
    latitude: 42.329755482312734,
    longitude: -71.09049350120513,
    zoom: 8,
  });

  const displayOne = currentPanel === 0 ? 'visible' : 'none';
  const displayTwo = currentPanel === 1 ? 'visible' : 'none';

  return (
    <div css={css`
      border: 1px solid green;
      display: flex;
      flex-direction: row;
      height: 100%;
    `}
    >
      <div>
        <div className="step" data-step="a" css={sectionStyle}>
          Text about A. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. At usu errem possit patrioque, modo justo percipit sed in. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Commune platonem mel id, brute adipiscing duo an. Scripta periculis ei eam, te pro movet reformidans. Vivendum intellegat et qui, ei denique consequuntur vix. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Quas scaevola postulant id vis, tincidunt assueverit et pro, quo et alii scripta accommodare.
        </div>
        <div className="step" data-step="b" css={sectionStyle}>
          Text about B. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Scripta periculis ei eam, te pro movet reformidans. Scripta periculis ei eam, te pro movet reformidans. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Saepe imperdiet at per, appareat vituperata vix te, pri sint assueverit te. Vivendum intellegat et qui, ei denique consequuntur vix. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Eos ex affert fabulas iudicabit, dolore ornatus instructior ex per. Vivendum intellegat et qui, ei denique consequuntur vix. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Dolor labitur cu pro. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Vivendum intellegat et qui, ei denique consequuntur vix. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te.
        </div>
      </div>
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
          width="700px"
          height="600px"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapboxApiAccessToken="pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg"
          mapStyle="mapbox://styles/ihill/ckky67v9h2fsd17qvbh2mipkb"
          scrollZoom={false}
        >
          <Source id="Sites" type="vector" url="mapbox://ihill.33vx5cd5">
            <Layer
              type="circle"
              id="Sites (circles)"
              source="Sites"
              source-layer="site_suitability_pt-98hifr"
              layout={{ visibility: displayOne }}
              paint={{ 'circle-color': 'red', 'circle-radius': 2 }}
            />
          </Source>
          <Source id="Parcels" type="vector" url="mapbox://ihill.2z6o4h6v">
            <Layer
              type="fill"
              id="Sites (parcels)"
              source="Parcels"
              source-layer="site_geometry-9va4jv"
              paint={{ 'fill-color': 'red' }}
              layout={{ visibility: displayTwo }}
            />
          </Source>
        </ReactMapGL>
      </div>
    </div>
  );
};

export default ScrollMap;
