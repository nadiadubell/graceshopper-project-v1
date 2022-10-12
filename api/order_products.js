const express = require('express');
const {
  getOrderProductById,
  updateOrderProduct,
  deleteProductFromOrder,
  checkForOrderProductPair,
} = require('../db/order_products');
const { getOpenOrderByUserId } = require('../db/orders');
const orderProductsRouter = express.Router();

orderProductsRouter.get('/:orderProductId', async (req, res, next) => {
  const { orderProductId: id } = req.params;

  try {
    const orderProduct = await getOrderProductById(id);

    if (orderProduct) res.send(orderProduct);
    else
      next({
        name: 'OrderProductError',
        message: 'Error getting order product by id. Please try again',
      });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

orderProductsRouter.get('/:orderId/:productId', async (req, res, next) => {
  const { orderId, productId } = req.params;

  try {
    const orderProduct = await checkForOrderProductPair(orderId, productId);

    if (orderProduct) res.send(orderProduct);
    else
      next({
        name: 'OrderProductError',
        message: 'Error getting order product by IDs. Please try again',
      });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

orderProductsRouter.patch('/:orderProductId', async (req, res, next) => {
  const { orderProductId: id } = req.params;

  const { quantity } = req.body;

  try {
    const orderProduct = await getOrderProductById(id);

    if (orderProduct) {
      const updatedOrderProduct = await updateOrderProduct(id, quantity);
      res.send(updatedOrderProduct);
    } else {
      next({
        name: 'OrderProductError',
        message: 'Unable to locate the order product. Please try again',
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

orderProductsRouter.delete(
  '/:userId/:orderId/:productId',
  async (req, res, next) => {
    const { userId, orderId, productId } = req.params;
    try {
      const order = await getOpenOrderByUserId(userId);

      if (
        order &&
        (order.userId === req.user.id || req.user.isAdmin === true)
      ) {
        const updatedOrder = await deleteProductFromOrder(
          userId,
          orderId,
          productId
        );

        res.send(updatedOrder);
      } else
        next({
          name: 'DeleteProductFromOrderError',
          message: 'Unable to delete product from the order. Please try again',
        });
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

module.exports = orderProductsRouter;
