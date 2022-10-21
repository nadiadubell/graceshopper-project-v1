const express = require('express');
const {
  createGuest,
  getGuestById,
  deleteGuest,
  getAllGuests,
} = require('../db/guest_users');
const { getOpenOrderByGuestId } = require('../db/guest_orders');
const guestUsersRouter = express.Router();

guestUsersRouter.get('/', async (req, res, next) => {
  try {
    const guests = await getAllGuests();
    res.send(guests);
  } catch (error) {
    next({
      name: 'GetAllGuestsError',
      message: 'There was an error getting all guests',
    });
  }
});

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
    }
    const deletedGuest = await getGuestById(guestId);
    if (!deletedGuest) {
      next({
        name: 'DeletedGuestError',
        message: 'Error deleting guest account. Please try again',
      });
    }
    await deleteGuest(guestId, orderId);
    res.send(deletedGuest);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = guestUsersRouter;
