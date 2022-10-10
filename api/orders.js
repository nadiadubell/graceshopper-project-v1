const express = require('express');
const ordersRouter = express.Router();
const { requireUser, requireAdmin } = require('./utils');
const {
  createOrder,
  getOrderById,
  getOrdersWithoutProducts,
  updateOrder,
  deleteOrder,
  getOrderHistoryById,
} = require('../db/orders');
const { addProductToOrder } = require('../db/order_products');

// GET api/orders/:userId
ordersRouter.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;

  //POSSIBLE CHECK FOR IF USERID EXISTS AND, IF NOT, CARRY OUT GUEST SIDE OF THIS API CALL

  try {
    const order = await getOrderById(userId);

    if (order) res.send(order);
    else
      next({
        name: 'OrderDoesNotExistError',
        message: 'There was an error getting this order. Please try again',
      });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ordersRouter.post('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;
  try {
    let { id: orderId } = await getOrderById(userId);

    if (!orderId) {
      const { id: newOrderId } = await createOrder({ userId });
      orderId = newOrderId;
    }
    const test = await addProductToOrder({ orderId, productId, quantity });
    console.log('Product Added to Order', test);
    const order = await getOrderById(userId);

    if (order) res.send(order);
    else
      next({
        name: 'ProductToOrderError',
        message:
          'Unable to add the product to the order at this time. Please try again',
      });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = ordersRouter;
