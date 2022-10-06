const client = require('./client')

const getAllProductsByBreedId = async (id) => {
  try {
    const { rows: [breed] } = await client.query(`
      SELECT *
      FROM breeds
      WHERE id=$1;
      `,[id]);

    console.log(breed)
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

module.exports = {
  getAllProductsByBreedId,
  getBreedByName,
  createBreed
}