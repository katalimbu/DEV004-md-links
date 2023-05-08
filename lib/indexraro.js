"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;
var fs = require('fs');

// const mdLinks = (path, options = nil) => new Promise();

var mdLinks = function mdLinks(path) {
  console.log("path1", path);
  return new Promise(function (resolve, reject) {
    // identifica si la ruta existe 
    console.log("path", path);
    if (fs.existsSync(path)) {
      resolve("la ruta existe");
    } else {
      // si la ruta no existe, manda un error, se rechaza la promesa 
      reject('la ruta no existe');
    }
  });
};
exports.mdLinks = mdLinks;