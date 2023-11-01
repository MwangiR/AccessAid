const { faker } = require('@faker-js/faker');
const db = require('../config/connection');
const Client = require('../models/Client');

const generateClient = () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    description: faker.lorem.sentence(),
    guardianName: faker.person.fullName(),
    guardianContact: faker.string.numeric(8),
  };
};

const clients = Array.from({ length: 10 }, () => generateClient());

Promise.all(clients.map((client) => Client.create(client)))
  .then((res) => {
    console.log('Clients inserted successfully', res);
  })
  .catch((err) => {
    console.log('Error inserting clients', err);
  })
  .finally(() => {
    db.close();
  });
