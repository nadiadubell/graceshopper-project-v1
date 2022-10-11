import axios from 'axios';
import { BASE } from '../api/index';
import { useEffect, useState } from 'react';

export const Products = () => {
  const [products, setProducts] = useState([]);

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
      {console.log('products', products)}
      {products.map((product, i) => {
        return (
          <div id="products" key={i}>
            <img>{product.image}</img>
            <h2 id="product-name">{product.name}</h2>
            <div id="product-price">Price: {product.price}</div>
            <button id="add-to-cart">Add To Cart</button>
          </div>
        );
      })}
    </div>
  );
};
