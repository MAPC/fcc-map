/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import { fonts, themeColors } from '../utils/theme';

interface HeroImageProps {
  image: string,
  alt: string,
  title: string
}

const heroImageWrapperStyle = css`
  margin: 0 auto;
  position: relative;
`;

const imageStyle = css`
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

const HeroImage: React.FC<HeroImageProps> = ({ image, alt, title }) => (
  <div css={heroImageWrapperStyle}>
    <img src={image} alt={alt} css={imageStyle} />
    <h2 css={titleStyle}>{title}</h2>
  </div>
);

export default HeroImage;
