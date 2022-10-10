const express = require('express');
const productsRouter = express.Router();

const { getAllProducts, createProduct, getProductByName } = require('../db');
const { requireAdmin } = require('./utils');

productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await getAllProducts();

    res.send(products);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.post('/', requireAdmin, async (req, res, next) => {
  const { name, description, breedId, price } = req.body;

  try {
    const _product = await getProductByName(name);
    if (_product) {
      next({
        name: 'ProductAlreadyExistsError',
        message: 'A product by that name already esists!',
      });
    } else {
      const product = await createProduct({
        name,
        description,
        breedId,
        price,
      });
      res.send(product);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.patch('/:productId', requireAdmin, async (req, res, next) => {
  const productId = req.params.id;
  const { name, description, breedId, price } = req.body;

  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }

  if (description) {
    updateFields.description = description;
  }

  if (breedId) {
    updateFields.breedId = breedId;
  }

  if (price) {
    updateFields.price = price;
  }

  try {
    if (!productId) {
      next({
        name: 'ProductNotFoundError',
        message: "A product by that id doesn't exist!",
      });
    }
    const product = await updateProduct({});
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = productsRouter;
