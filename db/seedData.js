const client = require('./client');
const { createUser } = require("./users");
const { createBreed } = require("./breeds");
const { createProduct } = require("./products");

const dropTables = async () => {
  try {
    console.log('Dropping tables...');

    await client.query(`
            DROP TABLE IF EXISTS orderproducts;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS breeds;
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
            username VARCHAR(50) NOT NULL,
            password VARCHAR(255) NOT NULL,
            "isAdmin" BOOLEAN DEFAULT false,
            "firstName" VARCHAR(50) NOT NULL,
            "lastName" VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL,
            UNIQUE(username, email)
        );

        CREATE TABLE breeds (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) UNIQUE NOT NULL
      );

        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL,
            description VARCHAR(255) NOT NULL,
            "breedId" INTEGER REFERENCES breeds(id),
            price DECIMAL NOT NULL
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

const createInitialBreed = async () => {
  console.log('Creating initial types...');
  try {
    const breedsToCreate = [
      { name: 'Thoroughbred' },
      { name: 'Friesian' },
      { name: 'American Quarter' },
      { name: 'Akhal-Teke' },
      { name: 'Arabian' },
      { name: 'Lipizzan' },
      { name: 'Palomino' },
      { name: 'Clydesdale' },
    ];

    const breeds = [];

    for (const breed of breedsToCreate) {
      breeds.push(await createBreed(breed));
    }
    console.log('Breeds created:');
    console.log(breeds);
    console.log('Finished creating breeds!');
  } catch (error) {
    console.log('Error creating initial types');
    throw error;
  }
};

const createInitialProducts = async () => {
  console.log('Creating initial products...');

  try {
    const productsToCreate = [
      {
        name: 'Breyer Horse',
        description: "It's beautiful",
        breedId: 1,
        price: 5000,
      },
      {
        name: 'Horse drinking from stream',
        description: "It's thirsty",
        breedId: 2,
        price: 10,
      },
      {
        name: 'Miniature Model Horse',
        description: "It's small",
        breedId: 3,
        price: 25,
      },
      {
        name: 'Bucking Bronco',
        description: "It's angry",
        breedId: 4,
        price: 50,
      },
      {
        name: 'Prancing Palomino',
        description: "It's fancy",
        breedId: 5,
        price: 100,
      },
      {
        name: 'Lil Sebastian',
        description: "It's a Parks & Rec reference",
        breedId: 6,
        price: 150,
      },
    ];

    const products = [];

    for (const product of productsToCreate) {
      products.push(await createProduct(product));
    }
    console.log('Products created:');
    console.log(products);
    console.log('Finished creating products!');
  } catch (error) {
    console.log('Error creating initial products');
    throw error;
  }
};

const rebuildDB = async () => {
  try {
    await dropTables();
    await buildTables();
    await createInitialUsers();
    await createInitialBreed();
    await createInitialProducts();
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
};

module.exports = { rebuildDB };
