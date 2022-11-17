'use strict';

const data = [
  {
    name: 'Certificación del registro mercantil',
    description: `Si el usuario requiere de una certificación, debe solicitarla personalmente para efectuar el pago, además para que conozca los datos que se le van a certificar.
    Este servicio es cuando la información se encuentra en el registro mercantil, (comerciantes, sociedades y establecimientos)`,
    price: 650,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Búsquedas informativas en índices de extranjeros',
    description: `El Archivo Histórico Provincial de Holguín tiene bajo su cuidado veinte libros que contienen listado de extranjeros que 
    habitaron en Holguín en diferentes épocas. Los datos han sido identificados a partir de investigaciones y consultas de los especialistas
     y técnicos de la institución, y aparecen en ellos los ciudadanos que realizaron en su tiempo alguna operación ante notario, o fueron 
     censados`,
    price: 60,
    url: '/foreign-index',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Certificación de escrituras notariales',
    description: `Si el usuario requiere de una certificación, debe solicitarla personalmente para efectuar el pago, además para que conozca los datos que se le van a certificar
    En este caso el usuario solamente desea que se la certifique una parte de la escritura.
    A la hora del usuario recoger la certificación o escritura notarial, debe presentar un sello con valor de 5.00 cup en ambos casos.
    `,
    price: 220,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Certificación parcial de escritura notarial',
    description: `Si el usuario requiere de una certificación, debe solicitarla personalmente para efectuar el pago, además para que conozca los datos que se le van a certificar
    En este caso el usuario solamente desea que se la certifique una parte de la escritura.
    A la hora del usuario recoger la certificación o escritura notarial, debe presentar un sello con valor de 5.00 cup en ambos casos.`,
    price: 300,
    url: '/notarial-protocol',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Certificación literal de escritura notarial',
    description: `Si el usuario requiere de una certificación, debe solicitarla personalmente para efectuar el pago, además para que conozca los datos que se le van a certificar
    El usuario solicita la escritura textualmente como aparece en el protocolo notarial.
    A la hora del usuario recoger la certificación o escritura notarial, debe presentar un sello con valor de 5.00 cup en ambos casos.`,
    price: 40,
    url: '/notarial-protocol',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Reprografías',
    description: `Ya sea digitalización de documentos o digitalización de fotografías.`,
    price: 25,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Transcripción literal de documentos paleográficos',
    description: `Este servicio consiste de transcribir un documento de la época con caligrafía ilegible`,
    price: 40,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Búsquedas informativas en protocolos notariales',
    description: `En los más de 2000 protocolos notariales que custodia el archivo, se encuentran actos legales ante notarios, 
    tales como matrimonios, testamentos, operaciones con viviendas, etc. Las búsquedas en estos libros resultan de mucha utilidad a 
    los ciudadanos que desean realizar trámites relacionados con estos aspectos. La certificación de la información es lo que le 
    imprime el carácter legal a su localización`,
    price: 60,
    created_at: new Date(),
    updated_at: new Date()
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('informative_services', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('informative_services', null, {});
  }
};
