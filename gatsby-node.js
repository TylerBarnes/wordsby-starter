const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const glob = require("glob");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allWordpressWpCollections(filter: { post_status: { eq: "publish" } }) {
        edges {
          node {
            wordpress_id
            pathname
            post_type
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const templatesPath = path.resolve(`./src/templates/`);

    _.each(result.data.allWordpressWpCollections.edges, edge => {
      const template = edge.node.template_slug;

      // Default template slug
      let templateSlugPath = "default/index";

      const pageTemplate = `${templatesPath}/${templateSlugPath}.js`;

      createPage({
        path: edge.node.pathname,
        component: pageTemplate,
        context: {
          id: edge.node.wordpress_id
        }
      });
    });
  });
};
