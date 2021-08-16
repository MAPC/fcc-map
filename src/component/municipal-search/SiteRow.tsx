/** @jsx jsx */

import React, { useState } from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { CsvData } from './MunicipalData';
import { PushPinSimple } from 'phosphor-react';

interface SiteRowProps {
  node: CsvData,
  dispatch: React.Dispatch<unknown>
}

let liStyle = css`
  background: ${themeColors.warmGrayTransparent};
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

const bold = css`
  font-weight: 600;
  padding-right: 3px;
`;

function parseDouble(input: number): string {
  return input.toFixed(2);
}

const SiteRow: React.FC<SiteRowProps> = ({ node, dispatch }) => {
  const [highlighted, toggleHightlight] = useState<boolean>(false);
  const [starred, toggleStarred] = useState<boolean>(false);
  return (
    <li key={node.site_oid} css={liStyle}
      onMouseEnter={(e) => {
        if (!highlighted) {
          toggleHightlight(!highlighted);
          dispatch({ type: 'addSite', toggledSite: +node.site_oid });
        }
      }}

      onMouseLeave={(e) => {
        if (highlighted && !starred) {
          toggleHightlight(!highlighted);
          dispatch({ type: 'addSite', toggledSite: +node.site_oid });
        }
      }}
    > 
      <button css={buttonStyle} 
        onLoad={() => {
          if (highlighted) {
            toggleStarred(true);
            dispatch({ type: 'addSite', toggledSite: +node.site_oid });
          }
        }}
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
        <PushPinSimple size={20} weight="fill" color={highlighted ? '#FDB525' : themeColors.fontGray} />
      </button>
      <p css={titleStyle}>{node.municipal} site {node.site_oid}</p>
      <ul css={detailListStyle}>
        <li><span css={bold}>{parseDouble(+node.Growth_Potential_Score)}</span>/1 Growth Potential Score</li>
        <li><span css={bold}>{parseDouble(+node.Healthy_Communtiies_Score)}</span>/1 Healthy Communities Score</li>
        <li><span css={bold}>{parseDouble(+node.Healthy_Watersheds_Score)}</span>/1 Healthy Watersheds Score</li>
        <li><span css={bold}>{parseDouble(+node.Travel_Choices_Score)}</span>/2 Travel Choices Score</li>
        <li><span css={bold}>{parseDouble(+node.Overall_Score)}</span>/5 Overall Score</li>
      </ul>
    </li>
  )
};

export default SiteRow;
