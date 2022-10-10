const client = require('./client');

const addProductToOrder = async ({ orderId, productId, quantity }) => {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
    INSERT INTO orderproducts ("orderId", "productId", quantity)
    VALUES ($1, $2, $3)
    RETURNING *;
`,
      [orderId, productId, quantity]
    );
    return orderProduct;
  } catch (error) {
    console.log('Error creating order product');
    throw error;
  }
};

module.exports = { addProductToOrder };
