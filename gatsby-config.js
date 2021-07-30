require('dotenv').config({
  path: '.env',
});

module.exports = {
  pathPrefix: "/retrofitting-search-map-embed",
  siteMetadata: {
    title: 'retrofitting-suburbia',
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [`${process.env.GOOGLE_ANALYTICS_ID}`],
        gtagConfig: {
          cookie_expires: 0,
        },
        pluginConfig: {
          head: false,
          respectDNT: true,
        },
      },
    },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data/`,
      },
    },
    'gatsby-transformer-csv',
  ],
};
