const client = require('./client');

const makeProductArray = rows => {
  let productArr = [];
  for (let i = 0; i < rows.length; i++) {
    productArr.push(rows[i].products[0]);
  }
  rows[0].products = productArr;
  return rows[0];
};

const createOrder = async ({ userId, isOpen }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders ("userId", "isOpen")
        VALUES ($1, $2)
        RETURNING *;
    `,
      [userId, isOpen]
    );
    return order;
  } catch (error) {
    console.log('Error creating order');
    throw error;
  }
};

const getOrdersWithoutProducts = async () => {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM orders;
    `);
    return rows;
  } catch (error) {
    console.log('Error getting orders without products');
    throw error;
  }
};

const getAllOrders = async () => {
  try {
    const { rows } = await client.query(`
    SELECT orders.*, username,
    jsonb_agg(jsonb_build_object(
      'id', products.id,
      'name', products.name,
      'price', products.price,
      'quantity', orderproducts.quantity
    )) AS products
    FROM orders
    JOIN users ON users.id = orders."userId"
    JOIN orderproducts ON orderproducts."orderId" = orders.id
    JOIN products ON orderproducts."productId" = products.id
    GROUP BY users.id, orders.id, orderproducts.quantity;
`);
    console.log('GET ALL ORDERS:', rows);

    return rows;
  } catch (error) {
    console.log('Error getting all orders');
    throw error;
  }
};

const getOrderById = async id => {
  try {
    const { rows } = await client.query(`
    SELECT orders.*, username,
    jsonb_agg(jsonb_build_object(
      'id', products.id,
      'name', products.name,
      'price', products.price,
      'quantity', orderproducts.quantity
    )) AS products
    FROM orders
    JOIN users ON users.id = orders."userId"
    JOIN orderproducts ON orderproducts."orderId" = orders.id
    JOIN products ON orderproducts."productId" = products.id
    WHERE users.id=${id}
    GROUP BY users.id, orders.id, orderproducts.quantity;
`);

    const result = makeProductArray(rows);
    return result;
  } catch (error) {
    console.log('Error getting order by ID');
    throw error;
  }
};

const addItemToOrder = async () => {};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersWithoutProducts,
};
