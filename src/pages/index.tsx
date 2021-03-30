/** @jsx jsx */

import React from 'react';
import { Helmet } from 'react-helmet';
import { css, jsx } from '@emotion/react';
import Layout from '../component/Layout';
import ScrollMap from '../component/Map';
import { marginStyle } from '../theme';

const IndexPage: React.FC = () => (
  <>
    <Helmet>
      {/* <link href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.13.0/mapbox-gl.css" rel="stylesheet" /> */}
    </Helmet>
    <Layout cssProps={marginStyle}>
      <ScrollMap />
    </Layout>
  </>
);

export default IndexPage;
