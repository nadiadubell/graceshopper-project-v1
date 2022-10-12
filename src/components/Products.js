import axios from 'axios';
import { BASE } from '../api/index';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Products = props => {
  const [products, setProducts] = useState([]);

  const { setProductId } = props;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await axios.get(`${BASE}/products`);
        setProducts(data.data);
        return data;
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, []);
  return (
    <div>
      <h1 id="products-header">Products</h1>
      {products.map((product, i) => {
        return (
          <div id="products" key={i}>
            <Link to="/:productId">
              <img
                id="product-image"
                src={product.image}
                onClick={() => {
                  setProductId(product.id);
                }}
              />
            </Link>
            <Link to="/:productId">
              <h2
                id="product-name"
                onClick={() => {
                  setProductId(product.id);
                }}
              >
                {product.name}
              </h2>
            </Link>
            <div id="product-price">Price: {product.price}</div>
            <button id="add-to-cart">Add To Cart</button>
          </div>
        );
      })}
    </div>
  );
};
