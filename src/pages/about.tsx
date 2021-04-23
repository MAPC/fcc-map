/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import { Helmet } from 'react-helmet';
import Layout from '../component/Layout';
import MinimalHeader from '../component/MinimalHeader';
import Accordion from '../component/Accordion';
import { themeColors } from '../utils/theme';

const aboutPageMargin = css`
  margin: 0 auto;
  padding: 7rem 35rem 10rem 10rem;
  max-width: 100rem;
`;

const h2Style = css`
  color: ${themeColors.glass};
  font-size: 3.6rem;
  font-weight: 400;
  line-height: 5rem;
`;

const accordionWrapper = css`
  margin-top: 5rem;
  max-width: 86.6rem;
`;

const linkStyle = css`
  color: ${themeColors.glass};
`;

const AboutPage: React.FC = () => (
  <React.Fragment>
    <Helmet>
      <title>About | Rethinking the Suburban Strip</title>
    </Helmet>
    <Layout>
      <MinimalHeader />
      <main css={aboutPageMargin}>
        <h2 css={h2Style}>What is Retrofitting Suburbia?</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ridens nostro perfecto ad cum, debet omnes splendide sit eu, vix an iisque dissentias. Vivendum intellegat et qui, ei denique consequuntur vix. Vis labore scripta ne, ut alii mediocritatem his. No dicam aperiam vis. Vivendum intellegat et qui, ei denique consequuntur vix. Scripta periculis ei eam, te pro movet reformidans. Vivendum intellegat et qui, ei denique consequuntur vix. Pri veritus expetendis ex. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Vivendum intellegat et qui, ei denique consequuntur vix. Vivendum intellegat et qui, ei denique consequuntur vix. Vivendum intellegat et qui, ei denique consequuntur vix. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Dolor labitur cu pro.
        </p>
        <div css={accordionWrapper}>
          <Accordion title="Where can I download the data?">
            <p>
              The data are available in both tabular and spatial formats (along with the associated metadata) on <a href="https://datacommon.mapc.org" css={linkStyle}>MAPC's DataCommon</a>.
            </p>
          </Accordion>
          <Accordion title="Who should I contact with questions?">
            <p>
              Email ABC XYZ at <a href="#" css={linkStyle}>email</a> for questions related to this research.
            </p>
          </Accordion>
          <Accordion title="Contributors">
            <p>
              This research website is the result of the work of many MAPC staff. Here they are listed in alphabetical order, but last name:
            </p>
            <ul>
              <li>Ryan Kelly</li>
              <li>Chris Kushel, AICP</li>
              <li>Jessie Partridge Guerrero</li>
              <li>Lily Perkins-High</li>
              <li>Tim Reardon</li>
              <li>Caitlin Spence, PhD</li>
              <li>Annabelle Thomas Taylor</li>
              <li>Kit Un</li>
            </ul>
          </Accordion>
          <Accordion title="Disclaimer">
            <p>
              "Rethinking the Suburban Strip" data developed by the Metropolitan Area Planning Council ("MAPC") is expressly provided "AS IS." MAPC MAKES NO WARRANTY OF ANY KIND, EXPRESS, IMPLIED, IN FACT OR ARISING BY OPERATION OF LAW, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT AND DATA ACCURACY. MAPC NEITHER REPRESENTS NOR WARRANTS THAT THE OPERATION OF THE RETHINKING THE SUBURBAN STRIP WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT ANY DEFECTS WILL BE CORRECTED. MAPC DOES NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING THE USE OF RETROFITTING THE SUBURBAN STRIP OR THE RESULTS THEREOF, INCLUDING BUT NOT LIMITED TO THE CORRECTNESS, ACCURACY, RELIABILITY, OR USEFULNESS OF THE SOFTWARE.
            </p>
          </Accordion>
        </div>
      </main>
    </Layout>
  </React.Fragment>
);

export default AboutPage;
