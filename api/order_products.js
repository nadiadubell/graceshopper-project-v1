const express = require('express');
const {
  getOrderProductById,
  updateOrderProduct,
} = require('../db/order_products');
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

orderProductsRouter.patch('/:orderProductId', async (req, res, next) => {
  const { orderProductId: id } = req.params;

  const { orderId, productId, quantity = '' } = req.body;
  const updateFields = {};

  if (orderId) updateFields.orderId = orderId;
  if (productId) updateFields.productId = productId;
  if (quantity) updateFields.quantity = quantity;

  try {
    const orderProduct = await getOrderProductById(id);

    if (orderProduct) {
      const updatedOrderProduct = await updateOrderProduct(id, updateFields);
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

module.exports = orderProductsRouter;
