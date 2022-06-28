# FCC Map

This [site](https://mapc.github.io/fcc-map/) is an interactive Mapbox visualization created for the [Digital Access Report](https://github.com/MAPC/digital-equity-report).

## Development

This site was built with [Gatsby](https://www.gatsbyjs.com/) and uses npm for package management. Install the Gatsby CLI with `npm i -g gatsby-cli`, then install local dependencies with `npm install`. Run the site with `gatsby develop` and clear the cache with `gatsby clean`. Create working branches off of the `develop` branch, then merge commits from `develop` into `main` when ready to deploy to production. 

## Mapbox

To edit base or source layers for the map, the credentials for [Mapbox](https://studio.mapbox.com/) can be found in [Dashlane](https://app.dashlane.com/login).

Tabular datasets must be uploaded first on the Datasets page, then exported to Tilesets in order to use and style. For spatial datasets containing polygon features, upload them directly up to Tilesets, making sure that they do not exceed 10MB and are projected using the EPSG:4326 coordinate system. 

## Deployment

This site is built from the `gh-pages` branch. To deploy changes, push code to the `main` branch, then run `npm run deploy`.
