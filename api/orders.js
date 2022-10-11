const express = require('express');
const ordersRouter = express.Router();
const { requireUser, requireAdmin } = require('./utils');
const {
  createOrder,
  getOpenOrderByUserId,
  getOrderById,
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
    const order = await getOpenOrderByUserId(userId);

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
    let { id: orderId } = await getOpenOrderByUserId(userId);

    if (!orderId) {
      const { id: newOrderId } = await createOrder({ userId });
      orderId = newOrderId;
    }
    await addProductToOrder({ orderId, productId, quantity });
    const order = await getOpenOrderByUserId(userId);

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

ordersRouter.patch('/:userId/:orderId', async (req, res, next) => {
  const { userId, orderId } = req.params;
  const { isOpen = '' } = req.body;

  const updateFields = {};

  if (isOpen || !isOpen) updateFields.isOpen = isOpen;
  updateFields.userId = userId;

  try {
    const originalOrder = await getOrderById(orderId);
    if (originalOrder.userId === req.user.id || req.user.isAdmin === true) {
      const updatedOrder = await updateOrder(originalOrder.id, updateFields);
      res.send({ order: updatedOrder });
    } else {
      next({
        name: 'OrderUpdateError',
        message: 'Unable to update the order at this time. Please try again',
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ordersRouter.delete('/:orderId', async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const order = await getOrderById(orderId);

    if (order && (order.userId === req.user.id || req.user.isAdmin === true)) {
      const deletedOrder = await deleteOrder(orderId);
      res.send(deletedOrder);
    } else {
      next(
        order
          ? {
              name: 'DeleteOrderError',
              message:
                'Unable to delete the order at this time. Please try again',
            }
          : {
              name: 'OrderNotFoundError',
              message:
                'This order was not found and may not exist. Please try again',
            }
      );
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

ordersRouter.get('/:userId/orderhistory', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const orderHistory = await getOrderHistoryById(userId);

    if (!orderHistory)
      next({
        name: 'OrderHistoryError',
        message: 'Unable to get order history. Please try again',
      });
    else res.send(orderHistory);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = ordersRouter;
