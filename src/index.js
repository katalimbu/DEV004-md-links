const fs = require('fs');

export const mdLinks = (path, options) => {
  console.log("path1", path);

  return new Promise((resolve, reject) => {
    // identifica si la ruta existe 
    console.log("path", path);
    if (fs.existsSync(path)){
      resolve("la ruta existe");
    } else {
// si la ruta no existe, manda un error, se rechaza la promesa 
      reject('la ruta no existe');
    }
  })
} 


