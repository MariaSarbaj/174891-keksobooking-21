const path = require("path");

module.exports = {
  entry: [
    "./js/data.js",
    "./js/backend.js",
    "./js/loader.js",
    "./js/mainPinMoveHandler.js",
    "./js/pin.js",
    "./js/render.js",
    "./js/card.js",
    "./js/form.js",
    "./js/filter.js",
    "./js/map.js",
    "./js/uploadPhoto.js",
    "./js/debounce.js",
    "./js/utils.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true,
  },
  devtool: false
};
