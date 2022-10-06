const client = require('./client')

const getAllProductsByBreedId = async (id) => {
  try {
    const { rows: [breed] } = await client.query(`
      SELECT *
      FROM breeds
      WHERE id=$1;
      `,[id]);
     
    return breed;
  } catch (error) {
    console.log('error getting products by breed id');
    throw error;
  }
}
const getBreedByName = async (name) => {
  try {
    const { rows: [breed] } = await client.query(`
      SELECT *
      FROM breeds
      WHERE name=$1;
      `,[name]);

    return breed;
  } catch (error) {
    console.log('error getting products by breed name');
    throw error;
  }
}

const createBreed = async ({name}) => {
  try {
    const { rows: [breed] } = await client.query(`
    INSERT INTO breeds (name)
    VALUES ($1)
    RETURNING *;
    `, [name]);
    
    return breed;
  } catch (error) {
    console.log('error creating breed')
    throw error;
  }
}

const updateBreed = async ({ id, ...fields }) => {
  try {
    const setString = Object.keys(fields).map(
      (key, index) => `"${ key }=$${ index + 1 }`
    ).join(", ");

    if(setString.length > 0) {

      const { rows: [breed] } = await client.query(`
      UPDATE breeds
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
      `, Object.values(fields));
     
      return breed;
    }
  } catch (error) {
    console.log('error updating breed')
    throw error;
  }
}

const deleteBreed = async (id) => {
  try {
    const { rows: [breed] } = await client.query(`
      DELETE FROM breeds
      WHERE id=$1;
      RETURNING *;
      `, [id]);

    return breed  
  } catch (error) {
    console.log('error deleting breed');
    throw error
  }
}

module.exports = {
  getAllProductsByBreedId,
  getBreedByName,
  createBreed,
  updateBreed,
  deleteBreed
}