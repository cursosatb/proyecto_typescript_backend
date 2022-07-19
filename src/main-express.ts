// express
import express from 'express';

const app = express();

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// http://localhost:8085/body (POST)
app.post('/body', (req, res) => {
  const body = req.body;
  console.log(body);
  res.send('ok');
})

// req: express.Request
// res: express.Response
// http://localhost:8085/ok (GET)
app.get('/ok', (req, res) => {

  // este callback se ejecuta cuando se recibe una petición HTTP a la url http://localhost:8085/ok
  console.log('Petición realizada a /ok')
  res.send('ok');
})

// http://localhost:8085/ok (POST)
app.post('/ok', (req, res) => res.send('ok con POST'));

// http://localhost:8085/todos (GET, POST, PUT, PATCH, DELETE, ...)
app.all('/todos', (req, res) => {
  res.send('TODOS LOS VERBOS HTTP')
})

// ruta con espera indefinida
// http://localhost:8085/sinrespuesta (GET)
app.get('/sinrespuesta', (req, res) => {
  console.log('Estoy en /sinrespuesta');  
  // si no se envían datos al cliente, éste permanece a la espera de la respuesta
})

// ruta raíz
// http://localhost:8085/
app.get('/', (req, res) => {
  res.send('Ruta raíz')
})

// primer manejador para la ruta /mismaruta
// http://localhost:8085/mismaruta
app.get('/mismaruta', (req, res) => {
  res.send('Primer manejador')
})

// segundo manejador para la ruta /mismaruta (se ignora porque ya existe uno previo)
// http://localhost:8085/mismaruta
app.get('/mismaruta', (req, res) => {
  res.send('Segundo manejador') 
})

// primer manejador para la ruta /mismaruta2
// http://localhost:8085/mismaruta2
app.get('/mismaruta2', (req, res, next) => {
  console.log('Primer manejador')
  next();
})

app.get('/mismaruta2', (req, res) => {
  console.log('Segundo manejador')
  res.send('Segundo manejador')
})

// coincidencia con /acd y /abcd
// símbolo ? --> 0 o 1 ocurrencia
app.get('/ab?cd', (req, res) => {
  res.send('La ruta ab?cd')
});

// coincidencia con /acd, /abcd, /abbcd, /abbbcd, ...
// símbolo + --> 0 o más ocurrencias
app.get('/ab+cd', (req, res) => {
  res.send('La ruta ab+cd')
});

// coincidencia con /api/...
app.get('/api/*', (req, res) => {
  res.send('/api/*')
})

// http://localhost:8085/gestores/<ID>
app.get('/gestores/:identificador', (req, res) => {
  // req.params hacer referencia los parámetros que se pasan por la url
  const id = req.params.identificador;
  console.log(`El identificador es ${id}`);
  res.send('OK')
})

// http://localhost:8085/descargar/
app.get('/descargar', (req, res) => {
  res.download('css3.pdf')
})

// http://localhost:8085/ejemplocabecera/
app.get('/ejemplocabecera', (req, res) => {
  // cabecera que se reciben del cliente
  // console.log(req.header)

  console.log(req.header('prueba'))

  // cabecera que se envía al cliente
  res.setHeader('x', 5);
  res.send('ok')
})

// http://localhost:8085/json
app.get('/json', (req, res) => {

  const gestor = {
    id: 3,
    usuario: 'gestor3',
    password: 'gestor3'
  }

  res.json(gestor);
})

// http://localhost:8085/parametros?a=5&b=7&c=18
app.get('/parametros', (req, res) => {
  const parametros = req.query;
  // console.log(parametros);
  console.log(parametros.b);
  console.log(parametros.d);
  res.send('ol');
})

// ruta que genera un error
app.get('/generaerror', (req, res) => {

  const objeto = undefined;
  objeto.sumar()

  res.send('')
})

// ruta que genera un error (en un callback asíncrono) --> requiere la instalación de la librería express-async-errors
app.get('/generaerrorasync', async (req, res) => {

  const objeto = undefined;
  objeto.sumar()

  res.send('')
})

// manejador para los errores (obligatoriamente recibe cuatro parámetros: err, req, res, next)
app.use((err, req, res, next) => {
  console.log(err);
  res.send('Error')
});

// manejador de ruta para la ruta no encontrada (debe ubicarse la última)
app.all('*', (req, res) => {
  res.status(404).send('Ruta no encontrada')
})

app.listen(8085, () => {
  // este callback se ejecuta cuando arranca el servidor HTTP con express
  console.log('Servidor HTTP con express arrancado');
});