import { mdLinks } from './index.js';
// mdLinks('/noexite.md/').catch((error) => {
// console.log(error)
// }); 
// hacer un archivo roto
mdLinks('./test/test.md', {validate: true})
    .then(links => console.log(links))
    .catch((error) => { console.log(error)});