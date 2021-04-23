/** @jsx jsx */

import React, { useState } from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { CsvData } from './MunicipalData';
import { Star } from 'phosphor-react';

interface SiteRowProps {
  node: CsvData,
  dispatch: React.Dispatch<unknown>
}

const liStyle = css`
  background: ${themeColors.warmGray};
  margin: .5rem 0;
  padding: 1.5rem 2rem;
`;

const titleStyle = css`
  color: ${themeColors.indigo};
  font-family: ${fonts.calibre};
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

const buttonStyle = css`
  background: none;
  border: none;
  float: right;
`;

const starStyle = css`

`;

const detailListStyle = css`
  padding-left: 0;
  list-style: none;
`;

function parseDouble(input: number): string {
  return input.toFixed(2);
}

const SiteRow: React.FC<SiteRowProps> = ({ node, dispatch }) => {
  const [highlighted, toggleHightlight] = useState<boolean>(false);
  return (
    <li key={node.site_oid} css={liStyle}>
      <button css={buttonStyle} onClick={() => {
        dispatch({ type: 'addSite', toggledSite: node.site_oid });
        toggleHightlight(!highlighted);
      }}>
        <Star size={20} weight="fill" color={highlighted ? themeColors.glass : themeColors.fontGray} />
      </button>
      <p css={titleStyle}>{node.municipal} site {node.site_oid}</p>
      <ul css={detailListStyle}>
        <li>Growth Potential Score: {parseDouble(+node.Growth_Potential_Score)}</li>
        <li>Healthy Communities Score: {parseDouble(+node.Healthy_Communtiies_Score)}</li>
        <li>Healthy Watersheds Score: {parseDouble(+node.Healthy_Watersheds_Score)}</li>
        <li>Travel Choices Score: {parseDouble(+node.Travel_Choices_Score)}</li>
        <li>Overall Score: {parseDouble(+node.Overall_Score)}</li>
      </ul>
    </li>
  )
};

export default SiteRow;
