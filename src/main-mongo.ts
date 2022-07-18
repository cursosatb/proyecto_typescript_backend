import { MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(uri);

async function main() {

  // se conecta a la base de datos
  try {
    await client.connect();

    // banco es el nombre de la base de datos
    const db = client.db('banco');

    // gestores es el nombre de la colección dentro de la base de datos banco
    const gestoresColeccion = db.collection('gestores');

    // obtiene el número de documentos de la colección de gestores
    const numeroDocs = await gestoresColeccion.countDocuments()
    console.log(numeroDocs);
    
    if(numeroDocs > 0) {
      // borra la colección
      await gestoresColeccion.drop();
    }

    // insertar un gestor
    await gestoresColeccion.insertOne({
      id: 1,
      usuario: 'gestor1',
      password: 'gestor1',
      correo: 'gestor1@mail.com'
    });

    // leer
    const gestor = await gestoresColeccion.findOne({
      id: 1
    })
    console.log(gestor);
    
    // actualizar un documento
    const result = await gestoresColeccion.updateOne({
      id: 1
    }, {
      "$set": {
        correo: 'gestor11@mail.com'
      }
    })
    console.log(result);

    // eliminar un documento
    const result2 = await gestoresColeccion.deleteOne({
      correo: 'gestor11@mail.com'
    })
    console.log(result2);  

  } 
  // el bloque de catch se ejecuta cuando se produce un error en el bloque del try
  catch(e) {
    console.log('Error conectando a la base de datos');    
    console.log(e);    
  }
  // el bloque de finally se ejecute siempre, no importa que falle o no el bloque del try
  finally {
    await client.close();
  }
}

main();

console.log('Hola mundo');
