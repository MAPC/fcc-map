/** @jsx jsx */

import React, { useState } from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { CsvData } from './MunicipalData'; 
import { PlusCircle, TextAlignJustify } from 'phosphor-react';
import { MinusCircle } from 'phosphor-react';
import Chart from './Chart';
import ExpandedMuniRow from "./ExpandedMuniRow";
import Legend from "./Legend";

interface MunicipalRowProps {
  data: Array<CsvData>,
  node: Array<CsvData>,
  selectedMuni: string|undefined,
  highlightedSites: Array<number|undefined>,
  sitesCount: number|undefined
}

const containerStyle = css`
  background: ${themeColors.white};
  display: flex;
  flex-flow: row wrap;
  margin: .5rem 0;
  max-width: 45rem;
  padding: 1.5rem 2rem .5rem;
  z-index: 1;
  h1 {
    width: 100%;
  }
  h2 {
    margin-top: 0;
    margin-bottom: 0;
    width: 100%;
  }
  p.value {
    padding-right: 1%;
    text-align: right;
    width: 29%;
  }
  p.field {
    width: 70%;
  }
  .title-container:hover {
    cursor: pointer;
    width: 100%;
    h1, h2 {color: ${themeColors.clearWater};}
  }
  .legend {
    width: 100%;
  }
`;

const buttonStyle = css`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 37.5rem;
  margin-top: 0.5rem;
  padding: 1rem 0;
  position: absolute;
`;

const MunicipalRow: React.FC<MunicipalRowProps> = ({ data, node, selectedMuni, highlightedSites, sitesCount }) => {
  const [shown, toggleShow] = useState<boolean>(true);
  const [isHovered, toggleHover] = useState<boolean>(false);

  function handleMouseEnter() {
    toggleHover(true);
  };

  function handleMouseLeave () {
    toggleHover(false);
  };

  return (
    <div css={containerStyle}>
      <button css={buttonStyle} onClick={() => {toggleShow(!shown);}}>
        {shown ? 
          <MinusCircle size={25} weight="bold" color={isHovered ? themeColors.gold : themeColors.fontGray} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} /> : 
          <PlusCircle size={25} weight="bold" color={isHovered ? themeColors.gold : themeColors.fontGray} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} /> 
        }
      </button>
      <div
        onClick={() => {toggleShow(!shown);}} 
        className="title-container"
      >
        <h2>Potential Retail Retrofit Sites in</h2>
        <h1>{selectedMuni}</h1>
      </div>
      {shown ? <ExpandedMuniRow  data={data} node={node} selectedMuni={selectedMuni} highlightedSites={highlightedSites} sitesCount={sitesCount} /> : ""}
      {/* <div className="legend">
        <Legend />
      </div> */}
    </div>
  )
};

export default MunicipalRow;