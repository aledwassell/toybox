var path = require("path");

module.exports = {
  entry: "./js/handlebars_play.js",
  output: {
    path: "./js",
    filename: "bundle.js"
  },
  resolve: {
    fallback: path.join(__dirname, "js/helpers")
  },
  module: {
    loaders: [
      {test: /\.hbs$/, loader: "handlebars-loader"}
    ]
  }
};
