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