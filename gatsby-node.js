const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const glob = require("glob");

const componentFileType = "js";

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const templatesPath = path.resolve(`./src/templates/`);

  let existingTemplateFiles = glob.sync(`${templatesPath}/**/*.js`, {
    dot: true
  });

  // console.log(existingTemplateFiles);

  return graphql(`
    {
      allWordpressWpCollections(filter: { post_status: { eq: "publish" } }) {
        edges {
          node {
            wordpress_id
            pathname
            post_type
            template_slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    _.each(result.data.allWordpressWpCollections.edges, edge => {
      const template = `${templatesPath}/${
        edge.node.template_slug
      }.${componentFileType}`;

      let usedTemplate = `${templatesPath}/default`;

      if (existingTemplateFiles.includes(template)) {
        usedTemplate = template;
      }

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
