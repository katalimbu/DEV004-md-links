import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

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
        // console.log('is file', stats.isFile());
        if (err) {
          reject(err);
        }
        if (stats.isFile()) {
          // ver si es md
          if(path.extname(route) === '.md') {
            // console.log('es md');
          // aca es para leer el archivo
            fs.readFile(route, 'utf8', (err, data) => {
              if (err) {
                // console.error(err);
                reject('No se puede leer el archivo');
              }
              // console.log(data);
              // encontramos los links dentro del archivo, llamo al data que es el contenido del archivo
              const markdownText = data;
              const regex = /\[(.*?)\]\((.*?)\)/g;
              // arreglo de todos los links 
              let matches = Array.from(markdownText.matchAll(regex));
              // console.log('aqui match', matches.length)
              // recorrer los arreglos y revisar los matches, los links y los url 
              const matchesIterator = markdownText.matchAll(regex);
              // aca lleno este array con el objeto false
              let responseFalse = []
              let responseTrue = []

              // el for of se usa para recorrer un objeto iterable.
              for (const match of matchesIterator) {
                if (options.validate) {
                  axios.get(match[2])
                    .then(response => {
                      let objtrue = {
                        href: match[2],
                        text: match[1],
                        file: route,
                        status: response.status,
                        statusText: response.statusText
                      };
                      responseTrue.push(objtrue);
                      // console.log('aqui voy', responseTrue)
                    })
                    .catch(error => {
                      let objfalse = {
                        href: match[2],
                        text: match[1],
                        file: route,
                        status: error.response ? error.response.status : 'Not Found',
                        statusText: error.response ? error.response.statusText : 'Fail'
                      };
                      responseFalse.push(objfalse);
                      // console.log('aqui vengo', responseFalse)
                    });
                } else {
                  let objfalse = {
                    href: match[2],
                    text: match[1],
                    file: route
                  };
                  responseFalse.push(objfalse);
                  // console.log('aqui estoy', responseFalse);
                }
              }

              if (options.validate) {
                resolve(responseTrue);
              } else {
                resolve(responseFalse);
              }
            });
          }
          else {
            reject("error: no es un archivo markdown");
            // console.log("error: no es un archivo markdown")
          }
        }
        else {
          // es directorio
          fs.readdir(route, (err, files) => {
            if (err) {
              console.error(err);
              return;
            }
          
            if (files.length > 0) {
              for(const subdirectory of files){
                // const newroute = route + '/' + subdirectory(esto es lo mismo q format String)
                // esto es recursividad, porque desde mi funcion estoy llamando a mi funcion, porque debo volver a petir el mismo proceso.
                // esto es necesario para construir el path del subdirectorio
                mdLinks(`${route}/${subdirectory}`, options)
                  .then(links => console.log(links))
                  .catch((error) => { console.log(error)});
              }

              console.log('files', files);
              console.log(`${route} tiene ${files.length} archivos`);
            } else {
              console.log(`${route} no tiene archivos`);
            }
          });
        }
      });
      // resolve("la ruta existe");
    } else {
      // si la ruta no existe, manda un error, se rechaza la promesa 
      reject('la ruta no existe');
    }
  })
} 
