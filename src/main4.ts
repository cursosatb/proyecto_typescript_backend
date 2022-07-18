import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(uri);

async function insertarPeliculas() {
    
  /* BASE DE DATOS */
  await client.connect();
  const db = client.db('imdb');
  const pelisColeccion = db.collection('peliculas');
  const numeroDocs = await pelisColeccion.countDocuments();
  if(numeroDocs > 0) {
    pelisColeccion.drop();
  }
  //
  /* */

  const rutaArchivo = path.join(require.main.path, '..', 'data.tsv');

  const rl = readline.createInterface({
    input: fs.createReadStream(rutaArchivo)
    // crlfDelay: Infinity
  })

  let i = 1;
  let peliculas = [];

  rl.on('line', async (linea: string) => {
    // if(i === 6) {
      // console.log(linea);
      const valores: string[] = linea.split('\t');
      // console.log(valores);
      
      // console.log(i)
      i++;
      peliculas.push({
        tconst: valores[0],
        titleType: valores[1],
        primaryTitle: valores[2],
        originalTitle: valores[3],
        isAdult: Boolean(+valores[4]),
        startYear: +valores[5],
        endYear: +valores[6],
        runTimeMinutes: +valores[7],
        genres: valores[8].split(',')
      });    

      if(peliculas.length === 10000) {
        await pelisColeccion.insertMany(peliculas);
        peliculas = [];
      }

      // console.log(i);
  })

  rl.on('close', async () => {
    console.log('Archivo leído correctamente');
    rl.close();
    await client.close();
  })
}

async function analizarDatos() {

  await client.connect();
  const db = client.db('imdb');
  const pelisColeccion = db.collection('peliculas');

  const cursor = pelisColeccion.find({
    isAdult: true
  })

  const numeroPeliculasAdultas = await cursor.count();
  console.log(numeroPeliculasAdultas);

  const cursor2 = pelisColeccion.find({
    runTimeMinutes: {
      "$gt": 200
    }
  })
  
  const numeroPeliculasLargas = await cursor2.count();
  console.log(numeroPeliculasLargas);

  await pelisColeccion.createIndex({
    runTimeMinutes: 1
  })

  const cursor3 = pelisColeccion.find().sort({
    runTimeMinutes: -1
  }).limit(1)

  await cursor3.forEach((pelicula) => {
    console.log(pelicula);    
  })
}

// analizarDatos();
insertarPeliculas();

// ESTO NO FUNCIONA porque el archivo es muy grande
// const datos = fs.readFileSync(rutaArchivo).toString()
// console.log(datos);

