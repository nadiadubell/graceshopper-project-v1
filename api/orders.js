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
    await addProductToOrder({ orderId, productId, quantity });
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

ordersRouter.patch('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const { isOpen = '' } = req.body;

  const updateFields = {};

  if (isOpen || !isOpen) updateFields.isOpen = isOpen;
  if (userId) updateFields.userId = userId;

  try {
    const originalOrder = await getOrderById(userId);
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

ordersRouter.delete('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const order = await getOrderById(userId);

    if (order && (order.userId === req.user.id || req.user.isAdmin === true))
      await deleteOrder(userId);
    else {
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

module.exports = ordersRouter;
