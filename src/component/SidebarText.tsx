/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/react';
import image from '../images/visualization.png';

const sectionStyle = css`
  margin: 3rem;
  min-height: 100vh;
`;

const SidebarText: React.FC = () => (
  <div>
    <div className="step" data-step="a" css={sectionStyle}>
      <h2>Section One</h2>
      <p>
        Introduce the idea of &quot;suburban retrofit&quot; and highlight how many spots there are on the map (over 5,000!). Each of these represents at least one parcel, but when zoomed out it&apos;s a little hard to tell how much space that is. Insert snippet about 10 square miles---that&apos;s a lot of Boston, and basically all of Woburn!
      </p>
      <p>
        Most of the interactivity has been taken away from the map because it is currently serving as a static visual. If all of the controls were still present, it would be easy for the user to get &quot;off track&quot; from the story and difficult to bring them back in.
      </p>
      <p>
        This can go on arbitrarily long, but we&apos;ll cut it off here. Just to show that we could include photos or charts here, though, here&apos;s a screencap of a Vega chart I made based off of the percentage of square miles available in each subregion:
      </p>
      <img src={image} alt="Pie chart of square mileage across region" css={css`width: 200px;`} />
    </div>
    <div className="step" data-step="b" css={sectionStyle}>
      <h2>Section Two: Zoom Into Natick</h2>
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
    <div className="step" data-step="c" css={sectionStyle}>
      <h2>Section Three</h2>
      <p>
        Now we&apos;re viewing the parcel layer instead of the dots. Here, it&apos;s clear that the dark blue parcels are the larger ones along route 9, whereas the parcels closer to commuter rail stops are smaller.
      </p>
    </div>
  </div>
);

export default SidebarText;
