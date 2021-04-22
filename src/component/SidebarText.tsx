/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';

const sectionStyle = css`
  margin: 0 4.5rem 0 0;
  min-height: 100vh;

  p:first-of-type {
    margin-top: 0;
  }
`;

const SidebarText: React.FC = () => (
  <div>
    <div className="step" data-step="a" css={sectionStyle}>
      <p>
        While stories like this are still uncommon across the region, the opportunities for them are widespread. Across Metro Boston, there are thousands of acres of obsolete, outdated, and unattractive commercial properties built up in the latter part of the 20th Century, during a period when land use controls turned away from the historical New England development patterns to auto-oriented sprawl like that seen across the rest of America. Many of these old commercial plazas are now struggling due to competition from more recent shopping centers and online shopping. Communities across the region are facing the question of what’s next for these properties?  Landborough’s experience at 123 Main Street suggests that re-envisioning these old commercial sites for the next century can benefit communities. Eyesores can be turned into assets. If even a fraction of the obsolete commercial sites were redeveloped for housing, it could help to meet the region’s housing needs, bolster municipal tax revenues, improve community character, and enhance sustainability, all without the environmental destruction and expense that goes along with development of natural areas.
      </p>
    </div>
    <div className="step" data-step="b" css={sectionStyle}>
      <p>
        Scroll and notice the change in map view; we zoomed in are focused on Natick. We also changed basemaps to show some additional context. Scroll up just a little bit and the circles come back/we zoom out. This is both a joy and peril of scrollytelling: you can go forward or backward, and you need to make sure it&apos;s a digestable experience either way.
      </p>
      <p>
        Again, most controls are still gone. Depending on the narrative, we might want to allow users to click and pan around, or jump to various places on the map.
      </p>
      <p>
        This map below provides an example of the analysis at the municipal level (Town of Natick). As expected, there are numerous suitable sites around the commuter rail stations. Less intuitive, however, is the analysis suggests some of the most suitable sites are located along Rt 9. This is likely due to larger parcels (increasing capacity potential) and the number of jobs located nearby. The maps providing a geographic and visual depiction of the suitability analysis. The analysis can also summarize for each individual parcel the various rankings and relative scores for the various criteria.
      </p>
    </div>
  </div>
);

export default SidebarText;
