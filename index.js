var fs = require("fs");
var pdf = require("html-pdf");
var path = require("path");
var html = fs.readFileSync("./dist/resume.html", "utf8");
var options = { format: "Letter" };

var args = process.argv.slice(2);

if (args.length >= 2) {
  htmlpdf(args[0], args[1]);
} else {
  help();
}

function help() {
  var help = [
    "Usage: html-pdf <source> <destination>",
    "e.g.: html-pdf source.html destination.pdf",
  ].join("\n");

  console.log(help);
}

function htmlpdf(source, destination) {
  console.log('initializing conversion');
  var html = fs.readFileSync(source, "utf8");
  var options = {
    border: "0",
    base: "file://" + path.resolve(source),
    header: {
      height: "25px",
      contents: {
        first: '<div class="border-less">&nbsp;</div>',
        2: " ", // Any page number is working. 1-based index
        default:
          '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        last: " ",
      },
    },
  };
  pdf.create(html, options).toFile(destination, function (err, res) {
    console.log('\x1b[32m%s\x1b[0m', 'successful conversion');
    if (err) throw err;
  });
  // pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
  //   if (err) return console.log(err);
  //   console.log(res); // { filename: '/app/businesscard.pdf' }
  // });
}
