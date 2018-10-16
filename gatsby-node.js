const _ = require("lodash");
const path = require("path");
const fs = require("fs");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allWordpressWpTypes(filter: { slug: { ne: "attachment" } }) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    result.data.allWordpressWpTypes.edges.map(
      ({ node: { slug: postType } }) => {
        const postTypeSlug = postType;

        // handle custom post types needing to be prefixed with Wp
        if (postType !== "post" && postType !== "page") {
          postType = `wp_${postType}`;
        }

        // make the returned post types into camel case to pass to json graphql.
        postTypeGraphqlSlug = `all_wordpress_${postType}`;
        const postTypeGraphqlCamel = _.camelCase(postTypeGraphqlSlug);

        return graphql(`{
                ${postTypeGraphqlCamel} {
                    edges {
                        node {
                            id
                            slug
                            status
                            template
                            link
                        }
                    }
                }
            }`).then(result => {
          const postMetaData = result.data[postTypeGraphqlCamel].edges;

          const templatePath = path.resolve(`./src/templates`);

          _.each(postMetaData, edge => {
            const template = edge.node.template;

            // Default template slug in wordpress
            let templateSlug = `post-type-defaults/${postTypeSlug}`;

            // Remove file extension
            if (template !== "") {
              templateSlug = template.replace(".php", "");
            }

            const pageTemplate = `${templatePath}/${templateSlug}.js`;

            if (!fs.existsSync(pageTemplate)) {
              console.warn(
                `${pageTemplate} doesn't exist. skipping creation of page`
              );

              return;
            }

            createPage({
              path: edge.node.link,
              component: pageTemplate,
              context: {
                id: edge.node.id
              }
            });
          });
        });
      }
    );
  });
};

// Use this to nullify the loader for any browser only packages
// exports.onCreateWebpackConfig = ({ actions, stage }) => {
//   if (stage === "build-html") {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /react-mapbox-gl/,
//             use: ["null-loader"]
//           }
//         ]
//       }
//     });
//   }
// };
