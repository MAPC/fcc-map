/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import grid1 from '../images/grid_1.png';
import grid2 from '../images/grid_2.png';

const gridStyle = css`
  display: grid;
  float: left;
  margin: 2rem 5.5rem 0 0;
  width: 69rem;
`;

const ImageGrid: React.FC = () => (
  <div css={gridStyle}>
    <img
      src={grid1}
      alt="Street view"
      css={css`
        grid-column: 1 / 3;
        grid-row: 1 / 2;
        padding-bottom: 1rem;
        width: 70rem;
      `}
    />
    <img
      src={grid2}
      alt="Strip mall"
      css={css`
        grid-column: 1 / 2;
        grid-row: 2 / 3;
        padding-right: .5rem;
        width: 34.5rem;
      `}
    />
    <img
      src={grid2} // Should swap out with another image of same dimensions
      alt="Highlight Dior Dedham"
      css={css`
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        padding-left: .5rem;
        width: 34.5rem;
      `}
    />
  </div>
);

export default ImageGrid;
