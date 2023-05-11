import { mdLinks } from "../src/index.js"; 

describe('mdLinks', () => {
  it('debería devolver una promesa', () => {
    expect(mdLinks('./README.md', {validate: false})).toBeInstanceOf(Promise);
  });

it('Debería resolver la promesa si la ruta existe', () => {
  return mdLinks('./README.md', {validate: true}).then((resolved) => {
    expect(resolved).toStrictEqual([]);
  });
});

it('Debería rechazar la promesa si la ruta no existe', () => {
  return mdLinks('./noexiste.md', {validate: false}).catch((error) => {
    expect(error).toBe('la ruta no existe');
  });
});
});
