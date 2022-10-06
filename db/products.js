const client = require("./client");

const createProduct = async ({name, description, breedId, price}) => {
    try {
        const { rows: [product] } = await client.query(`
            INSERT INTO products (name, description, "breedId", price)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `, [name, description, breedId, price])
        return product;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    createProduct
}