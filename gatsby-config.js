require("dotenv").config();

const wordsbyConfig = {
  siteName: "Wordsby Starter",
  shortName: "Wordsby",
  siteDescription: "A Wordsby starter",
  url: {
    base: "wordsby.test",
    protocol: "http",
    pathPrefix: false,
    startUrl: false
  },
  manifest: {
    background_color: "#6b37bf",
    theme_color: "#6b37bf",
    display: "minimal-ui"
  },
  keys: {
    previewToken: process.env.PREVIEW_TOKEN,
    googleAnalyticsID: false
  }
};

const previewPrefix = require("wordsby/preview");
const fullUrl = `${wordsbyConfig.url.protocol}://${wordsbyConfig.url.base}`;

const gatsbyConfig = {
  pathPrefix: previewPrefix(wordsbyConfig.pathPrefix), // if you need to add a prefix to this site, pass it as a string eg. previewPrefix("/some-prefix").
  siteMetadata: {
    siteUrl: fullUrl
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: ["poppins:100,300,400,500"]
      }
    },
    {
      resolve: "gatsby-source-wordpress",
      options: {
        name: wordsbyConfig.siteName,
        short_name: wordsbyConfig.shortName,
        start_url: wordsbyConfig.url.startUrl
          ? wordsbyConfig.url.startUrl
          : "/",
        background_color: wordsbyConfig.manifest.background_color,
        theme_color: wordsbyConfig.manifest.theme_color,
        display: "minimal-ui",
        icon: "src/favicon.png",
        baseUrl: wordsbyConfig.url.base,
        protocol: wordsbyConfig.url.protocol,
        useACF: false, // this should be false as the wordsby rest api endpoint has ACF built in.
        verboseOutput: false,
        includedRoutes: [
          "**/wp-api-menus/v2/",
          "**/wp-api-menus/v2/**",
          "**/wp/v1/collections",
          "**/wp/v1/all-options",
          "**/wp/v1/tax-terms",
          "**/wp/v2/media"
        ]
      }
    },
    {
      resolve: "wordsby",
      options: {
        previewToken: wordsbyConfig.keys.previewToken
      }
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/static/`
      }
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: wordsbyConfig.themeColor
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-catch-links",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage(filter: {context: {id: {ne: null}}}) {
            edges {
              node {
                path
                context {
                  id
                }
              }
            }
          }
      }`
      }
    },
    {
      resolve: "gatsby-plugin-transition-link",
      options: {
        layout: require.resolve(`./src/components/layouts/index.js`)
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/
        }
      }
    },
    "gatsby-plugin-netlify",
    "gatsby-plugin-netlify-cache"
  ]
};

if (process.env.NODE_ENV === "production" && !process.env.WORDSBY_PREVIEW) {
  gatsbyConfig.plugins.push("gatsby-plugin-offline");
}

if (process.env.NODE_ENV === "production") {
  gatsbyConfig.plugins.push("gatsby-plugin-favicon");
}

if (
  wordsbyConfig.keys.googleAnalyticsID &&
  process.env.NODE_ENV === "production" &&
  !process.env.WORDSBY_PREVIEW
) {
  gatsbyConfig.plugins.push({
    resolve: "gatsby-plugin-google-analytics",
    options: {
      trackingId: wordsbyConfig.keys.googleAnalyticsID
    }
  });
}

module.exports = gatsbyConfig;
