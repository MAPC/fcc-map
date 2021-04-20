/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import H2Ribbon from './H2Ribbon';
import { marginStyle } from '../utils/theme';

interface HeroImageProps {
  image: string,
  title: string
}

const imageStyle = css`
  background-position: center;
  background-size: cover;
  height: 80rem;
  margin: 0 auto;
  position: relative;
  width: 100%;
`;

const HeroImage: React.FC<HeroImageProps> = ({ image, title }) => (
  <div
    css={
      css`
        ${imageStyle}
        background-image: url(${image});
      `
    }
  >
    <div
      css={css`
        ${marginStyle}
        padding-top: 17.5rem;
      `}
    >
      <H2Ribbon title={title} width={200} />
    </div>
  </div>
);

export default HeroImage;
