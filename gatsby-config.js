module.exports = {
  siteMetadata: {
    title: "GatsbyPress Starter"
  },
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "GatsbyPress Starter",
        short_name: "GatsbyPress",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        display: "minimal-ui",
        icon: "src/favicon.png" // This path is relative to the root of the site.
      }
    },
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve("./src/components/Layout")
      }
    },
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: [
          "poppins:300,400" // you can also specify font weights and styles
        ]
      }
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-emotion"
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "images"
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-wordpress",
      options: {
        name: "GatsbyPress Starter",
        short_name: "GatsbyPress",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        display: "minimal-ui",
        icon: "src/favicon.png", // This path is relative to the root of the site.
        // The base url to your WP site.
        baseUrl: "sunshine.bare.ca",
        // The protocol. This can be http or https.
        protocol: "https",
        // Use 'Advanced Custom Fields' Wordpress plugin
        useACF: true,
        // Include specific ACF Option Pages that have a set post ID
        // Regardless if an ID is set, the default options route will still be retrieved
        // Must be using V3 of ACF to REST to include these routes
        // Example: `["option_page_1", "option_page_2"]` will include the proper ACF option
        // routes with the ID option_page_1 and option_page_2
        // Dashes in IDs will be converted to underscores for use in GraphQL
        // acfOptionPageIds: [],
        // auth: {},
        // Set to true to debug endpoints on 'gatsby build'
        verboseOutput: false,
        // Exclude specific routes using glob parameters
        // See: https://github.com/isaacs/minimatch
        // Example:  `["/*/*/comments", "/yoast/**"]` will exclude routes ending in `comments` and
        // all routes that begin with `yoast` from fetch.
        excludedRoutes: [
          "/*/*/comments",
          "/yoast/**",
          "/oembed/**",
          "**/types",
          "**/statuses",
          "**/users/**",
          "**/users",
          "**/settings"
        ],
        // Search and Replace Urls across WordPress content.
        searchAndReplaceContentUrls: {
          sourceUrl: "https://sunshine.bare.ca(?!/wp-content/)",
          replacementUrl: ""
        }
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        include: "/src/visuals/svg/"
      }
    },
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ]
};
