import { mdLinks } from "../src/index.js"; 
// todos estos test cubren si es que es archivo
describe('mdLinks', () => {
  it('debería devolver una promesa', () => {
    expect(mdLinks('./test/test.md', {validate: false})).toBeInstanceOf(Promise);
  });

  // it('Debería resolver la promesa si la ruta existe', () => {
  //   return mdLinks('./test/test.md', {validate: true}).then((resolved) => {
  //     expect(resolved).toStrictEqual([]);
  //   });
  // });

  it('Debería rechazar la promesa si la ruta no existe', () => {
    return mdLinks('./noexiste.md', {validate: false}).catch((error) => {
      expect(error).toBe('la ruta no existe');
    });
  });
  
  // este test cubre si es que la ruta es relativa.
  it('Debería leer el archivo si la extensión es .md', () => {
    const route = './test/test.md';
    return mdLinks(route)
      .then((links) => {
        expect(links).toHaveLength(3);
        expect(links).toStrictEqual(
          [
            {
              href: 'https://www.google.com',
              text: 'Google',
              file: './test/test.md'
            },
            {
              href: 'https://www.youtube.com',
              text: 'youtube',
              file: './test/test.md'

            },
            {
              href: 'https://www.anexist.com',
              text: 'noexiste',
              file: './test/test.md'

            },
          ]
        )
      })
      .catch((err) => console.log(err));
  });

  it('Debería leer el archivo si la extensión NO es .md', () => {
    const route = './test/test.doc';
    mdLinks(route).catch((error) => {
      expect(error).toBe('error: no es un archivo markdown');
    });
  }); 
// en este test estoy probando implicitamente que la ruta existe, pro eso apago mejor el otro test
  it('la path es absoluta', () => {
    const route = '/Users/katalinaortiz/Desktop/laboratoria /DEV004-md-links/test/test.md';
    return mdLinks(route, {validate: true})
      .then((links) => {
        expect(links).toHaveLength(3);
        expect(links.sort()).toEqual(expect.arrayContaining(
          [
            expect.objectContaining({
           
              href: 'https://www.google.com',
              text: 'Google',
              file: "/Users/katalinaortiz/Desktop/laboratoria /DEV004-md-links/test/test.md",
              status: 200,
              statusText: 'OK'
            }),
            expect.objectContaining({
              href: 'https://www.youtube.com',
              text: 'youtube',
              file: "/Users/katalinaortiz/Desktop/laboratoria /DEV004-md-links/test/test.md",
              status: 200,
              statusText: 'OK'
            }),
            expect.objectContaining({
              href: 'https://www.anexist.com',
              text: 'noexiste',
              file: "/Users/katalinaortiz/Desktop/laboratoria /DEV004-md-links/test/test.md",
              status: 'Not Found',
              statusText: 'Fail'
            }),
          ]
       ))
      })
      .catch((err) => console.log(err));
  });
 

});






