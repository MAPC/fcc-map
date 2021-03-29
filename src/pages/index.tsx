/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import Layout from '../component/Layout';
import { marginStyle } from '../theme';

const IndexPage: React.FC = () => (
  <Layout cssProps={marginStyle}>
    Homepage
  </Layout>
);

export default IndexPage;
