const express = require('express');
const breedsRouter = express.Router();
const {
  getAllProductsByBreedId,
  createBreed,
  updateBreed,
  deleteBreed,
  getBreedByName,
} = require('../db');
const { requireAdmin } = require('./utils');

breedsRouter.get('/:breedId', async (req, res, next) => {
  const { breedId: id } = req.params;
  console.log('req.params', req.params);

  try {
    const productsByBreedId = await getAllProductsByBreedId(id);

    if (!productsByBreedId) {
      next({
        name: 'ProductsByBreedIdNotFoundError',
        message: 'Products could not be found by Breed Id',
      });
    } else {
      res.send(productsByBreedId);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

breedsRouter.post('/:breedId', requireAdmin, async (req, res, next) => {
  try {
    const { name } = req.body;

    const breedToCreate = await createBreed(name);

    res.send(breedToCreate);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

breedsRouter.patch('/:breedId', requireAdmin, async (req, res, next) => {
  try {
    const { breedId } = req.params.breedId;
    const { name } = req.body;

    const breedToUpdate = await updateBreed({
      id: breedId,
      name,
    });

    res.send(breedToUpdate);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

breedsRouter.delete('/:breedId', requireAdmin, async (req, res, next) => {
  try {
    const breedId = req.params;
    const { name } = req.body;

    let breed = await getBreedByName(name);
    if (!breed) {
      res.send({
        name: 'BreedNotFoundError',
        message: 'Breed not found',
      });
    } else {
      let breedToDelete = await deleteBreed(breedId);
      if (!breedToDelete) {
        res.send({ success: true, ...breedToDelete });
      }
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = breedsRouter;
