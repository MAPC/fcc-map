/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import ImageGrid from './ImageGrid';
import { themeColors, marginStyle  } from '../utils/theme';
import triangle from '../images/triangle.svg';

interface HighlightSectionProps {
  children: Array<React.ReactNode>;
}

const highlightSectionWrapper = css`
  background: ${themeColors.gossamer};
  position: relative;
`;

const triangleStyle = css`
  position: relative;
  top: -2rem;
  transform: rotate(90deg);
`;

const contentStyle = css`
  ${marginStyle};
  padding-bottom: 6rem;
`;

const HighlightSection: React.FC<HighlightSectionProps> = ({ children }) => {
  const firstParagraph = children[0];
  const remainingParagraphs = children.slice(1);

  return (
    <div css={highlightSectionWrapper}>
      <div css={contentStyle}>
        <img src={triangle} alt="Decorative triangle" css={triangleStyle} />
        {firstParagraph}
        <ImageGrid />
        {remainingParagraphs}
      </div>
    </div>
  )
};

export default HighlightSection;
