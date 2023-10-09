// gatsby-config.js

module.exports = {
  siteMetadata: {
    title: `statusView`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Lato`,
            file: `https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/public/static/`, // Use __dirname to get an absolute path to the directory where gatsby-config.js exists
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/public/static/`, // Use __dirname to get an absolute path to the directory where gatsby-config.js exists
      },
    },
    `gatsby-transformer-csv`,
  ],
};
