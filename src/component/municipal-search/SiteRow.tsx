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

const liStyle = css`
  background: ${themeColors.warmGrayTransparent};
  margin: .5rem 0;
  padding: 1.5rem 2rem;
`;

const quintile1 = css`
border-right: 10px solid ${themeColors.quintile1};
`;

const quintile2 = css`
border-right: 10px solid ${themeColors.quintile2};
`;

const quintile3 = css`
border-right: 10px solid ${themeColors.quintile3};
`;

const quintile4 = css`
border-right: 10px solid ${themeColors.quintile4};
`;

const quintile5 = css`
border-right: 10px solid ${themeColors.quintile5};
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
  color: ${themeColors.fontLightGray}
`;

const bold = css`
  font-weight: 600;
  padding-right: 2px;
  color: black;
`;

const scoreType = css`
  margin-left: 1.2em;
`;

function parseDouble(input: number): string {
  return input.toFixed(2);
}

const SiteRow: React.FC<SiteRowProps> = ({ node, dispatch }) => {
  const [highlighted, toggleHightlight] = useState<boolean>(false);
  const [starred, toggleStarred] = useState<boolean>(false);
  return (
    <li key={node.site_oid} 
    css={
      [
        liStyle,
        node.Quintile_Category === '1' ? quintile1 : 
        node.Quintile_Category === '2' ? quintile2 : 
        node.Quintile_Category ===  '3' ? quintile3 : 
        node.Quintile_Category ===  '4' ? quintile4 : 
        node.Quintile_Category ===  '5' ? quintile5 : 
        ''
      ]
    }
      onMouseEnter={(e) => {
        if (!highlighted) {
          toggleHightlight(!highlighted);
          dispatch({ type: 'addSite', toggledSite: +node.site_oid });
        }
        // console.log('mouseenter, highlighted: ', highlighted);        
      }}

      onMouseLeave={(e) => {
        if (highlighted && !starred) {
          toggleHightlight(!highlighted);
          dispatch({ type: 'addSite', toggledSite: +node.site_oid });
        }
        // console.log('mouseleave, highlighted: ', highlighted);
      }}
    > 
      <button css={buttonStyle} 
        // trying to use state to render button. onload or "on dispatch"
        onLoad={() => {
          if (highlighted) {
            dispatch({ type: 'addSite', toggledSite: +node.site_oid });
            toggleStarred(true);
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
        <PushPinSimple size={20} weight="fill" color={highlighted ? themeColors.gold : themeColors.fontGray} />
      </button>
      <p css={titleStyle}>{node.municipal} site {node.site_oid}</p>
      <ul css={detailListStyle}>
        <li><span css={bold}>{parseDouble(+node.Growth_Potential_Score)}</span>/1 <span css={scoreType}>Growth Potential Score</span></li>
        <li><span css={bold}>{parseDouble(+node.Healthy_Communtiies_Score)}</span>/1 <span css={scoreType}>Healthy Communities Score</span></li>
        <li><span css={bold}>{parseDouble(+node.Healthy_Watersheds_Score)}</span>/1 <span css={scoreType}>Healthy Watersheds Score</span></li>
        <li><span css={bold}>{parseDouble(+node.Travel_Choices_Score)}</span>/2 <span css={scoreType}>Travel Choices Score</span></li>
        <li><span css={bold}>{parseDouble(+node.Overall_Score)}</span>/5 <span css={scoreType}>Overall Score</span></li>
      </ul>
    </li>
  )
};

export default SiteRow;
