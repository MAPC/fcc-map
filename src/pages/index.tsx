/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import Layout from '../component/Layout';
import ScrollMap from '../component/Map';
import { marginStyle } from '../theme';

const IndexPage: React.FC = () => (
  <>
    <Layout cssProps={marginStyle}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Nibh detracto incorrupte eos eu, iuvaret perfecto eam in, his eu possit dolorum temporibus. Te cum aeque repudiandae delicatissimi, cu populo dictas ponderum vel, dolor consequat ut vix. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. No vis iuvaret appareat. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Vivendum intellegat et qui, ei denique consequuntur vix. Quas scaevola postulant id vis, tincidunt assueverit et pro, quo et alii scripta accommodare. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te.
      </p>
      <ScrollMap />
      <p>End of scrollytelling section. We can add a filter-able version of the map here for folks to interact with, perhaps, now that they know what they're looking at.</p>
    </Layout>
  </>
);

export default IndexPage;
