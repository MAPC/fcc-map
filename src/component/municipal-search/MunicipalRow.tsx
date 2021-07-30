/** @jsx jsx */

import React, { useState } from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { CsvData } from './MunicipalData';
import { Star } from 'phosphor-react';

interface MunicipalRowProps {
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
  cursor: pointer;
`;

const detailListStyle = css`
  padding-left: 0;
  list-style: none;
`;

function parseDouble(input: number): string {
  return input.toFixed(2);
}

const MunicipalRow: React.FC<MunicipalRowProps> = ({ node, dispatch }) => {
  const [highlighted, toggleHightlight] = useState<boolean>(false);
  const [starred, toggleStarred] = useState<boolean>(false);
  return (
    <li key={node.site_oid} css={liStyle} 
      onMouseEnter={(e) => {
        // e.target.style.background = themeColors.white
        // for (let index = 0; index < e.target.children.length; index++) {
        //   const element = e.target.children[index];
        //   element.style.background = themeColors.white;
        //   if (element.children.length) {
        //     for (let j = 0; j < element.children.length; j++) {
        //       const nestedChild = element.children[j];
        //       nestedChild.style.background = themeColors.white;
        //     }
        //   }
        // }
        if (!highlighted) {
          toggleHightlight(!highlighted);
          dispatch({ type: 'addSite', toggledSite: +node.site_oid });
        }
      }}
      onMouseLeave={(e) => {
        // e.target.style.background = themeColors.warmGray
        // for (let index = 0; index < e.target.children.length; index++) {
        //   const element = e.target.children[index];
        //   element.style.background = themeColors.warmGray;
        //   if (element.children.length) {
        //     for (let j = 0; j < element.children.length; j++) {
        //       const nestedChild = element.children[j];
        //       nestedChild.style.background = themeColors.warmGray;
        //     }
        //   }  
        // }
        if (highlighted && !starred) {
          toggleHightlight(!highlighted);
          dispatch({ type: 'addSite', toggledSite: +node.site_oid });
        }
      }}
    > 
      <button css={buttonStyle} 
        onClick={() => {
          if (highlighted && starred) {
            toggleStarred(false);
            toggleHightlight(false);
            dispatch({ type: 'addSite', toggledSite: +node.site_oid });
          } else if (highlighted && !starred) {
            toggleStarred(true);
          } else if (!highlighted && !starred) {
            toggleStarred(true);
            toggleHightlight(true);
            dispatch({ type: 'addSite', toggledSite: +node.site_oid });
          }
        }}
      >
        <Star size={20} weight="fill" color={highlighted ? '#FDB525' : themeColors.fontGray} />
      </button>
      <p css={titleStyle}>{node.municipal} site {node.site_oid}</p>
      <ul css={detailListStyle}>
        <li>Growth Potential Score: {parseDouble(+node.Growth_Potential_Score)}</li>
        <li>Healthy Communities Score: {parseDouble(+node.Healthy_Communtiies_Score)}</li>
        <li>Healthy Watersheds Score: {parseDouble(+node.Healthy_Watersheds_Score)}</li>
        <li>Travel Choices Score: {parseDouble(+node.Travel_Choices_Score)}</li>
        <li>Overall Score: {parseDouble(+node.Overall_Score)}</li>
        <li>Number of Parcels on Site: {parseDouble(+node.Number_of_Parcels_on_Site)}</li>
      </ul>
    </li>
  )
};

export default MunicipalRow;