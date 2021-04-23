/** @jsxRuntime classic */
/** @jsx jsx */

import * as React from 'react';
import { css, jsx } from '@emotion/react';
import { themeColors } from '../utils/theme';
import triangle from '../images/glassTriangle.svg';

export interface AccordionProps {
  title: string
}

function toggleVisibility(currentState: boolean, setActive: React.Dispatch<React.SetStateAction<boolean>>) {
  if (currentState === true) {
    return setActive(false);
  }
  return setActive(true);
}

const accordionHeaderStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const iconStyle = css`
  transition: rotate .3s ease-out;
  rotate: 0deg;
`;

const activeIconStyle = css`
  ${iconStyle}
  transition: rotate .3s ease-out;
  rotate: 90deg;
`;

const titleStyle = css`
  color: ${themeColors.glass};
  font-size: 2rem;
  font-weight: 400;
  line-height: 2.8rem;
  margin: 0;
`;

const contentStyle = css`
  margin-top: 20px;
`;

const accordionDividerStyle = css`
  color: #fff;
  margin: 30px 0;
`;

export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isActive, setActive] = React.useState(false);
  return (
    <div>
      <div
        css={accordionHeaderStyle}
        onClick={() => toggleVisibility(isActive, setActive)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            toggleVisibility(isActive, setActive);
          }
        }}
        role="button"
        tabIndex={0}
      >
        <h3 css={titleStyle}>{title}</h3>
        <img src={triangle} css={isActive ? activeIconStyle : iconStyle} />
      </div>
      {isActive ? <div css={contentStyle}>{children}</div> : ''}
      <hr css={accordionDividerStyle} />
    </div>
  )
};

export default Accordion;
