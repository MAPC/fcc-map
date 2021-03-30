/** @jsx jsx */

import React, { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import 'intersection-observer';
import scrollama from 'scrollama';
import image from '../images/icon.png';

const sectionStyle = css`
  /* border: 1px solid red; */
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
      display: flex;
      flex-direction: row;
      height: 100%;
    `}
    >
      <div>
        <div className="step" data-step="a" css={sectionStyle}>
          <h2>Section One</h2>
          <p>
            Introduce the idea of &quot;suburban retrofit&quot; and highlight how many spots there are on the map (over 5,000!). Each of these represents at least one parcel, but when zoomed out it&apos;s a little hard to tell how much space that is. Insert snippet about 10 square miles---that&apos;s a lot of Boston, and basically all of Woburn!
          </p>
          <p>
            Most of the interactivity has been taken away from the map because it is currently serving as a static visual. If all of the controls were still present, it would be easy for the user to get &quot;off track&quot; from the story and difficult to bring them back in.
          </p>
          <p>
            This can go on arbitrarily long, but we&apos;ll cut it off here. Just to show that we could include photos or charts here, though, here&apos;s the Gatsby logo:
          </p>
          <img src={image} alt="Gatsby logo" css={css`width: 200px;`} />
        </div>
        <div className="step" data-step="b" css={sectionStyle}>
          <h2>Section Two: Headings Continue</h2>
          <p>
            Scroll and notice the change in map view; we zoomed in and are now displaying the parcel layer instead of the circle layer. Scroll up just a little bit and the circles come back/we zoom out. This is both a joy and peril of scrollytelling: you can go forward or backward, and you need to make sure it&apos;s a digestable experience either way.
          </p>
          <p>
            Again, most controls are still gone. Depending on the narrative, we might want to allow users to click and pan around, or jump to various places on the map.
          </p>
          <p>
            Adding lorem ipsum here to stretch the section: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sonet cotidieque ei vel. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Dicit dicant quaestio pri eu, no principes persecuti liberavisse sit. Vivendum intellegat et qui, ei denique consequuntur vix. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Vivendum intellegat et qui, ei denique consequuntur vix. Scripta periculis ei eam, te pro movet reformidans. Te quo atqui libris, dicta aeque usu an. Ei qui diceret voluptua luptatum, te dolorum detracto hendrerit sed, ad per offendit consetetur. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Vivendum intellegat et qui, ei denique consequuntur vix. Cum ne case tation rationibus, nam ad iusto atomorum assueverit. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te.
          </p>
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
          height="100%"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapboxApiAccessToken="pk.eyJ1IjoiaWhpbGwiLCJhIjoiY2plZzUwMTRzMW45NjJxb2R2Z2thOWF1YiJ9.szIAeMS4c9YTgNsJeG36gg"
          mapStyle="mapbox://styles/ihill/ckmnruq9j2aum17mabq3k5zgc"
          scrollZoom={false}
        >
          <Source id="Sites" type="vector" url="mapbox://ihill.33vx5cd5">
            <Layer
              type="circle"
              id="Sites (circles)"
              source="Sites"
              source-layer="site_suitability_pt-98hifr"
              layout={{ visibility: displayOne }}
              paint={{ 'circle-color': '#b3b3b3', 'circle-radius': 2 }}
            />
          </Source>
          <Source id="Parcels" type="vector" url="mapbox://ihill.2z6o4h6v">
            <Layer
              type="fill"
              id="Sites (parcels)"
              source="Parcels"
              source-layer="site_geometry-9va4jv"
              paint={{ 'fill-color': '#b3b3b3' }}
              layout={{ visibility: displayTwo }}
            />
          </Source>
        </ReactMapGL>
      </div>
    </div>
  );
};

export default ScrollMap;
