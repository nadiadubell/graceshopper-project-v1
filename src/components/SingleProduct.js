import { BASE } from '../api/index';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const SingleProduct = props => {
  const [product, setProduct] = useState([]);
  const { productId } = props;

  useEffect(() => {
    const getSingleProduct = async productId => {
      try {
        const data = await axios.get(`${BASE}/products/${productId}`);
        console.log(data.data);
        setProduct([data.data]);
        return data.data;
      } catch (err) {
        console.error(err);
      }
    };

    getSingleProduct(productId);
  }, []);

  return (
    <div>
      {console.log('product', product)}
      {product.map((singleProduct, i) => {
        return (
          <div id="single-product" key={i}>
            <h1 id="single-product-name">{singleProduct.name}</h1>
            <img id="single-product-image" src={singleProduct.image} />
            <h3 id="single-product-description">
              Description: {singleProduct.description}
            </h3>
            <h3 id="single-product-breed">Breed: {singleProduct.breedname}</h3>
            <h3 id="single-product-price">Price: {singleProduct.price}</h3>
            <button id="single-product-add-to-cart">Add To Cart</button>
            <Link to="/products">
              <div>Back to all products</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
