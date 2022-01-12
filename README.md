# Rethinking the Retail Strip

*Formerly known as Retrofitting Suburbia*

This [site](https://mapc.github.io/retrofitting-search-map-embed/) is an interactive Mapbox visualization created for the [Rethinking the Retail Strip](http://rethinking-the-retail-strip.mapc.org/) report that presents commercial sites identified by MAPC's analysis as opportunities for redevelopment. 

## Development

This site was built with [Gatsby](https://www.gatsbyjs.com/) and uses yarn for package management. Install the Gatsby CLI with `yarn global add gatsby-cli`, then install local dependencies with `yarn install`. Run the site with `gatsby develop` and clear the cache with `gatsby clean`. Create working branches off of the `develop` branch, then merge commits from `develop` into `main` when ready to deploy to production. 

## Mapbox

To edit base or source layers for the map, the credentials for [Mapbox](https://studio.mapbox.com/) can be found in Dashlane.

Tabular datasets must be uploaded first on the Datasets page, then exported to Tilesets in order to use and style. For spatial datasets containing polygon features, upload them directly up to Tilesets, making sure that they do not exceed 10MB and are projected using the EPSG:4326 coordinate system. 

## Testing

`yarn test`

## Deployment

This site is built from the `gh-pages` branch. To deploy changes, push code to the `main` branch, then run `yarn deploy`.
