const path = require("path");

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          { loader: "elm-hot-webpack-loader" },
          {
            loader: "elm-webpack-loader",
            options: {
              cwd: path.join(__dirname, "../"),
              debug: true
            }
          }
        ]
      }
    ]
  }
});
