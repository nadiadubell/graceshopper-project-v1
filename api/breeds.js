const express = require('express');
const router = express.Router();
const { getAllProductsByBreedId, createBreed, updateBreed, deleteBreed, getBreedByName } = require('../db');
const { requireAdmin } = require('./utils');

router.use(express.json())

router.get('api/products/:breedId', async(req, res, next) => {
  try {
    const { name } = req.body;
    const { breedId: id} = req.params
    const productsByBreedId = await getAllProductsByBreedId({id})


    if(!productsByBreedId) {
      next({ 
        name: "ProductsByBreedIdNotFoundError",
        message: "Products could not be found by Breed Id"
      })
    } else {
    res.send(productsByBreedId);
    }

  } catch ({name, message}) {
    next ({name, message});
  }
});

router.post('api/products/:breedId', requireAdmin, async(req, res, next) => {
  try {
    const { name } = req.body;
    
    const breedToCreate = await createBreed({name})

    res.send(breedToCreate)
  } catch (error) {
    next (error)
  }
});

router.patch('api/products/:breedId', requireAdmin, async(req, res, next) => {
  try {
    const { breedId } = req.params.breedId;
    const { name } = req.body;

    const breedToUpdate = await updateBreed({
      id: breedId,
      name
    });

    res.send(breedToUpdate);
  } catch (error) {
    next (error);
  }
});

router.delete('api/products/:breedId', requireAdmin, async(req, res, next) => {
  try {
    const breedId = req.params.breedId;
    const { name } = req.body;

    let breed = await getBreedByName(name)
      if(!breed) {
        res.send({
          name: "BreedNotFoundError",
          message: "Breed not found"
        });

      } else {
      let breedToDelete = await deleteBreed(breedId);
        if (!breedToDelete) {
          res.send({ success: true, ...breedToDelete });
        }
      }
  } catch (error) {
    next (error); 
  }
});