const client = require('./client');
const bcrypt = require('bcrypt');


const createUser = async({username, password, firstName, lastName, email}) => {
    try {
        const SALT_COUNT = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

        const {rows: [user]} = await client.query(`
          INSERT INTO users (username, password, "firstName", "lastName", email)
          VALUES($1, $2, $3, $4, $5)
          ON CONFLICT (username, email) DO NOTHING
          returning id, username;
        `, [username, hashedPassword, firstName, lastName, email]);

        return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
}

const updateUser = async({id, ...fields}) => {

  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"=$${index + 1}`
  ).join(', ');

  if(setString.length === 0) {
    return;
  }

  try {
    const {rows: [user]} = await client.query(`
      UPDATE users
      SET ${setString}
      WHERE id = ${ id }
      RETURNING *'
    `, Object.values(fields));

    return user;
  } catch (error) {
    console.error(error)
    throw error;
  }
}

const getUser = async({username, password}) => {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const matchingPasswords = await bcrypt.compare(password, hashedPassword);

    if(matchingPasswords) {
      const userResult = (({id, username }) => ({id, username}))(user);
      return userResult
    }
    return user;
  } catch (error) {
    console.error(error)
    throw error;
  }
}

const getUserById = async(userId) => {
  try {
    const {rows: [user]} = await client.query(`
      SELECT id, username
      FROM users
      WHERE id = ${userId};
    `);

    return user;
  } catch (error) {
    console.error(error)
    throw error;
  }
}

const getUserByUsername = async(userName) => {
  try {
    const {rows: [user]} = await client.query(`
      SELECT *
      FROM users
      WHERE USERNAME = $1;
    `, [userName]);

    return user;
  } catch (error) {
    console.error(error)
    throw error;
  }
}

const destroyUser = async(userId) => {
  try {
    const deletedUser = await getUserById(id)
    await client.query(`
      DELETE FROM users
      FROM users
      WHERE id = ${userId};
    `);

    return deletedUser;
  } catch (error) {
    console.error(error)
    throw error;
  }

}





module.exports = {
    createUser,
    updateUser,
    getUser,
    getUserById,
    getUserByUsername,
    destroyUser,
}