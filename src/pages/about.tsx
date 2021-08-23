/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts, aboutPageStyle } from '../utils/theme';
import { Link } from 'gatsby';

const AboutPage: React.FC = () => {
    return (
      <div css={aboutPageStyle}>

          <header>
            {/* need retrofit logo here */}
            <img src="../images/logo.png" alt="" />
            <Link to="/">Back to Retrofitting Suburbia</Link>
          </header>

          <main>
            <h1>About Retrofitting Suburbia</h1>

            <h3>What is Retrofitting Suburbia?</h3>
            <p>MassBuilds is a detailed, visual database with information on real estate developments in the Greater Boston region. By creating an account, you can download both spatial (.shp) and tabular (.csv) versions of the development data available on this site.</p>

            <h3>What sorts of data can I find in Retrofitting Suburbia?</h3>
            <p>Thanks to our partners and collaborators, MassBuilds has specific details about real estate developments including but not limited to: project status, estimated year of completion, commercial square footage, number of housing units, number of parking spots, total stories and/or height, and a brief description for each development.</p>

            <h3>I have a question that is not listed above, or I am having trouble using Retrofitting Suburbia. Who can I contact?</h3>
            <p>We are eager to improve Retrofitting Suburbia for planners, developers, and engaged citizens alike. Please contact us at <a href="mailto:">Email Address</a> with any concerns, questions, or feedback you'd like to share, and we will be sure to get back to you.</p>

            <h1>The Most Promising Opportunities</h1>

            <h3>Navigating the Map</h3>
            <p>If you are visiting the site and do not want to make an account, you can see project descriptions, browse our map, and filter projects by location or attribute.</p>

            <h3>Opportunities by Quintile</h3>
            <p>Any site visitor can become a registered user by creating an account. Registered users may download data and suggest new developments and edits to projects that will be moderated and verified by MAPC staff before they are added to MassBuilds. We try to review moderations within a week.</p>
            <p>To become a Registered User, simply sign up for an account on MassBuilds by opening the right-hand menu and clicking 'Sign up here'. State, regional, and municipal officials may request additional privileges for their account by requesting verified status when they sign up.</p>
            <p>When you are logged in to your MassBuilds account, you will receive dashboard notifications on the status of your suggested additions and edits.</p>

            <h1>Overall Scores</h1>

            <h3>Growth Potential</h3>
            <p>If you are visiting the site and do not want to make an account, you can see project descriptions, browse our map, and filter projects by location or attribute.</p>

            <h3>Healthy Communities</h3>
            <p>Any site visitor can become a registered user by creating an account. Registered users may download data and suggest new developments and edits to projects that will be moderated and verified by MAPC staff before they are added to MassBuilds. We try to review moderations within a week.</p>
            <p>To become a Registered User, simply sign up for an account on MassBuilds by opening the right-hand menu and clicking 'Sign up here'. State, regional, and municipal officials may request additional privileges for their account by requesting verified status when they sign up.</p>
            <p>When you are logged in to your MassBuilds account, you will receive dashboard notifications on the status of your suggested additions and edits.</p>

            <h3>Healthy Watersheds</h3>
            <p>Members of Regional Planning Agencies and other relevant state/quasi-governmental agencies who are Verified Users may submit new developments and edit developments created by the same account without moderation from MAPC staff. When you sign up for an account on MassBuilds, you will be asked if you are an official representative of a municipal or state governmental agency or relevant quasi-governmental agency. If you select yes, your credentials will be verified by an MAPC staff member. Once verified, you will be able to add projects and edit your own developments without moderation by MAPC staff. You will not be able to moderate others’ developments.</p>

            <h3>Travel Choices</h3>
            <p>This dataset is meant to be inclusive of building developments only (for example, street improvements would not be included). There’s no minimum size requirement for projects, but we ask that you only add projects that would be considered “impactful” to a community.</p>
            <p>Still unsure if you should add it? Here are some general guidelines:</p>
 
            {/*<h3>Housing projects</h3>
            <ul>
              <li>Rural/suburban communities: = 10 units</li>
              <li>Urban communities: = 20 units</li>
            </ul>

            <h3>Commercial projects</h3>
            <ul>
              <li>Rural/suburban communities: = 20,000 sqft</li>
              <li>Urban communities: = 50,000 sqft</li>
            </ul> */}

            <h1>Disclaimer</h1>
            <p>
              <small>MassBuilds data developed by the Metropolitan Area Planning Council (“MAPC”) is expressly provided "AS IS." MAPC MAKES NO WARRANTY OF ANY KIND, EXPRESS, IMPLIED, IN FACT OR ARISING BY OPERATION OF LAW, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT AND DATA ACCURACY. MAPC NEITHER REPRESENTS NOR WARRANTS THAT THE OPERATION OF THE MASSBUILDS WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT ANY DEFECTS WILL BE CORRECTED. MAPC DOES NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING THE USE OF MASSBUILDS OR THE RESULTS THEREOF, INCLUDING BUT NOT LIMITED TO THE CORRECTNESS, ACCURACY, RELIABILITY, OR USEFULNESS OF THE SOFTWARE.</small>
            </p>
          </main>

          <footer>
            <img src="../images/mapc_logo.svg" alt="" />
          </footer>

      </div>
    );
};

export default AboutPage;