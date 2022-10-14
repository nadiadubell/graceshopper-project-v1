const express = require('express');
const { createGuest } = require('../db');
const guestUsersRouter = express.Router();

guestUsersRouter.post('/', async (req, res, next) => {
  const newGuest = await createGuest();
  res.send(newGuest);
});

module.exports = guestUsersRouter;
