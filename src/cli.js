#!/usr/bin/env node
// shebang, le explica al sist operativo como debe funcionar el archivo, en este caso es con node.

import { argv } from 'process';// propiedad de un modulo
import { mdLinks } from './index.js';// funcion 
import chalk from 'chalk';


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
        const { href, text, file, status, statusText} = link;
        const statusColor = status >= 200 && status < 400 ? chalk.green(status) : chalk.red(status);
        const messageColor = status >= 200 && status < 400 ? chalk.green(statusText) : chalk.red(statusText);  
        console.log(`${chalk.magenta(file)} ${chalk.yellow(href)} ${chalk.cyan(truncateText(text, 50))} ${statusColor} ${messageColor}`);

    }
    else{
    // desestructuracion de objetos para acceder a las propiedades 
    const { file, href, text } = link;
    console.log(`${chalk.magenta(file)} ${chalk.yellow(href)} ${chalk.cyan(truncateText(text, 50))}`);
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
  console.log(`${chalk.bold('Total:')} ${total}`);
  console.log(`${chalk.bold('Unique:')} ${unique}`);
  if (validate) {
    const broken = links.filter(link => link.statusText === 'Fail').length;
    console.log(`${chalk.bold('Broken:')} ${broken}`);
  }
};

const mdLinksCLI = () => {
  if (!path) {
    console.log(chalk.red('Por favor, ingresa una ruta de archivo.'));
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
        console.error(chalk.red(`Ups! error, ingresa una ruta valida: ${error.message}`));

    });
};

mdLinksCLI();
