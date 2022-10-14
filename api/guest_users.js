const express = require('express');
const { createGuest, deleteGuest } = require('../db/guest_users');
const { getOpenOrderByGuestId } = require('../db/guest_orders');
const guestUsersRouter = express.Router();

guestUsersRouter.post('/', async (req, res, next) => {
  try {
    const newGuest = await createGuest(false);

    if (!newGuest) {
      next({
        name: 'NewGuestError',
        message: 'Error creating new guest. Please try again',
      });
    }
    res.send(newGuest);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

guestUsersRouter.delete('/:guestId/:orderId', async (req, res, next) => {
  const { guestId, orderId } = req.params;
  try {
    const guestOrder = await getOpenOrderByGuestId(guestId);
    if (!guestOrder) {
      next({
        name: 'GuestOrderError',
        message: 'Error getting guest order by Id. Please try again',
      });
      const deletedGuest = await await deleteGuest(guestId);
      if (!deletedGuest) {
        next({
          name: 'DeletedGuestError',
          message: 'Error deleting guest account. Please try again',
        });
      }
      res.send(deletedGuest);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = guestUsersRouter;
