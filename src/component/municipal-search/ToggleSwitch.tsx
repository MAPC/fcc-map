/** @jsx jsx */

import React, { useState } from 'react';
import { jsx, css } from '@emotion/react';
import Switch from "react-switch";

interface ToggleSwitchProps {
  provider: string,
  state: any,
  toggle: React.Dispatch<React.SetStateAction<any>>
}

const toggleStyle = css`
  display: flex;
  flex-direction: row;
  margin: 1rem;
  width: 100%;
  h3 {
    display: inline;
    margin: 1rem;
  }
  .react-switch {
    margin-left: 4px;
    vertical-align: middle;
  }
`;

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({provider, state, toggle}) => {
  const [checked, setChecked] = useState(true);
  const handleChange = (nextChecked: boolean | ((prevState: boolean) => boolean)) => {
    setChecked(nextChecked);
    toggle(!state);
  };

  return (
    <div css={toggleStyle} className="react-switch-container">
      <label>
        <Switch
          onChange={handleChange}
          onColor="#c9c9fb"
          offColor="#E5E4E2"
          onHandleColor="#4A49F5"
          checkedIcon={false}
          uncheckedIcon={false}
          checked={checked}
          className="react-switch"
        />
        <h3>{provider}</h3>
      </label>
    </div>
  );
};

export default ToggleSwitch;