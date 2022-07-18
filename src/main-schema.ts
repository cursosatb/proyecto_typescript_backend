/*

1-1 (uno a uno)
Ejemplo: paciente - historial clínico

1-N (uno a muchos)
Ejemplo: persona - viviendas

N-M (muchos a muchos)
Ejemplo: profesor - estudiante
*/
let db: any;

// 1-1 (uno a uno)
const paciente = {
  id: 1,
  nombre: 'Marcos',
  telefono: 66556673
}

const historialMedico = {
  tieneDiabetes: true,
  tipoDiabetes: 1,
  medicamentos:[],
  patologias: []
}

db.pacientes.insertOne({
  id: 1,
  nombre: 'Marcos',
  telefono: 66556673,
  historialMedico: {
    tieneDiabetes: true,
    tipoDiabetes: 1,
    medicamentos:[],
    patologias: []
  }
})

// 1-N (uno a muchos)
// pocos -> 1-1000
// muchos -> más de 1000
// Ejemplo: persona - viviendas

const persona = {
  id: 1,
  nombre: 'Marcos',
  telefono: 66556673,
}

const viviendas = [
  {
    id: 1,
    calle: 'Castilla',
    numero: 44
  },
  {
    id: 2,
    calle: 'Belmonte',
    numero: 5
  }
]

// 1-N (donde es N son pocos documentos)
db.personas.findOne({
  id: 1,
  nombre: 'Marcos',
  telefono: 66556673,
  viviendas: [
    {
      id: 1,
      calle: 'Castilla',
      numero: 44
    },
    {
      id: 2,
      calle: 'Belmonte',
      numero: 5
    }
  ]
})

// 1-N (donde es N son muchos documentos)
// Gestor - Mensaje recibido
const gestor = {
  id: 1,
  usuario: 'gestor1',
  password: 'gestor1'
}

const mensajes = [
  {
    id: 1,
    id_origen: 1,
    texto: "Hola",
    fecha: "hola"
  }
]

const gestor2 = db.gestores.insertOne({
  id: 1, // los identificador del gestor tienen que ser único
  usuario: 'gestor1',
  password: 'gestor1'
})

db.mensajes.insertOne({
  id: 1,
  id_origen: 1,
  texto: "Hola",
  fecha: "hola",
  // id_gestor: 1 // id_gestor está asociado con el id del gestor
  id_gestor: gestor2._id // id_gestor está asociado con el _id del gestor
})

// N-M (muchos a muchos)
// Ejemplos: profesor-estudiante o libro-autor

const profesores = [
  {
    id: 1,
    nombre: 'Marcos'
  },
  {
    id: 2,
    nombre: 'Carlos'
  },
]

const estudiantes = [
  {
    id: 1,
    nombre: 'Ana'
  },
  {
    id: 2,
    nombre: 'María'
  },
]

db.profesores.insert(
  {
    id: 1,
    nombre: 'Marcos',
    ids_estudiantes: [1, 2] // referencia a las estudiantes Ana y María
  }
)

db.estudiantes.insert(
  {
    id: 1,
    nombre: 'Ana',
    ids_profesores: [1, 2] // referencia a los profesores Marcos y Carlos
  }
)





