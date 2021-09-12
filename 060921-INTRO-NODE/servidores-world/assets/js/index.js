const http = require('http');
const url = require('url');
const fs = require('fs');

http
  .createServer((req, res) => {

    const params = url.parse(req.url, true).query;
    console.log(params);

    const archivo = params.archivo;
    const contenido = params.contenido;
    const nombre = params.nombre;
    const nuevoNombre = params.nuevoNombre;

    if (req.url.includes('/crear')) {
      fs.writeFile(archivo, contenido, () => {
        res.write('Archivo creado con éxito!')
        res.end()
      })
    }

    if (req.url.includes('/leer')) {
      fs.readFile(archivo, (err, data) => {
        res.write(data)
        res.end()
      })
    }
    
    if (req.url.includes('/renombrar')) {
      fs.rename(nombre, nuevoNombre, () => {
        res.write('Archivo renombrado con éxito!')
        res.end()
      })
    }

    if (req.url.includes('/eliminar')) {
      fs.unlink(archivo, () => {
        res.write('Archivo eliminado con éxito!')
        res.end()
      })
    }

    }).listen(8080, () => {
      console.log('Puerto escuchando en 8080');
    })
