/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import { Helmet } from 'react-helmet';
import Layout from '../component/Layout';
import NarrativeWrapper from '../component/NarrativeWrapper';
import HeroImage from '../component/HeroImage';
import ImageGrid from '../component/ImageGrid';
import { marginStyle } from '../utils/theme';
import dedham from '../images/dior_dedham.png';

const middleParagraphStyle = css`
  margin: 3rem auto;
  width: 69rem;
`;

const IndexPage: React.FC = () => (
  <React.Fragment>
    <Helmet>
      <title>Rethinking the Suburban Strip</title>
    </Helmet>
    <Layout cssProps={marginStyle}>
      <HeroImage image={dedham} alt="Before picture of Dior Dedham" title="Dior Dedham" />
      <p css={middleParagraphStyle}>
        100 years ago, the land at 123 Main Street in Landborough was a pasture; in the 1960s, it was developed into a small shopping plaza; by 2000, the plaza was struggling. In 2015, a new chapter began when this land was redeveloped as a small residential building. The new apartments/condos are home to people who might otherwise not have had a chance to live in or stay in Landborough. The apartments use less energy than single family homes and didn’t require the destruction of natural areas. People who live there can walk to get a cup of coffee, or buy a gallon of milk, or to get on the bus, so they are not contributing to traffic congestion. Tax revenue is higher than it was before. By replacing a shabby retail plaza, the new building enhanced the character of the town.
      </p>
      <NarrativeWrapper />
      <p css={middleParagraphStyle}>
        The region and its communities need to think strategically about these opportunities in order to maximize the benefits of commercial site retrofits. Where should we start? This report takes a comprehensive look at low-density commercial sites across the region. Using a wide range of information, we evaluated all the sites to identify those with the best potential for redevelopment, and we estimated the local and regional costs and benefits associated with reusing even some of those sites. This information is intended to help local communities begin a conversation about how they might rethink future growth in their town; and to support policy makers and state agencies who will play an important role in their reuse. Working together, these relics of the past can be transformed to meet the needs of the future.
      </p>
      <ImageGrid />
      <p css={middleParagraphStyle}>
        The region and its communities need to think strategically about these opportunities in order to maximize the benefits of commercial site retrofits. Where should we start? This report takes a comprehensive look at low-density commercial sites across the region. Using a wide range of information, we evaluated all the sites to identify those with the best potential for redevelopment, and we estimated the local and regional costs and benefits associated with reusing even some of those sites. This information is intended to help local communities begin a conversation about how they might rethink future growth in their town; and to support policy makers and state agencies who will play an important role in their reuse. Working together, these relics of the past can be transformed to meet the needs of the future.
      </p>
    </Layout>
  </React.Fragment>
);

export default IndexPage;
