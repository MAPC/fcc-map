/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import { fonts, themeColors, marginStyle } from '../utils/theme';

interface CalloutRibbonProps {
  background: string,
  text: string
}

const CalloutRibbon: React.FC<CalloutRibbonProps> = ({ background, text }) => (
  <aside
    css={css`
      ${marginStyle}
      align-self: flex-end;
      background: ${background};
      color: ${themeColors.black};
      font-family: ${fonts.swiftNeueLtPro};
      font-size: 3.6rem;
      line-height: 5rem;
      padding: 6rem 10rem;
      max-width: 120rem;
      text-align: right;
      width: 100rem;
    `}
  >
    {text}
  </aside>
);

export default CalloutRibbon;
