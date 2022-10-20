const express = require('express');
const productsRouter = express.Router();

const {
  getAllProducts,
  createProduct,
  updateProduct,
  getProductByName,
  getProductById,
  deleteProduct,
} = require('../db');
const { requireAdmin } = require('./utils');

productsRouter.get('/', async (req, res, next) => {
  try {
    console.log('GETTING ALL PRODUCTS');
    const products = await getAllProducts();

    res.send(products);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.get('/:productId', async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await getProductById(productId);

    res.send(product);
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
  const productId = req.params.productId;
  const { name, description, breedId, price } = req.body;

  const _product = await getProductById(productId);
  const _productName = await getProductByName(name);

  const updateFields = {};
  try {
    if (!_product) {
      next({
        name: 'ProductNotFoundError',
        message: "A product by that id doesn't exist!",
      });
    } else if (_productName) {
      next({
        name: 'ProductAlreadyExistsError',
        message: 'A product with that name already exists!',
      });
    } else {
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

      const product = await updateProduct(productId, updateFields);
      res.send(product);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.delete('/:productId', requireAdmin, async (req, res, next) => {
  const productId = req.params.productId;

  const _product = await getProductById(productId);
  try {
    if (!_product) {
      next({
        name: 'ProductNotFoundError',
        message: "A product by that id doesn't exist!",
      });
    } else {
      const deletedProduct = await deleteProduct(productId);
      res.send({ success: true, ...deletedProduct });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = productsRouter;
