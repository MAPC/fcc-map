/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import H2Ribbon from './H2Ribbon';
import { marginStyle , themeColors} from '../utils/theme';

interface HeroImageProps {
  image: string,
  title: string
}

const heroWrapperStyle = css`
  display: flex;
  flex-direction: column;
`;

const imageStyle = css`
  background-position: center;
  background-size: cover;
  height: 80rem;
  margin: 0 auto;
  position: relative;
  width: 100%;
`;

const paragraphWrapperStyle = css`
   ${marginStyle};
  margin-top: -10rem;
  width: 100%;
  z-index: 10;
  z-index: 10;
`;

const paragraphStyle = css`
  background: ${themeColors.indigo};
  color: ${themeColors.white};
  margin: 0;
  padding: 5rem 5.6rem;
  width: 69rem;
`;

const Hero: React.FC<HeroImageProps> = ({ image, title, children }) => (
  <div css={heroWrapperStyle}>
    <div
      css={css`
        ${imageStyle}
        background-image: url(${image});
      `}
    >
      <div
        css={css`
          ${marginStyle}
          padding-top: 17.5rem;
        `}
      >
        <H2Ribbon title={title} width={300} height={70} />
      </div>
    </div>
    <div css={paragraphWrapperStyle}>
      <p css={paragraphStyle}>
        {children}
      </p>
    </div>
  </div>
);

export default Hero;
