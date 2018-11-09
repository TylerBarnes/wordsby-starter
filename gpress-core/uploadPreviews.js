var FormData = require("form-data");
var fs = require("fs");

var form = new FormData();
form.append("apikey", "yep");
form.append("previews", fs.createReadStream("./templates-previews.zip"));

form.submit(
  "http://gatsbywpmamp.test/wp-content/themes/gatsbypress-admin/webhooks/receivePreviews.php",
  function(err, res) {
    if (res.statusCode !== 200) {
      console.error("Preview Files not uploaded. Check your settings.");
      console.error(res.statusCode);
      console.error(res.statusMessage);
    } else {
      console.log("Preview files uploaded successfully");
    }

    res.resume();
  }
);
