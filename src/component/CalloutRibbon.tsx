/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import { fonts, themeColors } from '../utils/theme';

interface CalloutRibbonProps {
  background: string,
  text: string
}

const ribbonStyle = css`
  color: ${themeColors.black};
  display: flex;
  flex-direction: row-reverse;
  font-family: ${fonts.swiftNeueLtPro};
  font-size: 3.6rem;
  line-height: 5rem;
  text-align: right;
`;

const ribbonTextStyle = css`
  align-self: flex-end;
  padding: 6rem 0;
  width: 100rem;
`;

const CalloutRibbon: React.FC<CalloutRibbonProps> = ({ background, text }) => (
  <aside css={ribbonStyle}>
    <span css={
      css`
        ${ribbonTextStyle}
        background: ${background};
      `
      }
    >
      {text}
    </span>
  </aside>
);

export default CalloutRibbon;
