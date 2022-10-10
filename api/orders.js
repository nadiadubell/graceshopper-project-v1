const express = require('express');
const ordersRouter = express.Router();
const {
  createOrder,
  getOrderById,
  getOrdersWithoutProducts,
  updateOrder,
  deleteOrder,
  getOrderHistoryById,
} = require('../db/orders');

// GET api/:userId/order
ordersRouter.get('/:userId', async (req, res, next) => {
  const userId = req.params;

  try {
    const order = await getOrderById(userId);

    if (order) res.send(order);
    else
      next({
        name: 'OrderDoesNotExistError',
        message:
          'There was an error getting this order. It may not yet exist. Please try again or place an item in your cart',
      });
  } catch ({ name, message }) {
    next({ name, message });
  }
});
