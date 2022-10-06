const client = require("./client");

const { createUser, updateUser } = require("./users");
const { createBreed, updateBreed } = require("./breeds");
const { createProduct, updateProduct, getAllProducts } = require("./products");
const { createOrder } = require("./orders");
const { createOrderProduct } = require("./order_products");

const dropTables = async () => {
  try {
    console.log("Dropping tables...");

    await client.query(`
            DROP TABLE IF EXISTS orderproducts;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS breeds;
            DROP TABLE IF EXISTS users;
        `);
  } catch (error) {
    console.log("Error dropping tables");
    throw error;
  }
};

const buildTables = async () => {
  try {
    console.log("Building tables...");

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
            quantity INTEGER NOT NULL,
            CONSTRAINT UC_OrderProducts UNIQUE ("orderId", "productId")
        );
    `);
  } catch (error) {
    console.log("Error building tables");
    throw error;
  }
};

const createInitialUsers = async () => {
  console.log("Creating users...");

  try {
    const usersToCreate = [
      {
        username: "ATown2021",
        password: "FullStack",
        isAdmin: true,
        firstName: "Aaron",
        lastName: "Sexton",
        email: "aaronsexton5@gmail.com",
      },
      {
        username: "jstaff123",
        password: "FullStack",
        isAdmin: true,
        firstName: "Jerrod",
        lastName: "Stafford",
        email: "jerrodstafford10@gmail.com",
      },
      {
        username: "T-Rey2020",
        password: "FullStack",
        isAdmin: true,
        firstName: "Trey",
        lastName: "Byars",
        email: "treybyars93@gmail.com",
      },
      {
        username: "nadia",
        password: "gamergirl20",
        isAdmin: true,
        firstName: "Nadia",
        lastName: "DuBell",
        email: "ndubell01@gmail.com",
      },
    ];

    const users = [];

    for (const user of usersToCreate) {
      users.push(await createUser(user));
    }

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.log("Error creating initial users");
    throw error;
  }
};

const createInitialBreeds = async () => {
  console.log("Creating initial breeds...");
  try {
    const breedsToCreate = [
      { name: "Thoroughbred" },
      { name: "Friesian" },
      { name: "American Quarter" },
      { name: "Akhal-Teke" },
      { name: "Arabian" },
      { name: "Lipizzan" },
      { name: "Palomino" },
      { name: "Clydesdale" },
    ];

    const breeds = [];

    for (const breed of breedsToCreate) {
      breeds.push(await createBreed(breed));
    }
    console.log("Breeds created:");
    console.log(breeds);
    console.log("Finished creating breeds!");
  } catch (error) {
    console.log("Error creating initial breeds");
    throw error;
  }
};

const createInitialProducts = async () => {
  console.log("Creating initial products...");

  try {
    const productsToCreate = [
      {
        name: "Breyer Horse",
        description: "It's beautiful",
        breedId: 1,
        price: 5000,
      },
      {
        name: "Horse drinking from stream",
        description: "It's thirsty",
        breedId: 2,
        price: 10,
      },
      {
        name: "Miniature Model Horse",
        description: "It's small",
        breedId: 3,
        price: 25,
      },
      {
        name: "Bucking Bronco",
        description: "It's angry",
        breedId: 4,
        price: 50,
      },
      {
        name: "Prancing Palomino",
        description: "It's fancy",
        breedId: 5,
        price: 100,
      },
      {
        name: "Lil Sebastian",
        description: "It's a Parks & Rec reference",
        breedId: 6,
        price: 150,
      },
    ];

    const products = [];

    for (const product of productsToCreate) {
      products.push(await createProduct(product));
    }
    console.log("Products created:");
    console.log(products);
    console.log("Finished creating products!");
  } catch (error) {
    console.log("Error creating initial products");
    throw error;
  }
};

const createInitialOrders = async () => {
  console.log("Creating initial orders...");
  try {
    const ordersToCreate = [
      { userId: 1, isOpen: true },
      { userId: 2, isOpen: true },
      { userId: 3, isOpen: true },
      { userId: 4, isOpen: true },
    ];

    const orders = [];

    for (const order of ordersToCreate) {
      orders.push(await createOrder(order));
    }
    console.log("Orders created:");
    console.log(orders);
    console.log("Finished creating orders!");
  } catch (error) {
    console.log("Error creating initial orders");
    throw error;
  }
};

const createInitialOrderProducts = async () => {
  console.log("Creating intial order products...");

  try {
    const [order1, order2, order3, order4] = await getAllOrders();
    const [product1, product2, product3, product4, product5, product6] =
      await getAllProducts();

    const orderProductsToCreate = [
      {
        orderId: order1.id,
        productId: product1.id,
        quantity: 1,
      },
      {
        orderId: order1.id,
        productId: product2.id,
        quantity: 2,
      },
      {
        orderId: order1.id,
        productId: product3.id,
        quantity: 100,
      },
      {
        orderId: order2.id,
        productId: product4.id,
        quantity: 1,
      },
      {
        orderId: order2.id,
        productId: product1.id,
        quantity: 2,
      },
      {
        orderId: order3.id,
        productId: product5.id,
        quantity: 10,
      },
      {
        orderId: order4.id,
        productId: product6.id,
        quantity: 5,
      },
    ];

    const orderProducts = [];

    for (const orderProduct of orderProductsToCreate) {
      orderProducts.push(await createOrderProduct(orderProduct));
    }

    console.log("Order products created:");
    console.log(orderProducts);
    console.log("Finished creating order products");
  } catch (error) {
    console.log("Error creating order products");
    throw error;
  }
};

const rebuildDB = async () => {
  try {
    await dropTables();
    await buildTables();
    await createInitialUsers();
    await createInitialBreeds();
    await createInitialProducts();
    await createInitialOrders();
    // await createInitialOrderProducts();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
};

const testDB = async () => {
  try {
    console.log("Testing database...");

    console.log("Calling getAllUsers");
    const users = await getAllUsers();

    console.log("Calling updateUsers on users[0]");
    const updateUserResult = await updateUser(users[0].id, {
      username: "Newname Sogood",
      password: "NewPasswordWhoThis?",
      isAdmin: false,
      firstName: "Newname",
      lastName: "Sogood",
      email: "thisismyemail@gmail.com",
    });

    console.log("Calling getAllBreeds");
    const breeds = await getAllBreeds();

    console.log("Calling updateBreed on breeds[0]");
    const updateBreedResult = await updateBreed(breeds[0].id, {
      name: "Brand New Horse Breed",
    });

    console.log("Calling getAllProducts");
    const products = await getAllProducts();
    console.log("Result: ", products);

    console.log("Calling updateProduct on products[0]");
    const updateProductResult = await updateProduct(products[0].id, {
      name: "Brand New Product",
      description: "That New Product Smell",
      breedId: 1,
      price: 1000,
    });
    console.log("Result:", updateProductResult);

    console.log("Database tested!");
  } catch (err) {
    console.log("Error testing database!");
    throw err;
  }
};

module.exports = { rebuildDB, testDB };
