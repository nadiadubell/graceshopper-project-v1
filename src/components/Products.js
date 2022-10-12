import axios from 'axios';
import { BASE } from '../api/index';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

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
    <div id="products">
      <h1 id="products-header">Products</h1>
      {products.map((product, i) => {
        return (
          <div id="single-product" key={i}>
             <Link to="/:productId">
              <h2 id="product-name">{product.name}</h2>
            </Link>
            <Link to="/:productId">
              <img id="product-image" src={product.image} />
            </Link>
            <div id="product-price">Price: {product.price}</div>
          </div>
        );
      })}
    </div>
  );
};
