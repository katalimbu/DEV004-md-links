import { mdLinks } from './index.js';
// mdLinks('/noexite.md/').catch((error) => {
// console.log(error)
// }); 
mdLinks('README.md', {validate: false}).catch((error) => {
    console.log(error)
    }); 