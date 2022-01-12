# Rethinking the Retail Strip

*Formerly known as Retrofitting Suburbia*

This [site](https://mapc.github.io/retrofitting-search-map-embed/) is an interactive Mapbox visualization created for the [Rethinking the Retail Strip](http://rethinking-the-retail-strip.mapc.org/) report that presents commercial sites identified by MAPC's analysis as opportunities for redevelopment. 

## Development
This site was built with [Gatsby](https://www.gatsbyjs.com/) and uses yarn for package management. Install the Gatsby CLI with `npm install -g gatsby-cli`, then install local dependencies with `yarn install`. Run the site with `gatsby develop` and clear the cache with `gatsby clean`. Create working branches off of the `develop` branch, then merge commits from `develop` into `main` when ready to deploy to production. 

## Testing
`yarn test`

## Deployment
This site is built from the `gh-pages` branch. To deploy changes, push code to the `main` branch, then run `yarn deploy`.
