/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import H2Ribbon from './H2Ribbon';
import HeroOverlayParagraph from './HeroOverlayParagraph';
import { marginStyle } from '../utils/theme';

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

const HeroImage: React.FC<HeroImageProps> = ({ image, title }) => (
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
        <H2Ribbon title={title} width={300} />
      </div>
    </div>
    <HeroOverlayParagraph>
      100 years ago, the land at 123 Main Street in Landborough was a pasture; in the 1960s, it was developed into a small shopping plaza; by 2000, the plaza was struggling. In 2015, a new chapter began when this land was redeveloped as a small residential building. The new apartments/condos are home to people who might otherwise not have had a chance to live in or stay in Landborough. The apartments use less energy than single family homes and didn’t require the destruction of natural areas. People who live there can walk to get a cup of coffee, or buy a gallon of milk, or to get on the bus, so they are not contributing to traffic congestion. Tax revenue is higher than it was before. By replacing a shabby retail plaza, the new building enhanced the character of the town.
    </HeroOverlayParagraph>
  </div>
);

export default HeroImage;
