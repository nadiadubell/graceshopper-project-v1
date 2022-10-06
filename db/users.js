const client = require('./client');
const bcrypt = require('bcrypt');


const createUser = async({ username, password, firstName, lastName, email }) => {
    try {
        const SALT_COUNT = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

        const { rows: [user] } = await client.query(`
          INSERT INTO users (username, password, "firstName", "lastName", email)
          VALUES($1, $2, $3, $4, $5)
          ON CONFLICT (username, email) DO NOTHING
          returning id, username;
        `, [username, hashedPassword, firstName, lastName, email])

        return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
}

const getUser = async({ username, password }) => {
  try {
    
    return user;
  } catch (error) {
    console.error(error)
    throw error;
  }

const getUserById = async(id) => {
  try {
    
    return user;
  } catch (error) {
    console.error(error)
    throw error;
  }
}

}

const getUserByUsername = async(username) => {
  try {
    
    return user;
  } catch (error) {
    console.error(error)
    throw error;
  }

const destroyUser = async(id) => {
  try {
    const deletedUser = await getUserById(id)
    await client.query(`
      DELETE FROM users
      FROM users
      WHERE id = ${ id }
    `)
    return deletedUser;
  } catch (error) {
    console.error(error)
    throw error;
  }

}

}



module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
    destroyUser,
}