const client = require('./client');

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

const getAllOrders = async () => {
  try {
    const { rows } = await client.query(`
    SELECT orders.*, username,
    jsonb_agg(jsonb_build_object(
      'id', products.id,
      'name', products.name,
      'price', products.price,
      'quantity', orderproducts.quantity
    )) as products
    FROM orders
    LEFT JOIN orderproducts ON orders.id = orderproducts."orderId"
    LEFT JOIN products ON orderproducts."productId" = products.id
    LEFT JOIN users ON users.id = orders."userId"
    GROUP BY orders.id, users.username, orderproducts.quantity;
`);
    return rows;
  } catch (error) {
    console.log('Error getting all orders');
    throw error;
  }
};

module.exports = { createOrder, getAllOrders };
