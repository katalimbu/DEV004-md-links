#!/usr/bin/env node
// shebang, le explica al sist operativo como debe funcionar el archivo, en este caso es con node.

import { argv } from 'process';// propiedad de un modulo
import { mdLinks } from './index.js';// funcion 
import axios from 'axios';// biblioteca

// desestructuracion de array para asignar los valores de argv 
const [,, path, ...options] = argv;// traducir lo que dice la linea de comando con js 
// esta linea es la construccion inicial del comando
// el include() detetmina si una matriz incluye algo o no 
const validate = options.includes('--validate');
const stats = options.includes('--stats');

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

const printLinks = (links) => {
  links.forEach((link) => {
    if(validate){
        const { href, text, file, status, statusText} = linkks
        console.log(`${file} ${href} ${text} ${status} ${statusText}`);
    }
    else{
    // desestructuracion de objetos para acceder a las propiedades 
    const { file, href, text } = link;
    console.log(`${file} ${href} ${text}`);
    }
  });
};

// const validateLinks = (links) => {
//   const promises = links.map((link) => {
//     const { href } = link;
//     return axios.get(href)
//       .then((response) => {
//         const status = response.status;
//         const message = status >= 200 && status < 400 ? 'ok' : 'fail';
//         return { ...link, status, message };
//       })
//       .catch(() => {
//         return { ...link, status: 'unknown', message: 'fail' };
//       });
//   });
//   return Promise.all(promises);
// };

const printStats = (links) => {
  const total = links.length;// guarda en la var total, cuantos elemento hay en ese array
  // un set es una coleccoon de valores unicos 
  const unique = new Set(links.map(link => link.href)).size;// midiendo el tamaño de cuantos links unicos hay 
  console.log(`Total: ${total}`);
  console.log(`Unique: ${unique}`);
  if (validate) {
    const broken = links.filter(link => link.message === 'fail').length;
    console.log(`Broken: ${broken}`);
  }
};

const mdLinksCLI = () => {
  if (!path) {
    console.log('Please provide a file path.');
    return;
  }

  mdLinks(path, {validate: validate})
    .then((links) => {
        if (stats) {
            printStats(links);
         } else {
            printLinks(links.map(link => ({
            ...link,
            text: truncateText(link.text, 50)
            })));
        }
    })
    .catch((error) => {
      console.error(`An error occurred: ${error.message}`);
    });
};

mdLinksCLI();
