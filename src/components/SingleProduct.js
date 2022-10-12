import { BASE } from '../api/index';
import { useState, useEffect } from 'react';
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
            <div>{singleProduct.breedname}</div>
          </div>
        );
      })}
    </div>
  );
};
