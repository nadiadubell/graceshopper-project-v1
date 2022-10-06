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
            SELECT orders.*
        `);

    console.log(rows);
    return rows;
  } catch (error) {
    console.log('Error getting all orders');
    throw error;
  }
};

module.exports = { createOrder };
