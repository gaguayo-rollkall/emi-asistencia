const crypto = require('crypto');
const { estudiantes } = require("./estudiantes");
const periodoAcademico = '08dc2c14-e5e8-40ab-8900-645a8c580437';

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

function generateRandomInteger(min, max) {
  // Check if the inputs are valid
  if (min >= max) {
    throw new Error("Minimum value must be less than maximum value");
  }

  // Calculate the range
  const range = max - min;

  // Generate a random number within the range
  const randomNumber = Math.floor(Math.random() * (range + 1)) + min;

  return randomNumber;
}

const carreras = [
  '08dc574d-c063-429f-84ba-f5109ef98d00', // Agroindustrial
  '08dc2c00-55b6-4c5a-8245-e6bd7be23f65', // Civil
  '08dc2c31-d63d-4251-8b79-4007a6da0a22', // Comercial
  '08dc2e53-c4cc-4618-8b5d-33d97d7e09e4', // Alimentos
  '08dc295b-3560-4b32-8790-ca0e2b39555d', // Sistemas
  '08dc574d-b6ca-43cd-8d84-f3c144c388e6', // Electronica
  '08dc2c00-51fe-4d35-85d2-b7f7f894b35b', // MEcatronica
  '08dc2c00-5a4b-4cd4-8a46-d0dc6c80e698', // Petrolera
];

var semestres = [
  'PRIMER SEMESTRE',
  'SEGUNDO SEMESTRE',
  'TERCER SEMESTRE',
  'CUARTO SEMESTRE',
  'QUINTO SEMESTRE',
  'SEXTO SEMESTRE',
  'SEPTIMO SEMESTRE',
  'OCTAVO SEMESTRE',
  'NOVENO SEMESTRE',
  'DECIMO SEMESTRE',
]

let index = 0;

carreras.forEach(carreraId => {
  semestres.forEach(semestre => {
    const idSemestre = uuidv4();
    console.log(`INSERT INTO Cursos(Id, CarreraId, PeriodoAcademicoId, Nombre, Created, LastModified) VALUES ('${idSemestre}', '${carreraId}', '${periodoAcademico}', '${semestre}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`);

    const numeroEstudiantes = generateRandomInteger(10, 40);

    for (let i = 0; i < numeroEstudiantes; i++) {
      const { codigo, nombre, EMAIL } = estudiantes[index];
      const idEstudiante = uuidv4();
      console.log(`INSERT INTO Estudiantes(Id, Codigo, Nombre, Email, RFID, Grado, Created, LastModified) VALUES ('${idEstudiante}', '${codigo}', '${nombre}', '${EMAIL}', '', 'EST', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`);
      console.log(`INSERT INTO CursoEstudiantes(Id, CursoId, EstudianteId, Created, LastModified) VALUES ('${uuidv4()}', '${idSemestre}', '${idEstudiante}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`);
      index++;
    }
  })
});