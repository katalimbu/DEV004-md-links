// const { mdLinks } = require('../index.js');


// describe('mdLinks', () => {

//   it('deberia devolver una promesa', () => {
//     expect(mdLinks()).toBe(typeof Promise)
//   });
//   it('debe rechazar cunado el path no existe', () => {
//     expect(mdLinks()).toBe(typeof Promise)
//   });


// });
// const mdLinks = require('../index.js');

// describe('mdLinks', () => {
//   it('debería devolver una promesa', () => {
//     expect(mdLinks('./README.md')).toBeInstanceOf(Promise);
//   });

//   it('debería rechazar la promesa cuando se proporciona una ruta que no existe', () => {
//     return expect(mdLinks('./noexiste.md')).rejects.toMatch('la ruta no existe');
//   });

//   it('debería resolver la promesa cuando se proporciona una ruta válida', () => {
//     return expect(mdLinks('./README.md')).resolves.toBeTruthy();
//   });
// });

import { mdLinks } from "../src/index.js"; 

describe('mdLinks', () => {
  it('debería devolver una promesa', () => {
    expect(mdLinks('./README.md')).toBeInstanceOf(Promise);
  });

it('Debería resolver la promesa si la ruta existe', () => {
  return mdLinks('./README.md').then((resolved) => {
    expect(resolved).toBe('la ruta existe');
  });
});

it('Debería rechazar la promesa si la ruta no existe', () => {
  return mdLinks('./noexiste.md').catch((error) => {
    expect(error).toBe('la ruta no existe');
  });
});
});
