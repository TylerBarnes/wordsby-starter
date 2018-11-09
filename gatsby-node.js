const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const glob = require("glob");
const createTemplatesJson = require("./gpress-core/createTemplatesJson");

const componentFileType = "js";
const templatesPath = path.resolve(`./src/templates/`);
const defaultTemplate = `${templatesPath}/single/index.js`;

let existingTemplateFiles = glob.sync(`${templatesPath}/**/*.js`, {
  dot: true
});

createTemplatesJson({ existingTemplateFiles, templatesPath });

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  if (!fs.existsSync(defaultTemplate)) {
    throw `default template doesn't exist at ${defaultTemplate}`;
  }

  const preview = process.env.GATSBYPRESS_PREVIEW;

  if (preview) {
    return graphql(`
      {
        wordpressWpCollections {
          wordpress_id
        }
      }
    `)
      .then(result => {
        if (result.errors) {
          result.errors.forEach(e => console.error(e.toString()));
          return Promise.reject(result.errors);
        }

        _.each(existingTemplateFiles, template => {
          const indexOfFilename = template.lastIndexOf("/");
          const indexOfExtension = template.lastIndexOf(".js");
          const fileName = template.substring(
            indexOfFilename + 1,
            indexOfExtension
          );
          const indexOfFolderName = template.lastIndexOf(
            "/",
            indexOfFilename - 1
          );
          const folderName =
            "/" + template.substring(indexOfFolderName + 1, indexOfFilename);

          const pathname = `${
            folderName !== "/templates" ? folderName : ""
          }/${fileName}`;

          createPage({
            path: pathname,
            component: template,
            context: {
              id: result.data.wordpressWpCollections.wordpress_id,
              preview: true
            }
          });
        });
      })
      .catch(err => {
        throw "There was a problem building the WP preview templates";
      });
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
      throw "Either your WP site is down, your WP connection details are wrong or GatsbyPress Admin isn't active on the WP install. This starter will not work properly without fixing those three things. Download the admin theme at https://github.com/TylerBarnes/GatsbyPress-Admin";
    });
};
