const _ = require("lodash");
const path = require("path");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allWordpressPage {
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
    }
  `)
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()));
        return Promise.reject(result.errors);
      }

      const templatePath = path.resolve(`./src/templates/pages`);

      _.each(result.data.allWordpressPage.edges, edge => {
        const template = edge.node.template;

        // Default template slug in wordpress
        let templateSlug = "page";

        // Remove file extension
        if (template !== "") {
          templateSlug = template.replace(".php", "");
        }

        const pageTemplate = `${templatePath}/${templateSlug}.js`;

        createPage({
          path: edge.node.link,
          component: pageTemplate,
          context: {
            id: edge.node.id
          }
        });
      });
    })
    .then(() => {
      return graphql(`
        {
          allWordpressPost {
            edges {
              node {
                id
                type
                slug
                link
                tags {
                  name
                  slug
                }
                categories {
                  name
                  slug
                }
              }
            }
          }
          # Add custom post types here
          # allWordpressWpTeam {
          #   edges {
          #     node {
          #       id
          #       type
          #       slug
          #       link
          #     }
          #   }
          # }
          # allWordpressWpFeaturedProjects {
          #   edges {
          #     node {
          #       id
          #       type
          #       slug
          #       link
          #     }
          #   }
          # }
        }
      `);
    })
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()));
        return Promise.reject(result.errors);
      }

      const templatePath = path.resolve(`./src/templates/posts`);

      // Build a list of categories and tags
      const categories = [];
      const tags = [];

      // Iterate over the array of posts
      _.each(result.data.allWordpressPost.edges, edge => {
        const templateSlug = edge.node.type;
        const postTemplate = `${templatePath}/${templateSlug}.js`;

        // Add this post's categories and tags to the global list
        _.each(edge.node.tags, tag => {
          tags.push(tag);
        });
        _.each(edge.node.categories, category => {
          categories.push(category);
        });
        createPage({
          path: edge.node.link,
          component: postTemplate,
          context: {
            id: edge.node.id
          }
        });
      });

      const tagsTemplate = path.resolve(`./src/templates/taxonomies/tag.js`);
      const categoriesTemplate = path.resolve(
        `./src/templates/taxonomies/category.js`
      );

      // Create a unique list of categories and tags
      const uniqueCategories = _.uniqBy(categories, "slug");
      const uniqueTags = _.uniqBy(tags, "slug");

      // For each category and tag, create a Gatsby page
      _.each(uniqueCategories, cat => {
        createPage({
          path: `/categories/${cat.slug}/`,
          component: categoriesTemplate,
          context: {
            name: cat.name,
            slug: cat.slug
          }
        });
      });
      _.each(uniqueTags, tag => {
        createPage({
          path: `/tags/${tag.slug}/`,
          component: tagsTemplate,
          context: {
            name: tag.name,
            slug: tag.slug
          }
        });
      });

      // // Custom post type team
      // _.each(result.data.allWordpressWpTeam.edges, edge => {
      //   const templateSlug = edge.node.type;
      //   const postTemplate = `${templatePath}/${templateSlug}.js`;

      //   createPage({
      //     path: edge.node.link,
      //     component: postTemplate,
      //     context: {
      //       id: edge.node.id
      //     }
      //   });
      // });

      // // Custom post type projects
      // _.each(result.data.allWordpressWpFeaturedProjects.edges, edge => {
      //   const templateSlug = edge.node.type;
      //   const postTemplate = `${templatePath}/${templateSlug}.js`;

      //   createPage({
      //     path: edge.node.link,
      //     component: postTemplate,
      //     context: {
      //       id: edge.node.id
      //     }
      //   });
      // });
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
