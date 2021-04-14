/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import { Helmet } from 'react-helmet';
import Layout from '../component/Layout';
import { marginStyle } from '../utils/theme';

const AboutPage: React.FC = () => (
  <React.Fragment>
    <Helmet>
      <title>About | Rethinking the Suburban Strip</title>
    </Helmet>
    <Layout cssProps={marginStyle}>
      <h1>About</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ridens nostro perfecto ad cum, debet omnes splendide sit eu, vix an iisque dissentias. Vivendum intellegat et qui, ei denique consequuntur vix. Vis labore scripta ne, ut alii mediocritatem his. No dicam aperiam vis. Vivendum intellegat et qui, ei denique consequuntur vix. Scripta periculis ei eam, te pro movet reformidans. Vivendum intellegat et qui, ei denique consequuntur vix. Pri veritus expetendis ex. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Vivendum intellegat et qui, ei denique consequuntur vix. Vivendum intellegat et qui, ei denique consequuntur vix. Vivendum intellegat et qui, ei denique consequuntur vix. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Dolor labitur cu pro.
      </p>
    </Layout>
  </React.Fragment>
);

export default AboutPage;
