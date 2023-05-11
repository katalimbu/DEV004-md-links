import { mdLinks } from './index.js';
// mdLinks('/noexite.md/').catch((error) => {
// console.log(error)
// }); 
// hacer un archivo roto
mdLinks('/Users/katalinaortiz/Desktop/laboratoria /DEV004-md-links', {validate: false})
    .then(links => console.log(links))
    .catch((error) => { console.log(error)});