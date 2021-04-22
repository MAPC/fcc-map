/** @jsx jsx */

import React, { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/react';
import 'intersection-observer';
import scrollama from 'scrollama';
import ScrollMap from './ScrollMap';
import SidebarText from './SidebarText';
import { marginStyle } from '../utils/theme';

interface PanelInterface {
  [key: number]: {
    viewport: {
      latitude: number,
      longitude: number,
      zoom: number,
    },
  }
}

const panelSettings: PanelInterface = {
  0: {
    viewport: {
      latitude: 42.329755482312734,
      longitude: -71.09049350120513,
      zoom: 8,
    },
  },
  1: {
    viewport: {
      latitude: 42.27722101940692,
      longitude: -71.3599202388301,
      zoom: 12,
    },
  },
  2: {
    viewport: {
      latitude: 42.27722101940692,
      longitude: -71.3599202388301,
      zoom: 12,
    },
  },
};

const NarrativeWrapper: React.FC = () => {
  const scroller = scrollama();
  const [currentPanel, updatePanel] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: 42.329755482312734,
    longitude: -71.09049350120513,
    zoom: 8.4,
  });

  useEffect(() => {
    scroller.setup({ step: '.step' })
      .onStepEnter((response) => {
        updatePanel(response.index);
        if (viewport !== panelSettings[response.index].viewport) {
          setViewport(panelSettings[response.index].viewport);
        }
      })
      .onStepExit((response) => {
        updatePanel(response.index);
        if (viewport !== panelSettings[response.index].viewport) {
          setViewport(panelSettings[response.index].viewport);
        }
      });
  }, []);

  return (
    <div css={css`
      ${marginStyle}
      display: flex;
      flex-direction: row;
      height: 100%;
    `}
    >
      <SidebarText />
      <ScrollMap currentPanel={currentPanel} viewport={viewport} setViewport={setViewport} />
    </div>
  );
};

export default NarrativeWrapper;
