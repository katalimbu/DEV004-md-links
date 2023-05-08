import * as fs from 'fs';
import * as path from 'path';
import * as markdownIt from 'markdown-it';
// const fs = require('fs');

export const mdLinks = (route, options) => {
  console.log("route1", route);

  return new Promise((resolve, reject) => {
    // identifica si la ruta existe 
    console.log("route", route);
    if (fs.existsSync(route)){
      // identifica si la ruta es absoluta y si no la convierte
      if(!path.isAbsolute(route)) {
        console.log(path.resolve(route))
      }

      fs.stat(route, (err, stats) => {
        // if (err) throw err;
      
        // console.log(`stats: ${JSON.stringify(stats)}`);
        console.log('is file', stats.isFile());
        if (stats.isFile()) {
          // ver si es md
          if(path.extname(route) === '.md') {
            console.log('es md');

            fs.readFile(route, 'utf8', (err, data) => {
              if (err) {
                console.error(err);
                return;
              }
              // console.log(data);
              // encontramos los links dentro del archivo, llamo al data que es el contenido del archivo
              const markdownText = data;
              const regex = /\[(.*?)\]\((.*?)\)/g;
              
              let match = regex.exec(markdownText);
              while (match !== null) {
                const linkText = match[1];
                const linkURL = match[2];
                // console.log(`Texto: ${linkText}, URL: ${linkURL}`);
                match = regex.exec(markdownText);
              }

              // if (validate) {
                // petición http linkURL

              // }
              
            });


          }

          else {
            console.log("error: no es un archivo markdown")
          }
        }
      });
      // if (fs.stat(route).isFile()) {
      //   console.log('is file');
      //   // if (isMd(route)) {
      //   //   // leer archivo
      //   // }
      // }
      // if(path.isAbsolute(route)){
      //   console.log('si la ruta es absoluta')
      // }
      // else{
      //   // convertirla a absoluta
      //   console.log(path.resolve(route))
      // }


      resolve("la ruta existe");
    } else {
      // si la ruta no existe, manda un error, se rechaza la promesa 
      reject('la ruta no existe');
    }
  })
} 
