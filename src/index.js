import * as fs from 'fs';
import * as path from 'path';
import * as markdownIt from 'markdown-it';
// const fs = require('fs');

export const mdLinks = (route, options) => {
  console.log("route1", route);
console.log('optionkata', options.validate);

  return new Promise((resolve, reject) => {
    // identifica si la ruta existe 
    console.log("route", route);
    if (fs.existsSync(route)){
      // identifica si la ruta es absoluta y si no la convierte
      if(!path.isAbsolute(route)) {
        console.log(path.resolve(route))
      }
      // aca reviso si el path(route) es archivo
      fs.stat(route, (err, stats) => {
        console.log('is file', stats.isFile());
        if (stats.isFile()) {
          // ver si es md
          if(path.extname(route) === '.md') {
            console.log('es md');
          // aca es para leer el archivo
            fs.readFile(route, 'utf8', (err, data) => {
              if (err) {
                console.error(err);
                return;
              }
              // console.log(data);
              // encontramos los links dentro del archivo, llamo al data que es el contenido del archivo
              const markdownText = data;
              const regex = /\[(.*?)\]\((.*?)\)/g;
              // arreglo de todos los links 
              let matches = Array.from(markdownText.matchAll(regex));
              console.log('aqui match', matches.length)
              // recorrer los arreglos y revisar los matches, los links y los url 
              const matchesIterator = markdownText.matchAll(regex);
              // aca lleno este array con el objeto false
              let responseFalse = []
              // el for of se usa para recorrer un objeto iterable.
              for (const match of matchesIterator) {
                if (!options.validate) {
                  let objfalse = {
                    href: match[2],
                    text: match[1],
                    file: route
                  }
                  // aca  agrego un elemento(objeto) al array
                  responseFalse.push(objfalse);
                }
                console.log('estoy llenito',responseFalse)
                // aca estoy haciendo format strings 
                // console.log(`Link text: ${match[1]}, Link URL: ${match[2]}`);
              }

              if (options.validate) {
                // http
                // iterar por cada link 
                
              }



              // for (const match of matches){
              //   console.log(match)
              // }
              // while (match !== null) {
              //   const linkText = match[1];
              //   const linkURL = match[2];
              //   // console.log(`Texto: ${linkText}, URL: ${linkURL}`);
              //   match = regex.exec(markdownText);
              // }

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
