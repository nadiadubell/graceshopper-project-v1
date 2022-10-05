const client = require('./client');

const dropTables = async () => {
  try {
    console.log('Dropping tables...');

    await client.query(`
            DROP TABLE IF EXISTS orderproducts;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS types;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS users;
        `);
  } catch (error) {
    console.log('Error dropping tables');
    throw error;
  }
};

const buildTables = async () => {
  try {
    console.log('Building tables...');

    await client.query(`

        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL,
            "isAdmin" BOOLEAN DEFAULT false,
            "firstName" VARCHAR(50) NOT NULL,
            "lastName" VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL
        );

        CREATE TABLE types (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) UNIQUE NOT NULL
      );

        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL,
            description VARCHAR(255) NOT NULL,
            type INTEGER REFERENCES types(id),
            price INTEGER NOT NULL
        );

        CREATE TABLE orders (
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id),
            "isOpen" BOOLEAN DEFAULT true
        );

        CREATE TABLE orderproducts (
            id SERIAL PRIMARY KEY,
            "orderId" INTEGER REFERENCES orders(id),
            "productId" INTEGER REFERENCES products(id),
            quantity INTEGER NOT NULL
        );
    `);
  } catch (error) {
    console.log('Error building tables');
    throw error;
  }
};

const createInitialUsers = async () => {
  console.log('Creating users...');

  try {
    const usersToCreate = [
      {
        username: 'ATown2021',
        password: 'ATown2021',
        isAdmin: true,
        firstName: 'Aaron',
        lastName: 'Sexton',
        email: 'aaronsexton5@gmail.com',
      },
      {
        username: 'jstaff123',
        password: 'FullStack',
        isAdmin: true,
        firstName: 'Jerrod',
        lastName: 'Stafford',
        email: 'jerrodstafford10@gmail.com',
      },
      {
        username: 'T-Rey2020',
        password: 'FullStack',
        isAdmin: true,
        firstName: 'Trey',
        lastName: 'Byars',
        email: 'treybyars93@gmail.com',
      },
      {
        username: 'nadia',
        password: 'gamergirl20',
        isAdmin: true,
        firstName: 'Nadia',
        lastName: 'DuBell',
        email: 'ndubell01@gmail.com',
      },
    ];

    const users = [];

    for (const user of usersToCreate) {
      users.push(await createUser(user));
    }

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.log('Error creating initial users');
    throw error;
  }
};

const createInitialProducts = async () => {};

const rebuildDB = async () => {
  try {
    await dropTables();
    await buildTables();
    await createInitialUsers();
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
};

module.exports = { rebuildDB };
