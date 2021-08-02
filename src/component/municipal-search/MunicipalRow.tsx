/** @jsx jsx */

import React, { useState } from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts } from '../../utils/theme';
import { CsvData } from './MunicipalData';

interface MunicipalRowProps {
  selectedMuni: string|undefined,
  node: CsvData
}

const muniRowStyle = css`
  background: ${themeColors.white};
  margin: 0 0 2rem;
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

// rendering MunicipalRow, imported into SearchMap
const MunicipalRow: React.FC<MunicipalRowProps> = ({ node, selectedMuni }) => {
  return (
    <div css={muniRowStyle}>
      <p css={titleStyle}>{selectedMuni}</p>
      <ul css={detailListStyle}>
        <li>Test data/muni_id: {parseDouble(+node.muni_id)}</li>
        <li>Tax Revenue Before: </li>
      </ul>
    </div>

  )
};

export default MunicipalRow;