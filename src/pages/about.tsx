/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import { themeColors, fonts, aboutPageStyle } from '../utils/theme';
import { Link } from 'gatsby';
import siteLogo from '../images/logo.png';
import mapcLogo from '../images/mapc_logo.svg';

const AboutPage: React.FC = () => {
    return (
      <div css={aboutPageStyle}>

          <header>
            {/* need retrofit logo here */}
            <img src={siteLogo} alt="retrofit logo" />
            <Link to="/">Back to Rethinking the Suburban Strip</Link>
          </header>

          <main>
            <h1>Rethinking the Suburban Strip</h1>

            <h3>About Rethinking the Suburban Strip</h3>
            <p>As the suburbs have aged in many places across the country, unsightly strip malls are a frequent feature of the suburban landscape. They have taken their place within a larger pattern of unsustainable development, alongside underused shopping malls, monotonous residential areas, and out-of-the-way office parks, all "served" by unsafe and unwelcoming arterial roadways that disconnect neighborhoods and pose safety hazards to anyone who dares walk, bike, use a wheelchair, or take transit.</p>
            <p>This work, Rethinking the Suburban Strip, focuses on opportunities presented by strip malls and similar retail centers. It's part of a larger framework, often known as suburban retrofitting, that is, taking typical single-use, auto-centric, monotonous suburban forms, and redeveloping them into walkable neighborhoods with a sense of place.</p>

            <h1>The Most Promising Opportunities</h1>
            <h3>The Suburbs' Opportunity</h3>
            <p>Greater Boston today is a different region than it was in the 1960’s. Every municipality in the region is more racially and ethnically diverse today—and becoming more so every decade. The education, health, and technology sectors that have defined the region for generations are thriving in today’s economy, bringing opportunity and new residents to the region. The region’s population is growing faster than its municipalities can keep up with—there is not enough housing to satisfy demand, pushing prices to an all-time premium and making it all but impossible for lower- and even moderate-income households to find affordable homes. And the Baby Boomers who led the expansion of the suburbs are now increasingly empty nesters who are retiring in great numbers—leaving more job vacancies than we have workers, but not leaving their homes at the rate needed to house new workers. Without intervention, the success of the region and subsequent squeeze on its housing could lead to its downfall.</p>
            <p>While the issues facing the region and its suburbs may be daunting, suburban communities are a critical part of the solution.</p>
            <p>Drive around any community in the region and you’ll see properties that are not living up to their potential: struggling retail plazas, vacant industrial buildings, single-story commercial properties in multi-story town centers. While these properties may have been vital in their time, and may still support some economic activity, they are increasingly out of step with the times. Using information from municipal assessors and many other data sources, such as____, MAPC mapped commercial properties across the region and identified those that might be good candidates for redevelopment: lower density commercial properties, built prior to [2000], with the following threshold criteria. We excluded properties with characteristics X, Y, Z.  In doing so we identified [x,000] sites with a total of [X,000] parcels. They cover XX square miles, an area equivalent to Boston from Charlestown to Nubian Square</p>
            <p>Strip mall redevelopment is one piece of the suburban puzzle. We’ve focused on this suburban form – broadly defined to include any single-story, underutilized, auto-centric retail center – for several reasons:</p>
            <ul>
              <li><p>They’re ubiquitous. Virtually every community has them and therefore there is potential for change throughout the region.</p></li>
              <li><p>As single-story, single-use structures with abundant parking, they are often under-utilized by various measures—even during times when they were thriving business centers. The changing nature of retail, where many goods are now ordered online, has exacerbated underutilization to the point of vacancy and even dilapidation.</p></li>
              <li><p>Parcels containing strip malls are typically small enough that they can be redeveloped in a relatively short amount of time. This contrasts with other, larger suburban forms, such as office parks and large, regional malls, which could take a decade of planning before implementation is feasible.</p></li>
              <li><p>Individual parcels are generally modest in size, but strip malls often cluster together multiple smaller parcels. Those clustered parcels, therefore, can be redeveloped incrementally to create cohesive neighborhoods over the long term.</p></li>
              <li><p>Of various typical suburban forms, strip malls are often easier politically to re-envision than, for example, single family neighborhoods.</p></li>
            </ul>

            <h3>Navigating the Map</h3>
            <p>This tool can help identify promising sites for redevelopment, but it is not a substitute for good planning and design. There is no one-size fits all prescription for good mixed-use or multifamily development, but there are several principles to consider to help ensure the success of a mixed-use or multifamliy project: </p>
            <ul>
              <li><p>The goal of suburban retrofits, including strip mall redevelopments, should be to create a cohesive, functional, and welcoming neighborhood.First, iIndividual sites generally should not be considered in a vacuum. The goal of suburban retrofits, including strip mall redevelopments, should be to create a cohesive, functional, and welcoming neighborhood. Redevelopment will likely occur incrementally, site by site, over a number of years. Therefore, aA holistic plan that sets a vision for the area with land use, economic development, transportation, regulatory, and design recommendations can help ensure that redevelopment occurs in a cohesive, integrated manner.</p></li>
              <li><p>From a design perspective, primacy ority should be given to enhancing walkability both within the site and to adjacent areas. The presence of sidewalks and crosswalks are an important but insufficient element to foster walkability. Buildings should be sited to frame the primary pedestrian flows and parking should be located in discrete locations. There are numerous resources on the design principles for suburban retrofits, including [insert links]</p></li>
              <li><p>Site identification, redesign, and access to occupancy should Beyond design, a key concern is harnessing suburban retrofit projects to enhance equity both for residents and commercial tenants. Homes should be affordable for people across the socioeconomic spectrum. This often requires a number of regulatory tools, including inclusionary zoning requirements. On the commercial sideCommercial sites should be affordable to small, independent, and women or person of color owned businesses—and their tenancy should be prioritized. Such businesses often occupy , eexisting strip malls often contain a number of small and independent businessesbecause they tend to have affordable rents. Again, aA variety of tools [such as/including] can ensure that these unique businesses are not entirely displaced for large chain businesses.</p></li>
            </ul>

            <h1>Overall Scores</h1>

            <h3>Growth Potential</h3>
            <p>This tool can help identify promising sites for redevelopment, but it is not a substitute for good planning and design. There is no one-size fits all prescription for good mixed-use or multifamily development, but there are several principles to consider to help ensure the success of a mixed-use or multifamliy project.</p>

            <h3>Healthy Communities</h3>
            <p>This tool can help identify promising sites for redevelopment, but it is not a substitute for good planning and design. There is no one-size fits all prescription for good mixed-use or multifamily development, but there are several principles to consider to help ensure the success of a mixed-use or multifamliy project.</p>

            <h3>Healthy Watersheds</h3>
            <p>This tool can help identify promising sites for redevelopment, but it is not a substitute for good planning and design. There is no one-size fits all prescription for good mixed-use or multifamily development, but there are several principles to consider to help ensure the success of a mixed-use or multifamliy project.</p>

            <h3>Travel Choices</h3>
            <p>This tool can help identify promising sites for redevelopment, but it is not a substitute for good planning and design. There is no one-size fits all prescription for good mixed-use or multifamily development, but there are several principles to consider to help ensure the success of a mixed-use or multifamliy project.</p>

            <h3>Opportunities by Quintile</h3>
            <p>This tool can help identify promising sites for redevelopment, but it is not a substitute for good planning and design. There is no one-size fits all prescription for good mixed-use or multifamily development, but there are several principles to consider to help ensure the success of a mixed-use or multifamliy project.</p>

            <h1>Contact Us</h1>
            <p>We are eager to improve Retrofitting Suburbia for planners, developers, and engaged citizens alike. Please contact us at <a href="mailto:">Email Address</a> with any concerns, questions, or feedback you'd like to share, and we will be sure to get back to you.</p>

            <h1>Disclaimer</h1>
            <p>
              <small>Rethinking the Suburban Strip data developed by the Metropolitan Area Planning Council (“MAPC”) is expressly provided "AS IS." MAPC MAKES NO WARRANTY OF ANY KIND, EXPRESS, IMPLIED, IN FACT OR ARISING BY OPERATION OF LAW, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT AND DATA ACCURACY. MAPC NEITHER REPRESENTS NOR WARRANTS THAT THE OPERATION OF THE MASSBUILDS WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT ANY DEFECTS WILL BE CORRECTED. MAPC DOES NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING THE USE OF MASSBUILDS OR THE RESULTS THEREOF, INCLUDING BUT NOT LIMITED TO THE CORRECTNESS, ACCURACY, RELIABILITY, OR USEFULNESS OF THE SOFTWARE.</small>
            </p>
          </main>

          <footer>
            <img src={mapcLogo} alt="MAPC Logo" />
          </footer>

      </div>
    );
};

export default AboutPage;