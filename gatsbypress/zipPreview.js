var file_system = require("fs");
var archiver = require("archiver");

var output = file_system.createWriteStream(`templates-previews.zip`);
var archive = archiver("zip");

output.on("close", function() {
  console.log(archive.pointer() + " total bytes");
  console.log("gatsbypress.zip created and ready to send to the wp install.");
});

archive.on("error", function(err) {
  throw err;
});

archive.pipe(output);
archive.directory("public/", false);
archive.finalize();
