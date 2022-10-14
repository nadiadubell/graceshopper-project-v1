const express = require('express');
const guestOrdersRouter = express.Router();
const {
  createGuestOrder,
  getOpenOrderByGuestId,
  getOrderHistoryByGuestId,
  checkGuestForOrderProductPair,
  addProductToGuestOrder,
  deleteProductFromGuestOrder,
} = require('../db/guest_orders');
const { getGuestById } = require('../db/guest_users');

guestOrdersRouter.get('/:guestId', async (req, res, next) => {
  const { guestId } = req.params;

  try {
    const order = await getOpenOrderByGuestId(guestId);

    if (order) res.send(order);
    else if (order === false) res.send(false);
    else
      next({
        name: 'GuestOrderDoesNotExistError',
        message:
          'There was an error getting this guest order. Please try again',
      });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

guestOrdersRouter.post('/:guestId', async (req, res, next) => {
  const { guestId } = req.params;
  const { productId, quantity } = req.body;
  try {
    let { id: orderId } = await getOpenOrderByGuestId(guestId);

    if (!orderId) {
      const { id: newOrderId } = await createGuestOrder(guestId, true);
      orderId = newOrderId;
    }
    await addProductToGuestOrder({ guestId, orderId, productId, quantity });
    const order = await getOpenOrderByGuestId(guestId);

    if (order) res.send(order);
    else
      next({
        name: 'ProductToGuestOrderError',
        message:
          'Unable to add the product to the guest order at this time. Please try again',
      });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

guestOrdersRouter.delete('/:orderId', async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const order = await getOpenOrderByGuestId(orderId);

    if (order) {
      const deletedOrder = await deleteGuestOrder(orderId);
      res.send(deletedOrder);
    } else {
      next(
        order
          ? {
              name: 'DeleteOrderError',
              message:
                'Unable to delete the guest order at this time. Please try again',
            }
          : {
              name: 'OrderNotFoundError',
              message:
                'This guest order was not found and may not exist. Please try again',
            }
      );
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

guestOrdersRouter.get('/:guestId/orderhistory', async (req, res, next) => {
  const { guestId } = req.params;
  try {
    const orderHistory = await getOrderHistoryByGuestId(guestId);

    if (!orderHistory)
      next({
        name: 'OrderHistoryError',
        message: 'Unable to get guest order history. Please try again',
      });
    else res.send(orderHistory);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

guestOrdersRouter.get(
  '/:guestId/:orderId/:productId',
  async (req, res, next) => {
    const { guestId, orderId, productId } = req.params;

    try {
      const orderProduct = await checkGuestForOrderProductPair(
        guestId,
        orderId,
        productId
      );

      if (orderProduct) res.send(orderProduct);
      else
        next({
          name: 'OrderProductError',
          message: 'Error getting guest order product by IDs. Please try again',
        });
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

guestOrdersRouter.delete(
  '/:guestId/:orderId/:productId',
  async (req, res, next) => {
    const { guestId, orderId, productId } = req.params;
    try {
      const order = await getOpenOrderByGuestId(guestId);

      if (order) {
        const updatedOrder = await deleteProductFromGuestOrder(
          guestId,
          orderId,
          productId
        );

        res.send(updatedOrder);
      } else
        next({
          name: 'DeleteProductFromOrderError',
          message:
            'Unable to delete product from the guest order. Please try again',
        });
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

module.exports = guestOrdersRouter;
