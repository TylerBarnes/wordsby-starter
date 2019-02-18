require("dotenv").config();

const gatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://wordsby-starter.netlify.com`
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
      resolve: "gatsby-source-filesystem",
      options: {
        name: "wordsby-uploads",
        path: `${__dirname}/wordsby/uploads/`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "wordsby-data",
        path: `${__dirname}/wordsby/data/`
      }
    },
    {
      resolve: "gatsby-plugin-wordsby",
      options: {
        inlineImages: {
          recursive: true,
          maxWidth: 500
        },
        instantPublish: false
      }
    },
    {
      resolve: "gatsby-plugin-transition-link",
      options: {
        layout: require.resolve(`./src/components/layouts/index.js`)
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
        color: "rebeccapurple"
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
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/
        }
      }
    },
    {
      resolve: "gatsby-plugin-netlify",
      options: {
        headers: {
          "/*": [
            // these headers are default except x-frame-options is omitted to allow previewing the site via iframe
            `X-XSS-Protection: 1; mode=block`,
            `X-Content-Type-Options: nosniff`
          ]
        },
        mergeSecurityHeaders: false
      }
    },
    "gatsby-plugin-netlify-cache"
  ]
};

if (process.env.NODE_ENV === "production") {
  // gatsbyConfig.plugins.push("gatsby-plugin-offline");
  gatsbyConfig.plugins.push("gatsby-plugin-remove-serviceworker");
  gatsbyConfig.plugins.push("gatsby-plugin-favicon");
}

module.exports = gatsbyConfig;
