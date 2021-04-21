/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import H2Ribbon from './H2Ribbon';
import Wrapper from '../component/municipal-search/Wrapper';
import { marginStyle , themeColors} from '../utils/theme';

const halfWidthParagraph = css`
  max-width: 77rem;
  margin-top: 4rem;
`;

const PromisableOpportunities: React.FC = () => (
  <div css={marginStyle}>
    <H2Ribbon title="The Most Promising Opportunities" width={650} height={70} />
    <p css={halfWidthParagraph}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. No vis iuvaret appareat. Scripta periculis ei eam, te pro movet reformidans. In pro vero novum officiis, eros copiosae nam id, no mel legimus deleniti mandamus. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Scripta periculis ei eam, te pro movet reformidans. Pri viderer tamquam ei. His cu probo blandit. Scripta periculis ei eam, te pro movet reformidans. Scripta periculis ei eam, te pro movet reformidans. Sed no sumo stet, est ei quodsi feugait liberavisse, in pro quot facete definitiones. Ei qui diceret voluptua luptatum, te dolorum detracto hendrerit sed, ad per offendit consetetur. Eos ex affert fabulas iudicabit, dolore ornatus instructior ex per. Et mazim recteque nam. Scripta periculis ei eam, te pro movet reformidans. Te quo atqui libris, dicta aeque usu an.
    </p>
    <Wrapper />
    <p css={halfWidthParagraph}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Scripta periculis ei eam, te pro movet reformidans. Scripta periculis ei eam, te pro movet reformidans. Scripta periculis ei eam, te pro movet reformidans. Scripta periculis ei eam, te pro movet reformidans. Vivendum intellegat et qui, ei denique consequuntur vix. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Scripta periculis ei eam, te pro movet reformidans. Vivendum intellegat et qui, ei denique consequuntur vix. Partiendo adversarium no mea. Scripta periculis ei eam, te pro movet reformidans. Vis labore scripta ne, ut alii mediocritatem his. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec.
    </p>
  </div>
);

export default PromisableOpportunities;
