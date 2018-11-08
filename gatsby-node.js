const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const glob = require("glob");

const componentFileType = "js";

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const templatesPath = path.resolve(`./src/templates/`);
  const defaultTemplate = `${templatesPath}/single/index.js`;

  let existingTemplateFiles = glob.sync(`${templatesPath}/**/*.js`, {
    dot: true
  });

  if (!fs.existsSync(defaultTemplate)) {
    throw `default template doesn't exist at ${defaultTemplate}`;
  }

  const previewMode = process.env.GATSBYPRESS_PREVIEW;

  if (previewMode) {
    _.each(existingTemplateFiles, template => {
      const indexOfFilename = template.lastIndexOf("/");
      const indexOfExtension = template.lastIndexOf(".js");
      const filename = template.substring(
        indexOfFilename + 1,
        indexOfExtension
      );
      const indexOfFolderName = template.lastIndexOf("/", indexOfFilename - 1);
      const folderName =
        "/" + template.substring(indexOfFolderName + 1, indexOfFilename);

      const pathname = `${folderName !== "/templates" &&
        folderName}/${fileName}`;

      createPage({
        path: `/preview/`,
        component: path.resolve("./src/components/Preview.js"),
        context: {
          id: post.node.wordpress_id
        }
      });
    });

    return;
  }

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
  `)
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()));
        return Promise.reject(result.errors);
      }

      const posts = result.data.allWordpressWpCollections.edges;

      _.each(posts, post => {
        const template = `${templatesPath}/${
          post.node.template_slug
        }.${componentFileType}`;

        let usedTemplate;

        if (existingTemplateFiles.includes(template)) {
          usedTemplate = template;
        } else {
          usedTemplate = defaultTemplate;
        }

        createPage({
          path: post.node.pathname,
          component: usedTemplate,
          context: {
            id: post.node.wordpress_id
          }
        });
      });
    })
    .catch(err => {
      throw "GatsbyPress Admin may not be active on the WP install! This starter will not work properly without it.";
    });
};
