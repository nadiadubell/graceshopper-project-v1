const client = require('./client');

const makeProductArray = rows => {
  let productArr = [];
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].products.length; j++) {
      productArr.push(rows[i].products[j]);
    }
  }
  rows[0].products = productArr;
  return rows[0];
};

const createGuestOrder = async ({ guestId, isOpen = true }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            INSERT INTO orders ("guestId", "isOpen")
            VALUES ($1, $2)
            RETURNING *;
        `,
      [guestId, isOpen]
    );
    console.log('GUEST ORDER', order);
    return order;
  } catch (error) {
    console.log('Error creating order');
    throw error;
  }
};

module.exports = { createGuestOrder };
