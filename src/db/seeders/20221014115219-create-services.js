'use strict';
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});
const data = [
  {
    name: 'Certificación del registro mercantil',
    description: lorem.generateSentences(Math.trunc(Math.random() * 3 + 1)),
    price_native: Math.random() * 1000,
    price_foreign: Math.random() * 1000,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Búsquedas informativas en índices de extranjeros',
    description: lorem.generateSentences(Math.trunc(Math.random() * 3 + 1)),
    price_native: Math.random() * 1000,
    price_foreign: Math.random() * 1000,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Certificación de escrituras notariales',
    description: lorem.generateSentences(Math.trunc(Math.random() * 3 + 1)),
    price_native: Math.random() * 1000,
    price_foreign: Math.random() * 1000,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Certificación parcial de escritura notarial',
    description: lorem.generateSentences(Math.trunc(Math.random() * 3 + 1)),
    price_native: Math.random() * 1000,
    price_foreign: Math.random() * 1000,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Certificación literal de escritura notarial',
    description: lorem.generateSentences(Math.trunc(Math.random() * 3 + 1)),
    price_native: Math.random() * 1000,
    price_foreign: Math.random() * 1000,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Reprografías',
    description: lorem.generateSentences(Math.trunc(Math.random() * 3 + 1)),
    price_native: Math.random() * 1000,
    price_foreign: Math.random() * 1000,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Transcripción literal de documentos paleográficos',
    description: lorem.generateSentences(Math.trunc(Math.random() * 3 + 1)),
    price_native: Math.random() * 1000,
    price_foreign: Math.random() * 1000,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Búsquedas informativas en protocolos notariales',
    description: lorem.generateSentences(Math.trunc(Math.random() * 3 + 1)),
    price_native: Math.random() * 1000,
    price_foreign: Math.random() * 1000,
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
