import fs from 'fs';

// escribir datos en un archivo de forma síncrona (para pocos datos)
try {
  fs.writeFileSync('prueba.txt', 'hola mundo', 'utf-8');
}
catch (err) {
  // este bloque se ejecuta cuando se produce un error al escribir en un archivo
  console.log(err);  
}

// escribir datos en un archivo de forma asíncrona (para muchos datos)

fs.writeFile('prueba2.txt', 'hola asíncrono', (err) => {
  if(err) {
    console.log(err);
    return;
  }  

  // cuando termina de guardar los datos, se ejecuta este callback
  console.log('Escritura finalizada');

});

// leer de forma síncrona (para leer pocos datos)
const contenidoArchivo = fs.readFileSync(
  'prueba.txt').toString();

console.log(contenidoArchivo);

// leer de forma asíncrona (para leer muchos datos)
fs.readFile('prueba.txt', (err, data) => {
  const dataStr = data.toString();
  console.log('Segunda lectura');  
  console.log(dataStr);
  
})

const persona = {
  edad: 45,
  nombre: 'Paco'
}

const personaStr = JSON.stringify(persona, null, 4);
fs.writeFileSync('persona.json', personaStr);

const personaStr2: string = fs.readFileSync('persona.json').toString();
const persona2 = JSON.parse(personaStr2);
console.log(personaStr2);
console.log(persona2);


