const FormData = require("form-data");
const fs = require("fs");

const config = require("../gatsby-config");
const wordpressconfig = config.plugins.filter(
  plugin => plugin.resolve === "gatsby-source-wordpress"
)[0].options;

if (!wordpressconfig || !wordpressconfig.previewApiKeys) {
  throw Error(
    `It looks like gatsby-source-wordpress is not installed or configured properly. This starter requires it.`
  );
}

const wpUrl = `${wordpressconfig.protocol}://${wordpressconfig.baseUrl}`;

// const public_key = wordpressconfig.previewApiKeys.public;
const private_key = wordpressconfig.previewApiKeys.private;

if (!private_key) {
  throw Error(`You need to specify a private api key to upload previews.`);
}

const uploader_url = `${wpUrl}`;

var form = new FormData();

form.append("apikey", private_key);
form.append("gatsbypress_previews", "gatsbypress_previews");
form.append("previews", fs.createReadStream("./templates-previews.zip"));

form.submit(uploader_url, function(err, res) {
  if (res.statusCode !== 200) {
    console.error("Preview Files not uploaded. Check your settings.");
    console.error(res.statusCode);
    console.error(res.statusMessage);
  } else {
    console.log("Preview files uploaded successfully");
  }

  res.resume();
});
