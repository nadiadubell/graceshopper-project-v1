import axios from 'axios';
import { BASE } from '../api/index';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Products.css';

export const Products = props => {
  const [products, setProducts] = useState([]);
  const { setProductId } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await axios.get(`${BASE}/products`);
        setProducts(data.data);
        return data.data;
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
          <div id="product-view" key={i}>
            <Link to="/:productId">
              <h2
                id="product-name"
                onClick={() => {
                  setProductId(product.id);
                }}
              >
                {product.name}{' '}
              </h2>
            </Link>
            <Link to="/:productId">
              <img
                id="product-image"
                src={product.image}
                onClick={() => {
                  setProductId(product.id);
                }}
              />
            </Link>
            <div id="product-price">Price: ${product.price}</div>
          </div>
        );
      })}
    </div>
  );
};
