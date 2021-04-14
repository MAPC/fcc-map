/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import { fonts, marginStyle, themeColors } from '../utils/theme';

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

const titleStyle = css`
  background: rgba(190, 232, 253, .8);
  color: ${themeColors.black};
  font-family: ${fonts.swiftNeueLtPro};
  font-size: 5.2rem;
  padding: 2rem 3rem;
  position: absolute;
  top: 0;
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
    <div css={marginStyle}>
      <h2 css={titleStyle}>{title}</h2>
    </div>
  </div>
);

export default HeroImage;
