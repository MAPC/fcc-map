/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import { Helmet } from 'react-helmet';
import Layout from '../component/Layout';
import NarrativeWrapper from '../component/NarrativeWrapper';
import Hero from '../component/Hero';
import HighlightSection from '../component/HighlightSection';
import TwoColImageText from '../component/TwoColImgeText';
import BuildableArea from '../component/BuildableArea';
import Wrapper from '../component/municipal-search/Wrapper';
import { marginStyle, themeColors } from '../utils/theme';
import dedham from '../images/dior_dedham.png';
import blueprint1 from '../images/blueprint1.png';
import blueprint2 from '../images/blueprint2.png';
import H2Ribbon from '../component/H2Ribbon';

const middleParagraphStyle = css`
  margin: 0 auto;
  padding: 3rem 0;
  width: 69rem;
`;

const IndexPage: React.FC = () => (
  <React.Fragment>
    <Helmet>
      <title>Rethinking the Suburban Strip</title>
    </Helmet>
    <Layout>
      <Hero image={dedham} title="Dior Dedham">
        100 years ago, the land at 123 Main Street in Landborough was a pasture; in the 1960s, it was developed into a small shopping plaza; by 2000, the plaza was struggling. In 2015, a new chapter began when this land was redeveloped as a small residential building. The new apartments/condos are home to people who might otherwise not have had a chance to live in or stay in Landborough. The apartments use less energy than single family homes and didn’t require the destruction of natural areas. People who live there can walk to get a cup of coffee, or buy a gallon of milk, or to get on the bus, so they are not contributing to traffic congestion. Tax revenue is higher than it was before. By replacing a shabby retail plaza, the new building enhanced the character of the town.
      </Hero>
      <NarrativeWrapper />
      {/* HighlightSection must include at least 2 paragraphs tags without altering the code or design */}
      <HighlightSection>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sit fugit nostrum et. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Eos verear percipit ex, eos ne eligendi inimicus. Scripta periculis ei eam, te pro movet reformidans. Vivendum intellegat et qui, ei denique consequuntur vix. Semper aeterno percipit ut his, sea ex utinam referrentur repudiandae. Saepe imperdiet at per, appareat vituperata vix te, pri sint assueverit te. Scripta periculis ei eam, te pro movet reformidans. Te cum aeque repudiandae delicatissimi, cu populo dictas ponderum vel, dolor consequat ut vix. Dicit dicant quaestio pri eu, no principes persecuti liberavisse sit. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Scripta periculis ei eam, te pro movet reformidans. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. No vis iuvaret appareat. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Scripta periculis ei eam, te pro movet reformidans. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Vivendum intellegat et qui, ei denique consequuntur vix. Scripta periculis ei eam, te pro movet reformidans. Accusam explicari sed ei. Vivendum intellegat et qui, ei denique consequuntur vix. Vivendum intellegat et qui, ei denique consequuntur vix. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Pri veritus expetendis ex. Prima zril primis eu sed, mei ei eirmod moderatius adversarium. Ridens nostro perfecto ad cum, debet omnes splendide sit eu, vix an iisque dissentias. Qui gloriatur scribentur et, id velit verear mel, cum no porro debet.
        </p>
      </HighlightSection>
      <TwoColImageText>
        <div className="text" css={css`margin-right: 4rem;`}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Scripta periculis ei eam, te pro movet reformidans. Scripta periculis ei eam, te pro movet reformidans. Harum repudiandae sea at. Scripta periculis ei eam, te pro movet reformidans. Scripta periculis ei eam, te pro movet reformidans. Vivendum intellegat et qui, ei denique consequuntur vix. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Sit fugit nostrum et. Partiendo adversarium no mea. Tritani reprehendunt pro an, his ne liber iusto. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Scripta periculis ei eam, te pro movet reformidans. Scripta periculis ei eam, te pro movet reformidans. Scripta periculis ei eam, te pro movet reformidans. Sonet tibique sea et. Harum repudiandae sea at. No epicuri hendrerit consetetur sit, sit dicta adipiscing ex, in facete detracto deterruisset duo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Scripta periculis ei eam, te pro movet reformidans. Scripta periculis ei eam, te pro movet reformidans. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Usu ut commune mentitum, putent facete vim id. Vivendum intellegat et qui, ei denique consequuntur vix. Scripta periculis ei eam, te pro movet reformidans. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Vivendum intellegat et qui, ei denique consequuntur vix. Vivendum intellegat et qui, ei denique consequuntur vix. Erroribus adipiscing id eam. Vivendum intellegat et qui, ei denique consequuntur vix. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Unum dicam posidonium eu vix, sea eu ubique viderer civibus, oporteat signiferumque eos et. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec.
          </p>
        </div>
        <div className="images">
          <img src={blueprint1} />
          <img src={blueprint2} />
        </div>
      </TwoColImageText>
      <BuildableArea />
      <Wrapper />
    </Layout>
  </React.Fragment>
);

export default IndexPage;
