module.exports = {
  pathPrefix: "/preview",
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
    // "gatsby-plugin-offline",
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
        icon: "src/favicon.png",
        baseUrl: "gatsbywpmamp.test",
        protocol: "http",
        useACF: true,
        verboseOutput: false,
        // Exclude specific routes using glob parameters
        // See: https://github.com/isaacs/minimatch
        // Example:  `["/*/*/comments", "/yoast/**"]` will exclude routes ending in `comments` and
        // all routes that begin with `yoast` from fetch.
        excludedRoutes: [
          "/*/*/comments",
          "/yoast/**",
          "/oembed/**",
          "**/statuses",
          "**/users/**",
          "**/users",
          "**/settings",
          "**/pages/**",
          "**/pages",
          "**/posts/**",
          "**/posts",
          "**/menu-locations/**",
          "**/menu-locations",
          "**/menus/**",
          "**/wp/v1",
          "**/wp/v2",
          "**/acf/v3/categories",
          "**/acf/v3/categories/**",
          "**/acf/v3/posts/**",
          "**/acf/v3/posts",
          "**/acf/v3/pages/**",
          "**/acf/v3/pages",
          "**/acf/v3/media/**",
          "**/acf/v3/media",
          "**/acf/v3/users/**",
          "**/acf/v3/users",
          "**/preview",
          "**/preview/**"
        ]
        // Search and Replace Urls across WordPress content.
        // searchAndReplaceContentUrls: {
        //   sourceUrl: "https://sunshine.bare.ca(?!/wp-content/)",
        //   replacementUrl: ""
        // }
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
