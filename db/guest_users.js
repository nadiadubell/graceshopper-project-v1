const client = require('./client');

const createGuest = async isAdmin => {
  try {
    const {
      rows: [guest],
    } = await client.query(
      `
      INSERT INTO guests ("isAdmin")
      VALUES ($1)
      RETURNING id;
    `,
      [isAdmin]
    );
    console.log('GUEST', guest);
    return guest;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteGuest = async id => {
  try {
    const guestToDelete = await getGuestById(id);
    if (guestToDelete) {
      await client.query(`
      DELETE FROM guests
      WHERE id = ${id};
    `);

      return 'guest deleted';
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createGuest,
  deleteGuest,
};
