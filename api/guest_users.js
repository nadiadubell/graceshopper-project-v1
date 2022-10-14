const express = require('express');
const { createGuest } = require('../db');
const guestUsersRouter = express.Router();

guestUsersRouter.post('/', async (req, res, next) => {
  try {
    const newGuest = await createGuest(false);

    if (!newGuest) {
      next({
        name: 'NewGuestError',
        message: 'Error creating new guest. Please try again',
      });
      console.log('NEW GUEST', newGuest);
      res.send(newGuest);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = guestUsersRouter;
