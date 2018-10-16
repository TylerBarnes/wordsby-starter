const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const glob = require("glob");

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

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const templatesPath = path.resolve(`./src/templates`);
  let existingTemplateFiles = glob.sync(`${templatesPath}/**/*.js`, {
    dot: true
  });

  let allTemplates = existingTemplateFiles.map(filePath => {
    return {
      name: filePath.substring(filePath.lastIndexOf("/") + 1),
      path: filePath,
      default: filePath.indexOf("/defaults/") > -1
    };
  });

  const doesTemplateTemplateExist = allTemplates.some(
    file => file.name === ".default.js"
  );

  const defaultTemplateTemplateContents = doesTemplateTemplateExist
    ? fs.readFileSync(`${templatesPath}/defaults/.default.js`, "utf8")
    : false;

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

    let postTypes = result.data.allWordpressWpTypes.edges;

    postTypes.map(({ node: { slug: postType } }) => {
      // const postTypeSlug = postType;
      const filename = `${postType}.js`;

      // handle custom post types need to be prefixed with Wp in graphql
      if (postType !== "post" && postType !== "page") {
        postType = `wp_${postType}`;
      }

      // make the returned post types into camel case to pass to json graphql.
      postTypeGraphqlSlug = `all_wordpress_${postType}`;

      const postTypeGraphqlCamel = _.camelCase(postTypeGraphqlSlug);

      // if the post type doesn't have a default template then create one here.
      if (
        !allTemplates.some(template => template.name === filename) &&
        doesTemplateTemplateExist
      ) {
        console.log(
          `${filename} default template not found, creating it now from .default.js`
        );
        // create template from default template here
        const inFileGraphQLCamel = _.camelCase(`wordpress_${postType}`);

        let templateContents = _.replace(
          defaultTemplateTemplateContents,
          /wordpressDefault/g,
          inFileGraphQLCamel
        );
        templateContents = _.replace(
          templateContents,
          /defaultQuery/g,
          `${inFileGraphQLCamel}Query`
        );
        templateContents = _.replace(
          templateContents,
          /DefaultById/g,
          `${inFileGraphQLCamel}ById`
        );

        fs.writeFileSync(
          `${templatesPath}/defaults/${filename}`,
          templateContents,
          "utf8"
        );

        allTemplates.push({
          name: filename,
          path: `${templatesPath}/defaults/${filename}`,
          default: true
        });
      } else if (
        !allTemplates.some(template => template.name === filename) &&
        !doesTemplateTemplateExist
      ) {
        console.error(
          `.default.js does not exist. Please add it so post types can be generated.`
        );
      }

      // get the dynamic post types
      return graphql(`{
                ${postTypeGraphqlCamel} {
                    edges {
                        node {
                            id
                            slug
                            status
                            type
                            title
                            template
                            link
                        }
                    }
                }
            }`).then(result => {
        // get the dynamic post types posts
        const posts = result.data[postTypeGraphqlCamel].edges;

        _.each(posts, ({ node: post }) => {
          const useDefault = post.template === "";
          const templateName = post.template.replace(".php", "");

          const usedPageTemplate = useDefault
            ? `${templatesPath}/defaults/${post.type}.js`
            : `${templatesPath}/${templateName}.js`;
          // const templatePath = `${templatesPath}/${templateName}.js`;
          // const defaultTemplatePath = `${templatesPath}/defaults/${postTypeSlug}.js`;
          // const defaultTemplateTemplate = `${templatesPath}/defaults/.default.js`;

          // let usedPageTemplate;

          // // let doesDefaultTemplateTemplateExist = false;
          // let doesTemplateExist = false;

          // // check if template exists
          // if (fs.existsSync(templatePath)) {
          //   usedPageTemplate = templatePath;
          //   doesTemplateExist = true;
          // }

          // // if no template then check if default template exists
          // if (fs.existsSync(defaultTemplatePath)) {
          //   usedPageTemplate = defaultTemplatePath;
          //   doesTemplateExist = true;
          // }

          // // if no other templates but the default.js then create a default template in .generated/ from the default.js template template.
          // if (!doesTemplateExist && fs.existsSync(defaultTemplateTemplate)) {
          //   // let doesDefaultTemplateTemplateExist = true;
          //   // doesTemplateExist = true;
          //   // create file from template
          //   // then set it as the template to use
          // }

          // // if a template exists then create the page
          // if (doesTemplateExist) {
          createPage({
            path: post.link,
            component: usedPageTemplate,
            context: {
              id: post.id
            }
          });
          // } else {
          //   console.warn(
          //     `No template found for "${post.title}" (${post.type}).`
          //   );
          // }
        });
      });
    });
  });
};
