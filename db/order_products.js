const client = require('./client');

const createOrderProduct = 
const { rows: [orderProduct] } = await client.query(`
    INSERT INTO orderproducts ("orderId", "productId", quantity)
`)