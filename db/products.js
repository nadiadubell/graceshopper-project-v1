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

const updateProduct = async ({id, ...fields}) => {
    const setString = Object.keys(fields)
        .map((key, index) => key != id && `"${key}"=$${index + 1}`)
        .join((", "));
    try {
        const { rows: [product] } = await client.query(`
            UPDATE products
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return product;
    } catch(err) {
        console.log(err)
        throw err;
    }
}

module.exports = {
    createProduct,
    updateProduct
}